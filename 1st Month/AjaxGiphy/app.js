"use strict";
const API_KEY = "PudxoDbmzhWwOhB1QG0wDoXBKDH7G94N";
$(document).ready(function () {
  // Display Giphs functions
  let displayGiphs = (str) => {
    console.log("called");
    if (str) {
      console.log("called if");
      $.ajax(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=25&q=${str}&offset=15`
      )
        .done((data) => {
          let giphData = data.data;
          $("#cardsRow").html("");
          let html = ``;
          $(giphData).each((i) => {
            html += `<div class="m-2">
                     <img src="${giphData[i].images.preview_gif.url}" alt="">
                   </div>`;
          });
          $("#cardsRow").append(html);
          $(":text").val("");
        })
        .fail(() => {
          alert("somthing wrong");
        });
    } else {
      alert("empty input");
    }
  };

  displayGiphs("Hello");
  $("button").on("click", function () {
    let input = $(":text").val();
    displayGiphs(input);
  });
  $(document).on("keypress", function (e) {
    if (e.which == 13) {
      let input = $(":text").val();
      displayGiphs(input);
    }
  });
});
