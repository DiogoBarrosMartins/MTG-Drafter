
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
    elements.button = $(`
                        <div id='btn-container'>
                        <button id='goBack'>Go back</button>
                        </div>`);
    elements.button.click(handlers["buttonHomeClick"]);
    elements.app.prepend(elements.button);
  }


  externals.bind = function (event, handler) {
    handlers[event] = handler;
  };


  function renderCard(card) {
    elements.videoCard = $("<div class='card-view'></div>");
    elements.videoCard.append(createCard(card));
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
      
          
          ${card.art ? ` <div id='btn-container'>
          <button id='viewArt'>View Art</button>` : ""}
        </div>
        <div class="card-content">
          <div class="card-image">
            <img src="${card.card}" alt="Card image" />
          </div>
          <div class="card-details">
              <h2>${card.name}</h2>
              <p>${card.flavour || "No flavour text available"}</p>
            </div>
            ${card.art ? `<div class="card-art" style="display: none;">
                            <img src="${card.art}" alt="Art of ${card.name}" />
                          </div>` : ""}
          </div>
        </div>
      </div>`;
  }
  
  $(document).on('click', '#viewArt', function() {
    $('.card-art').slideToggle();
  });

  function createCardList(cardlist) {
    $("#cardList").append(`
      <p>${cardlist.name}</p> 
      <img src="${cardlist.card}"</>
    `)
  }


  return externals;
});
