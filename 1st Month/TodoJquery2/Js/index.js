$(document).ready(function () {
  // add todo
  $("#addBtn").click(function () {
    let todos = $("#todos");
    let text = $("#todoInput").val();
    let li = `<li style="border: 1px solid" class="border-success list-unstyled row justify-content-between mx-auto py-1 my-2">
                <div class="col-4 align-self-center">
                  <span class="font-weight-bold mt-2 text-break">${text}</span>
                </div>
                <div class="col-4 mr-0 pr-1 align-self-center">
                  <button class="btn btn-danger px-3 pt-1 text float-right js-delete">x</button>
                </div>
              </li>`;
    if (!text) {
      alert("Must enter a Value");
    } else {
      todos.append(li);
    }
    $("#todoInput").val("");

    //   Delete todo
    var del = $(".js-delete");
    for (i = 0; i < del.length; i++) {
      $(del[i]).click(function () {
        console.log(del[i]);
        $(this).parents("li").remove();
      });
    }
  });

  $("input").keypress(function (event) {
    if (event.which === 13) {
      let todos = $("#todos");
      let text = $("#todoInput").val();
      let li = `<li style="border: 1px solid" class="border-success list-unstyled row justify-content-between mx-auto py-1 my-2">
                  <div class="col-4 align-self-center">
                    <span class="font-weight-bold mt-2 text-break">${text}</span>
                  </div>
                  <div class="col-4 mr-0 pr-1 align-self-center">
                    <button class="btn btn-danger px-3 pt-1 text float-right js-delete">x</button>
                  </div>
                </li>`;
      if (!text) {
        alert("Must enter a Value");
      } else {
        todos.append(li);
      }
      $("#todoInput").val("");

      //   Delete todo
      var del = $(".js-delete");
      for (i = 0; i < del.length; i++) {
        $(del[i]).click(function () {
          $(this).parents("li").remove();
        });
      }
    }
  });
});
