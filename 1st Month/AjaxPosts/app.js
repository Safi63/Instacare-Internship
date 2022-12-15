"use strict";
$(document).ready(function () {
  $("button").on("click", function () {
    $.ajax("https://jsonplaceholder.typicode.com/posts/")
      .done((data) => {
        // console.log(data);
        $("#cardsRow").html("");
        $(data).each((i) => {
          let html = `<div class="card col-5 my-3 border-dark">
                 <div class="card-body text-left">
                     <h5 class="card-title">Id:<span class="font-weight-normal text-dark"> ${data[i].id}</span></h5>
                     <h5 class="card-title">User Id: <span class="font-weight-normal text-dark">${data[i].userId}</span></h5>
                     <h4 class="card-title">Title: <span class="font-weight-normal text-dark">${data[i].title}</span></h4>
                     <p class="card-text font-weight-bold">Body: <span class="font-weight-normal text-dark">${data[i].body}</span></p>
                     <a href="#" id="${data[i].id}" class="btn btn-dark shadow-none openModal" type="button" data-toggle="modal" data-target="#modal" 
                     >Comment</a>
                 </div>
               </div>`;
          // console.log(html);
          $("#cardsRow").append(html);
        });
        $(".openModal").click(function () {
          let postId = $(this).attr("id");
          $.ajax(
            `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
          ).done((data) => {
            $("#modalBody").html("");
            $("#modalTitle").text("Comments Of Post No. " + postId);
            $(data).each((i) => {
              let html = `<p><span class="font-weight-bold">Comment ${
                i + 1
              }: </span> ${data[i].body}</p>`;
              $("#modalBody").append(html);
            });
            console.log(data);
          });
        });
      })
      .fail(() => {
        alert("somthing wrong");
      });
  });
});

// function showComment(x) {
//   console.log(x);
//   // $("#modalBody").html(x);
//   //   let modal = `
//   //    <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
//   //    aria-hidden="true">
//   //    <div class="modal-dialog" role="document">
//   //        <div class="modal-content">
//   //            <div class="modal-header">
//   //                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
//   //                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//   //                    <span aria-hidden="true">&times;</span>
//   //                </button>
//   //            </div>
//   //            <div class="modal-body">
//   //                ...
//   //            </div>
//   //        </div>
//   //    </div>
//   // </div>
//   //   `;
// }
