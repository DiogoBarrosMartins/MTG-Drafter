define(["views/card-view", "services/card-service"], function (view, service) {
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

    service.getRandomCard(function (data) {
      view.render(data);
    });
  };
  return externals;
});
