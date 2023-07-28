define(["views/draft-view", "services/draft-service"], function (view, service) {
    let externals = {};

    function bindHomeEventHandler() {
        view.bind("buttonHomeClick", buttonHomeHandler);

    }
    function buttonHomeHandler() {

        window.location.hash = "#home";

    }

    externals.start = function () {
        bindHomeEventHandler();
        service.startDraftGame("dmu", function (cardlist) {
        view.renderMany(cardlist);
        view.renderSidebar(service.getUserPicks());
            $('.card').on('click', function () {
                var cardId = $(this).attr('id');
                clickedACard(cardId);

            });

        });
    }
    function clickedACard(cardId) {

        view.renderMany(service.pickCard(cardId));
        view.renderSidebar(service.getUserPicks());

        $('.card').on('click', function () {
            var cardId = $(this).attr('id');
            clickedACard(cardId);
        })
    };

    return externals;
});
