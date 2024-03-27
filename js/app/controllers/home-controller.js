define(["views/home-view", "views/card-view", "services/card-service", "services/draft-service"], function (homeview, cardview, service) {


  let externals = {};

  externals.start = function () {

    homeview.render();
  };

  return externals;

});
