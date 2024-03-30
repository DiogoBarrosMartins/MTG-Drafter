define(function () {
  let externals = {};
  let routes = {
    card: {
      hash: "#card",
      controller: "card-controller",
    },
    home: {
      hash: "#home",
      controller: "home-controller",
    },
    scry: {
      hash: "#scry",
      controller: "scry-controller",
    },
    booster: {
      hash: "#booster",
      controller: "booster-controller",
    },
    draft: {
      hash: "#draft",
      controller: "draft-controller",
    },
  };

  function getRoute() {
    let hash = window.location.hash.split("?")[0];
    return (
      Object.values(routes).find(function (route) {
        return hash === route.hash;
      }) || routes["home"]
    );
  }

  function initController(route) {
    if (!route || !route.controller) {
      console.error("No route or controller found for:", route);
      window.location.hash = "#home"; // Redirect to home if route is undefined
      return;
    }

    require(["controllers/" + route.controller], function (controller) {
      controller.start();
    });
  }

  externals.start = function () {
    try {
      window.onhashchange = function () {
        initController(getRoute());
      };
      $(document).ready(function () {
        if (!window.location.hash) {
          window.location.hash = "#home";
        } else {
          initController(getRoute());
        }
      });
    } catch (err) {
      alert(err);
      window.location.hash = "home";
    }
  };
  return externals;
});
