
define(function () {
  let externals = {};
  let elements = {};
  let handlers = {};


  externals.render = function (card) {
    if (!elements.app) {
      elements.app = $("#app");
    }
    elements.app.empty(); 
    renderButton();
    if (card) {
      renderCard(card);
    }
    console.log(card)
    console.log(typeof card)
  };


  function renderButton() {
    elements.button = $("<button id='goBack'>Go back</button>");
    elements.button.click(handlers["buttonHomeClick"]);
    elements.app.append(elements.button);
  }


  externals.bind = function (event, handler) {
    handlers[event] = handler;
  };


  function renderCard(card) {
    if (elements.videoCard) {
      elements.videoCard.empty();
    }
    elements.videoCard = $(createCard(card));
    elements.app.append(elements.videoCard);
  }


  externals.renderMany = function (cardlist) {
    if (!elements.app) {
      elements.app = $("#app");
    }
    renderButton();
    if (cardlist) {
      for (let element of cardlist) {
        renderCardList(element);
      }
    }
  }


  function renderCardList(cardlist) {
    if (elements.videoCard) {
      elements.videoCard.empty();
    }
    elements.videoCard = $(createCardList(cardlist));
    elements.app.append(elements.videoCard);
  }

  function createCard(card) {
    return `
      <div class="card-view-container">
        <div class="card-image">
          <img src="${card.card}" alt="Card image" />
        </div>
        <div class="card-info">
          <h2>${card.name}</h2>
          <p>${card.flavour || "No flavour text available"}</p>
        </div>
        <div class="card-art">
          ${card.art ? `<img src="${card.art}" alt="Art of ${card.name}" />` : ""}
        </div>
      </div>`;
  }
  


  function createCardList(cardlist) {
    $("#cardList").append(`
      <p>${cardlist.name}</p> 
      <img src="${cardlist.card}"</>
    `)
  }


  return externals;
});
