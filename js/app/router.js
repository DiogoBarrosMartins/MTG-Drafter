
define(function () {
    let externals = {}; 
    let routes = {
        card: {
            hash: "#card",
            controller: "card-controller",
        },
        home: {
            hash: "#home",
            controller: "home-controller"
        }, 
        scry: {
            hash: "#scry",
            controller: "scry-controller"
        }, 
        booster: {
            hash: "#booster",
            controller: "booster-controller"
        }, 
        draft: {
            hash: "#draft",
            controller: "draft-controller"
        }
    };

    function getRoute() {
        return Object.values(routes).find(function (route) {
            return window.location.hash === route.hash;
        });
    };

    function initController(route) {
        require(['controllers/' + route.controller], function (controller) {
            controller.start();
        });
    };

    externals.start = function () {
        try {
            window.onhashchange = function () {
                initController(getRoute());
            };
            $(document).ready(function() {
                if (!window.location.hash) {
                    window.location.hash = '#home';
                } else {
                    initController(getRoute());
                }
            });
        
        } catch (err) {
            alert(err);
            window.location.hash = 'home';
            
        }
      
    };
    return externals;
});
