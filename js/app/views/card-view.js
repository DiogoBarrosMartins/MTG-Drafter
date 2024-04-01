define(function () {
  let externals = {};
  let elements = {};
  let handlers = {};

  externals.bind = function (event, handler) {
    handlers[event] = handler;
  };

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
  
  externals.renderMany = function (input) {
    if (!elements.app) {
      elements.app = $("#app");
    }
    elements.app.empty();

    if (Array.isArray(input)) {
      elements.app.append(createCardList(input));
    } else if (input && typeof input === "object") {
      const container =
        document.getElementById("scry-view-container") ||
        createElementForScryViewContainer();
      container.innerHTML = "";
      for (let element of Object.values(input)) {
        renderCardList(element);
      }
    }

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

  function renderButton() {
    const btnContainer = document.createElement("div");
    btnContainer.id = "btn-container";
    const goBackButton = document.createElement("button");
    goBackButton.id = "goBack";
    goBackButton.textContent = "Go back";

    btnContainer.appendChild(goBackButton);
    goBackButton.addEventListener("click", handlers["buttonHomeClick"]);

    elements.app.prepend(btnContainer);
  }

  function renderCard(card) {
    elements.videoCard = $("<div class='card-view'></div>");
    elements.videoCard.append(createCard(card));
    elements.app.append(elements.videoCard);
  }

  function createCard(card) {
    const cardViewContainer = document.createElement("div");
    cardViewContainer.className = "card-view-container";

    const btnContainer = document.createElement("div");
    btnContainer.id = "btn-container";

    const goBackButton = document.createElement("button");
    goBackButton.id = "goBack";
    goBackButton.textContent = "Go back";
    btnContainer.appendChild(goBackButton);

    const reloadButton = document.createElement("button");
    reloadButton.id = "reload";
    reloadButton.textContent = "Give me another one!";
    btnContainer.appendChild(reloadButton);

    if (card.art) {
      const viewArtButton = document.createElement("button");
      viewArtButton.id = "viewArt";
      viewArtButton.textContent = "View Art";
      btnContainer.appendChild(viewArtButton);
    }

    const cardContent = document.createElement("div");
    cardContent.className = "card-content";

    const cardImageDiv = document.createElement("div");
    cardImageDiv.className = "card-image";
    const cardImg = document.createElement("img");
    cardImg.src = card.card;
    cardImg.alt = "Card image";
    cardImageDiv.appendChild(cardImg);

    const cardDetailsDiv = document.createElement("div");
    cardDetailsDiv.className = "card-details";
    const cardName = document.createElement("h2");
    cardName.textContent = card.name;
    const cardFlavour = document.createElement("p");
    cardFlavour.textContent = card.flavour || "No flavour text available";

    const cardArtDiv = document.createElement("div");
    cardArtDiv.className = "card-art";
    cardArtDiv.style.display = "none";
    const cardArtImg = document.createElement("img");
    cardArtImg.src = card.art;
    cardArtImg.alt = `Art of ${card.name}`;
    cardArtDiv.appendChild(cardArtImg);

    cardDetailsDiv.appendChild(cardName);
    cardDetailsDiv.appendChild(cardFlavour);
    cardDetailsDiv.appendChild(cardArtDiv);

    cardContent.appendChild(cardImageDiv);
    cardContent.appendChild(cardDetailsDiv);

    cardViewContainer.appendChild(btnContainer);
    cardViewContainer.appendChild(cardContent);

    return cardViewContainer;
  }

  function createElementForScryViewContainer() {
    const container = document.createElement("div");
    container.id = "scry-view-container";
    elements.app.append(container);
    return container;
  }

  function renderCardList(cardlist) {
    if (elements.videoCard) {
      elements.videoCard.empty();
    }
    elements.videoCard = $(createCardList(cardlist));
    elements.app.append(elements.videoCard);
  }


  function createCardList(cards) {
    const scryViewContainer = document.createElement("div");
    scryViewContainer.className = "scry-view-container";

    const btnContainer = document.createElement("div");
    btnContainer.id = "btn-container";

    const goBackButton = document.createElement("button");
    goBackButton.id = "goBack";
    goBackButton.textContent = "Go back";
    btnContainer.appendChild(goBackButton);

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.id = "search";
    searchInput.name = "search-field";
    btnContainer.appendChild(searchInput);

    const searchButton = document.createElement("button");
    searchButton.id = "search-btn";
    searchButton.textContent = "Search";
    btnContainer.appendChild(searchButton);

    const clearButton = document.createElement("button");
    clearButton.id = "clear-btn";
    clearButton.textContent = "Clear";
    btnContainer.appendChild(clearButton);
    scryViewContainer.appendChild(btnContainer);

    const scryCardContainer = document.createElement("div");
    scryCardContainer.className = "scry-card-container";
    scryViewContainer.appendChild(scryCardContainer);

    cards.forEach((card) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "scry-card";
      cardDiv.setAttribute("data-card-name", card.name);

      const cardName = document.createElement("h1");
      cardName.className = "scry-card-name";
      cardName.textContent = card.name;

      const cardImgDiv = document.createElement("div");
      cardImgDiv.className = "scry-card-image";

      const cardImg = document.createElement("img");
      cardImg.src = card.card;
      cardImg.alt = card.name;

      cardImgDiv.appendChild(cardName);
      cardImgDiv.appendChild(cardImg);
      cardDiv.appendChild(cardImgDiv);
      scryCardContainer.appendChild(cardDiv);
    });

    return scryViewContainer;
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
  
  return externals;
});
