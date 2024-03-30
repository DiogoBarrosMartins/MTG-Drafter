define(["views/card-view", "services/card-service"], function (view, service) {
  let externals = {};

  externals.start = function () {
    bindEventHandlers();
    performSearchBasedOnHash();
    bindCardClickHandler();
  };

  function bindEventHandlers() {
    view.bind("search", function (searchInput) {
      performNewSearch(searchInput);
    });
  }
  function bindCardClickHandler() {
    view.bind("cardClick", cardClickHandler);
  }

  function performNewSearch(searchQuery) {
    service
      .getCardsByString(searchQuery)
      .then(function (cardlist) {
        view.renderMany(cardlist);
      })
      .catch(function (error) {
        console.error("Search failed:", error);
      });
  }

  function performSearchBasedOnHash() {
    let hash = window.location.hash;
    let params = new URLSearchParams(hash.substring(hash.indexOf("?")));
    let searchQuery = params.get("query");

    if (searchQuery) {
      performNewSearch(decodeURIComponent(searchQuery));
    }
  }

  function cardClickHandler(cardName) {
    service
      .getCardDetailsByName(cardName)
      .then((cardDetails) => {
        view.render(cardDetails);
      })
      .catch((error) => console.error("Error fetching card details:", error));
  }

  return externals;
});
