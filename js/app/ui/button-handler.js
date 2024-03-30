$("#random").click(function () {
  window.location.hash = "card";
});
$("#search-btn").click(function () {
  if ($("#search").val() == "") {
    window.location.hash = "#home";
  } else {
    window.location.hash = "scry";
  }
});

$("#clear-btn").click(function () {
  $("#search").val("");
  window.location.hash = "home";
});

$("#booster-btn").click(function () {
  console.log("handler called");
  window.location.hash = "booster";
});
$("#draft-btn").click(function () {
  console.log("draft handler called");
  window.location.hash = "draft";
});
