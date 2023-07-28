define(function () {
  var externals = {};

  function renderButton(app) {
console.log("render button");
    app.append(`<button id="random" style='border: 1px solid; margin-top: 30px; margin-left: 200px; margin-right: 30px;'> Random Card?</button>
      <input type='text' id='search' name='search-field'><br>
      <button style='border: 1px solid; margin-top: 30px; margin-left: 200px; margin-right: 30px;'> Search </button></form>
      <button style='border: 1px solid; margin-top: 30px; margin-left: 200px; margin-right: 30px;'> Clear</button>
      <button style='border: 1px solid; margin-top: 30px; margin-left: 200px; margin-right: 30px;'> Booster</button>
      <button style='border: 1px solid; margin-top: 30px; margin-left: 200px; margin-right: 30px;'> Draft</button>` 

      );
  
    }

  externals.render = function () {
    let app = $('#app').empty();

    renderButton(app);
  };

  return externals;
});
