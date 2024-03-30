define(function () {
  let externals = {};

  function renderButton(app) {
    app.append(`<div id="button-container">
                  <button id="random"> Random Card?</button>
                  <input type="text" id="search" name="search-field">
                  <button id="search-btn"> Search </button></form>
                  <button id="clear-btn"> Clear</button>
                  <button id="booster-btn"> Booster</button>
                  <button id="draft-btn"> Draft</button>
                </div>`);
    console.log("render button");
    bindButtonHandlers();
  }

  function bindButtonHandlers() {
    $("#random").click(function () {
      window.location.hash = "card";
    });
    $("#search-btn").click(function () {
      let searchQuery = $("#search").val().trim();
      if (searchQuery === "") {
        window.location.hash = "#home";
      } else {
        window.location.hash = `scry?query=${encodeURIComponent(searchQuery)}`;
      }
    });
    $("#clear-btn").click(function () {
      $("#search").val("");
      window.location.hash = "#home";
    });
    $("#booster-btn").click(function () {
      window.location.hash = "booster";
    });
    $("#draft-btn").click(function () {
      window.location.hash = "draft";
    });
  }

  externals.render = function () {
    let app = $("#app");
    app.empty();
    renderButton(app);
  };

  return externals;
});
