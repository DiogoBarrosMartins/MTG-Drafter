define(["views/card-view", "services/card-service"], function (view, service) {
  let externals = {};

  function bindHomeEventHandler() {
    view.bind("buttonHomeClick", buttonHomeHandler);

  }

  function buttonHomeHandler() {

    window.location.hash = "#home";

  }

  externals.start = function () {
    bindHomeEventHandler();
    service.getCardsByString(function (cardlist) {
    view.renderMany(cardlist);

    });

  };

  return externals;
});
