$(document).ready(function () {
  $("button").click(function () {
    $.ajax("https://jsonplaceholder.typicode.com/users/")
      .done((data) => {
        $("#cardsRow").html("");
        $(data).each((i) => {
          let html = `<div class="card col-5 my-3 border-dark">
                         <div class="card-body text-left">
                             <h5 class="card-title">User Id: ${data[i].id}</h5>
                             <h4 class="card-title">Name: ${data[i].name}</h4>
                             <p class="card-text font-weight-bold">Email: ${data[i].email}</p>
                         </div>
                       </div>`;
          console.log(html);
          $("#cardsRow").append(html);
        });
      })
      .fail(() => {
        alert("somthing wrong");
      });
  });
});
