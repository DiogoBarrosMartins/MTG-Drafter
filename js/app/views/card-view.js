define(function () {
  let externals = {};
  let elements = {};
  let handlers = {};

  externals.render = function (card) {
    if (!elements.app) {
      elements.app = $("#app");
    }
    elements.app.empty();

    if (card) {
      renderCard(card);
    } else {
      renderButton();
    }
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

  function createCard(card) {
    let buttons = `
      <div id="btn-container">
        <button id="goBack">Go back</button> <button id="reload">Give me another one!</button>
        ${card.art ? `<button id="viewArt">View Art</button>` : ""}
      </div>`;

    let cardContent = `
      <div class="card-content">
        <div class="card-image">
          <img src="${card.card}" alt="Card image" />
        </div>
        <div class="card-details">
          <h2>${card.name}</h2>
          <p>${card.flavour || "No flavour text available"}</p>
          <div class="card-art" style="display: none;">
          <img src="${card.art}" alt="Art of ${card.name}" />
        </div>
        </div>
      </div>`;

    return `
      <div class="card-view-container">
        ${buttons}
        ${cardContent}
    
      </div>`;
  }

  $(document).on("click", "#goBack", function () {
    window.location.hash = "#home";
  });
  $(document).on("click", "#reload", function () {
    window.location.reload();
  });

  $(document).on("click", "#viewArt", function () {
    $(".card-art").slideToggle();
  });

  $(document).on("click", "#search-btn", function () {
    let searchQuery = $("#search").val();
    if (searchQuery === "") {
      window.location.hash = "#home";
    } else {
      window.location.hash = `#scry?query=${encodeURIComponent(searchQuery)}`;
      if (typeof handlers["search"] === "function") {
        handlers["search"](searchQuery);
      }
    }
  });

  externals.renderMany = function (cardlist) {
    if (!elements.app) {
      elements.app = $("#app");
    }
    const container = document.getElementById("scry-view-container");
    container.innerHTML = "";
    if (cardlist) {
      for (let element of cardlist) {
        renderCardList(element);
      }
    }
    $(".scry-card").click(function () {
      let cardName = $(this).data("card-name");
      if (handlers["cardClick"]) {
        handlers["cardClick"](cardName);
      }
    });
  };

  function renderCardList(cardlist) {
    if (elements.videoCard) {
      elements.videoCard.empty();
    }
    elements.videoCard = $(createCardList(cardlist));
    elements.app.append(elements.videoCard);
  }

  function createCardList(cards) {
    let buttons = `
    <div id="btn-container">
      <button id="goBack">Go back</button> 
      <input type="text" id="search" name="search-field">
      <button id="search-btn"> Search </button></form>
    </div>`;

    let scryViewContainer = $('<div class="scry-view-container"></div>');
    scryViewContainer.append(buttons);
    let scryCardContainer = $('<div class="scry-card-container"></div>');
    scryViewContainer.append(scryCardContainer);

    cards.forEach(function (card) {
      let cardDiv = $(
        '<div class="scry-card" data-card-name="' + card.name + '"></div>'
      );

      let cardImgDiv = $(`<h1 class="scry-card-name">${card.name}</h1>
      <div class="scry-card-image"></div> 
      <img src="${card.card}" alt="${card.name}">`);

      cardDiv.append(cardImgDiv);
      scryCardContainer.append(cardDiv);
    });

    return scryViewContainer;
  }

  externals.renderMany = function (cards) {
    if (!elements.app) {
      elements.app = $("#app");
    }

    elements.app.empty();

    elements.app.append(createCardList(cards));
    $(".scry-card").click(function () {
      let cardName = $(this).data("card-name");
      console.log("Clicked card name:", cardName);
      if (handlers["cardClick"] && cardName) {
        handlers["cardClick"](cardName);
      } else {
        console.error("Handler or card name is undefined");
      }
    });
  };

  return externals;
});
