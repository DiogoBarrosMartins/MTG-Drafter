define(function () {
  let externals = {};
  let elements = {};
  let handlers = {};

  function createButton() {
    return "<button id='goBack' style='display:flex; border: 1px solid; margin-top: 30px; margin-left: 200px; margin-right: 30px;'> Go back </button>";
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

    document.body.style.backgroundImage = `url('https://www.mtgnexus.com/img/gallery/5273-serum-visions.jpg')`;

    if (!elements.videoCard) {
      elements.videoCard = $("<div id='cardList' class='card-container'></div>");
    }

    elements.videoCard.empty();

    if (cardlist && cardlist.length > 0) {
      let cardHtml = "";
      for (let i = 0; i < cardlist.length; i++) {
        let card = cardlist[i];
        cardHtml += `
        <div class='card'>
          
          <img src='${card.card}' />
        </div>
      `;
      }
      elements.videoCard.html(cardHtml);
    }
    elements.app.append(elements.videoCard);
  }




  externals.renderMany = function (cardlist) {

    if (!elements.app) {
      elements.app = $("#app");
    }

    renderButton();
    console.log("rendermany")
    console.log(cardlist)
    renderCardList(cardlist);
  };




  return externals;
});
