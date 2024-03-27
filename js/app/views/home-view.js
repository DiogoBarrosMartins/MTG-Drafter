define(function () {
  var externals = {};

  function renderButton(app) {
console.log("render button");
    app.append(`<button id="random"> Random Card?</button>
                <input type="text" id="search" name="search-field"><br>
                <button id="search-btn"> Search </button></form>
                <button id="clear-btn"> Clear</button>
                <button id="booster-btn"> Booster</button>
                <button id="draft-btn"> Draft</button>
                </div>
                `);}

  externals.render = function () {
    let app = $('#app').empty();
    renderButton(app);
  };

  return externals;
});
