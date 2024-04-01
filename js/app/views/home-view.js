define(function () {
  let externals = {};

  function createElement(tag, options = {}) {
    const element = document.createElement(tag);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'events') {
        Object.entries(value).forEach(([event, handler]) => {
          element.addEventListener(event, handler);
        });
      } else if (key in element) {
        element[key] = value;
      }
    });
    return element;
  }

  function appendChildren(parent, children) {
    children.forEach(child => parent.appendChild(child));
  }

  function renderButton(app) {
    const buttonContainer = createElement('div', {id: 'button-container'});

    const buttons = [
      createElement('button', {id: 'random', textContent: 'Random Card?', events: {'click': () => window.location.hash = 'card'}}),
      createElement('input', {type: 'text', id: 'search', name: 'search-field'}),
      createElement('button', {id: 'search-btn', textContent: 'Search', events: {'click': handleSearch}}),
      createElement('button', {id: 'clear-btn', textContent: 'Clear', events: {'click': handleClear}}),
      createElement('button', {id: 'booster-btn', textContent: 'Booster', events: {'click': () => window.location.hash = 'booster'}}),
      createElement('button', {id: 'draft-btn', textContent: 'Draft', events: {'click': () => window.location.hash = 'draft'}})
    ];

    appendChildren(buttonContainer, buttons);
    app.appendChild(buttonContainer);

    console.log("Render button");
  }

  function handleSearch() {
    const searchQuery = document.getElementById('search').value.trim();
    window.location.hash = searchQuery === "" ? "#home" : `scry?query=${encodeURIComponent(searchQuery)}`;
  }

  function handleClear() {
    document.getElementById('search').value = "";
    window.location.hash = "#home";
  }

  externals.render = function () {
    const app = document.getElementById('app');
    app.textContent = ''; 
    renderButton(app);
  };

  return externals;
});
