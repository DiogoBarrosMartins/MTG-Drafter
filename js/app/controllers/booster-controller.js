define(["views/booster-view", "services/card-service"], function (
  view,
  service
) {
  let externals = {};

  function bindHomeEventHandler() {
    view.bind("buttonHomeClick", buttonHomeHandler);
  }
  function buttonHomeHandler() {
    window.location.hash = "#home";
  }
  externals.start = function () {
    console.log("here");
    bindHomeEventHandler();
  };

  service.generateRandomBooster("dmu", function (cardlist) {
    view.renderMany(cardlist);
  });
  return externals;
});
