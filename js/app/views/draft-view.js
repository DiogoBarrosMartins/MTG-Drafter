define(function () {
  let externals = {};
  let elements = {};
  let handlers = {};

  function createButton() {
    return "<button id='goBack' > Go back </button>";
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
  };

  function renderCard(card) {
    if (elements.videoCard) {
      elements.videoCard.empty();
    }

    elements.videoCard = $(createCard(card));
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

  function renderCardList(cardlist) {
    if (!elements.videoCard) {
      elements.videoCard = $(
        "<div id='cardList' class='card-container'></div>"
      );
    }

    elements.videoCard.empty();

    if (cardlist && cardlist.length > 0) {
      let cardHtml = "";
      for (let i = 0; i < cardlist.length; i++) {
        let card = cardlist[i];
        cardHtml += `
        <div id =${card.id} class='card'  >
        <img src='${card.card}' />
        </div> `;
      }

      elements.videoCard.html(cardHtml);
    }

    elements.app.append(elements.videoCard);
  }

  externals.renderSidebar = function (sideList) {
    if (!elements.sideCard) {
      elements.sideCard = $("<div id='sideList' class='side-container'></div>");
    }

    elements.sideCard.empty();

    if (sideList && sideList.length > 0) {
      let cardHtml = "";
      for (let i = 0; i < sideList.length; i++) {
        let sideCard = sideList[i];
        cardHtml += `
                <div id=${sideCard.id} class='sideCard' >
                    <div class='cardTitle' style="">${sideCard.name}</div>          
                        <img src='${sideCard.art}' style="">
                    </div>
                </div>
            `;
      }
      elements.sideCard.html(cardHtml);
    }
    elements.app.append(elements.sideCard);
  };

  externals.renderMany = function (cardlist, callbackFunction) {
    if (!elements.app) {
      elements.app = $("#app");
    }
    renderButton();
    renderCardList(cardlist, callbackFunction);
  };

  return externals;
});
