define(function () {
  let externals = {};
  let elements = {};
  let handlers = {};

  function initElements() {
    elements.app = elements.app || document.getElementById('app');
  }

  function createButton() {
    let button = document.createElement('button');
    button.id = 'goBack';
    button.textContent = 'Go back';
    return button;
  }

  externals.bind = function (event, handler) {
    handlers[event] = handler;
  };

  function renderButton() {
    if (elements.button) {
      return;
    }

    elements.app.innerHTML = ''; 
    elements.button = createButton();
    elements.button.addEventListener('click', handlers["buttonHomeClick"]);
    elements.app.appendChild(elements.button);
  }

  function renderCard(card) {
    if (!elements.videoCard) {
      elements.videoCard = document.createElement('div');
      elements.app.appendChild(elements.videoCard);
    } else {
      elements.videoCard.innerHTML = ''; 
    }

    elements.videoCard.appendChild(createCard(card));
  }

  function createCard(card) {
    let cardDiv = document.createElement('div');
    
    let cardImg = document.createElement('img');
    cardImg.src = card.card;
    cardDiv.appendChild(cardImg);
    
    let cardName = document.createElement('p');
    cardName.textContent = `Name: ${card.name}`;
    cardDiv.appendChild(cardName);
    
    let cardFlavour = document.createElement('p');
    cardFlavour.textContent = `Flavour: ${card.flavour ? card.flavour : "No flavour available"}`;
    cardDiv.appendChild(cardFlavour);

    if (card.art) {
      let cardArt = document.createElement('img');
      cardArt.src = card.art;
      cardDiv.appendChild(cardArt);
    }
    
    return cardDiv;
  }

  function renderCardList(cardlist) {
    elements.videoCard = elements.videoCard || document.createElement('div');
    elements.videoCard.id = 'cardList';
    elements.videoCard.className = 'card-container';
    elements.videoCard.innerHTML = ''; 

    cardlist.forEach(card => {
      elements.videoCard.appendChild(createCardListItem(card));
    });

    elements.app.appendChild(elements.videoCard);
  }

  function createCardListItem(card) {
    let cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    
    let cardImg = document.createElement('img');
    cardImg.src = card.card;
    cardDiv.appendChild(cardImg);

    return cardDiv;
  }

  externals.render = function (card) {
    initElements();
    renderButton();

    if (card) {
      renderCard(card);
    }
  };

  externals.renderMany = function (cardlist) {
    initElements();
    renderButton();
    console.log("rendermany", cardlist);
    renderCardList(cardlist);
  };

  return externals;
});
