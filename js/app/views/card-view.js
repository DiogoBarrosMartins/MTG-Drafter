/**deprecated*/

define(function () {
  let externals = {};
  let elements = {};
  let handlers = {};


  function createButton() {
    return "<button id = 'goBack' style='display:flex; border: 1px solid; margin-top: 30px; margin-left: 200px; margin-right: 30px;'> Go back </button>";
  }

  externals.bind = function (event, handler) {
    handlers[event] = handler;
  };

  function renderButton() {
    if (elements.button) {
      return;
    }
    elements.app.empty();
    elements.button = $(createButton());
    elements.button.click(handlers["buttonHomeClick"]);
    elements.app.append(elements.button);
  }

  externals.render = function (card) {
    if (!elements.app) {
      elements.app = $("#app");
    }

    renderButton();

    if (card) {
      renderCard(card);
    }
    console.log(card)
    console.log(typeof card)
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
    return `<div> 
         <img src="${card.card}"</>
          <p>Name: ${card.name}</p> 
          <p>Flavour: ${card.flavour ? card.flavour : "No flavour available"}</p> 
          <img src="${card.art}"</> 
          </div>`;
  }

  function createCardList(cardlist) {

    $("#cardList").append(`<div style="margin-right:10px; margin-left:10px;>
  <p  style="margin-left:36px;"> ${cardlist.name}</p> 
         <img src="${cardlist.card}" </>
          
          </div>`)
  }

  return externals;
});
