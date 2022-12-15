$(function () {
  // adding items in todos
  $("input").on("keypress", (e) => {
    formValidation();
    if (e.which === 13) {
      addNewTodo();
    }
  });

  $("input").change(function () {
    formValidation();
  });
  // add todo with button click
  $("#btn-submit").on("click", function (e) {
    // addNewTodo();

    if (formValidation) {
      var formData = $("form").serializeArray();
      $.each(formData, function (i, field) {
        $("#list").append(field.name + ":" + field.value + " " + "<br/>");
      });
      console.log($("form").serialize());
    }
    e.preventDefault();

    formValidation();
  });

  // $("form").submit(function (e) {
  //   if (formValidation()) {
  //     e.preventDefault();
  //     $("#list").text($("form").serialize());

  //     console.log(e);
  //   } else {
  //   }
  // });
  document.addEventListener(
    "invalid",
    (function () {
      return function (e) {
        e.preventDefault();
        $("input").focus();
      };
    })(),
    true
  );
  displayTodoList();
});

function displayTodoList() {
  let dataInLocalStorage = localStorage.getItem("todos");
  if (dataInLocalStorage == null) {
    todos = [];
  } else {
    todos = JSON.parse(dataInLocalStorage);
    let html = "";
    todos.forEach((todo, index) => {
      html += `<li style="border: 1px solid" class="border-success row align-items-center bg-white list-unstyled px-2 mx-auto py-2 my-2">
      <div class="col-6 font-weight-bold">${todo}</div>
       <div class="col-6 mx-0 px-0"><button class="btn btn-danger float-right py-0 " onclick='removeTodo(${index});'>x</button></div></li>`;
    });
    $("ul").empty().append(html);
  }
}

let addNewTodo = () => {
  todoTitle = $("inputTitle").val();
  todoDescription = $("#inputDescription").val();
  let todosData = localStorage.getItem("todos");
  if (todosData !== null && validateInput() == true) {
    todos = JSON.parse(todosData);
    todos.push(todoTitle, todoDescription);
    localStorage.setItem("todos", JSON.stringify(todos));
    // $("#todoInput").val("");
  } else {
    // $("input").removeClass("border-success").addClass("border-danger");
    todos = [];
  }
  displayTodoList();
};

// logic for removing todo from the todos list
let removeTodo = (index) => {
  let todosData = localStorage.getItem("todos");
  todos = JSON.parse(todosData);
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  displayTodoList();
};

function formValidation() {
  let valid = true;

  // validtion for all [input:text] fields
  $(":text").each(function () {
    let thisEl = $(this);
    let txt = $(this).val();
    if (txt) {
      thisEl.removeClass("border-danger").addClass("border-primary");
      thisEl
        .siblings("label")
        .removeClass("text-danger")
        .addClass("text-primary");
      thisEl.siblings("p").removeClass("visible").addClass("invisible");
      valid = true;
    } else {
      thisEl.removeClass("border-primary").addClass("border-danger");
      thisEl
        .siblings("label")
        .removeClass("text-primary")
        .addClass("text-danger");
      thisEl
        .siblings("p")
        .text(thisEl.siblings("label").text() + " is required . . .")
        .addClass("visible")
        .removeClass("invisible");
      valid = false;
    }
  });

  // validtion for all [input:checkbox] fields
  $(":checkbox").each(function () {
    let thisEl = $(this);
    let checkbox = $("input[type=checkbox]:checked");
    if (checkbox.length > 0) {
      $("#dateCheckBox").val(new Date().toDateString());
      thisEl
        .parent()
        .siblings("p.js-heading")
        .removeClass("text-danger")
        .addClass("text-primary");
      thisEl
        .parent()
        .siblings("p.js-textInvalid")
        .removeClass("visible")
        .addClass("invisible");
      valid = true;
    } else {
      thisEl
        .parent()
        .siblings("p.js-heading")
        .removeClass("text-primary")
        .addClass("text-danger");
      thisEl
        .parent()
        .siblings("p.js-textInvalid")
        .text(
          thisEl.parent().siblings("p.js-heading").text() + " is required . . ."
        )
        .addClass("visible")
        .removeClass("invisible");
      valid = false;
    }
  });
  // validtion for all [input:radio] fields
  $(":radio").each(function () {
    let thisEl = $(this);
    var groupName = thisEl.attr("name");
    var val = $("input:radio[name=" + groupName + "]:checked").length;
    if (val > 0) {
      thisEl
        .parent()
        .parent()
        .siblings("p.js-radioHeading")
        .removeClass("text-danger")
        .addClass("text-primary");
      thisEl
        .parent()
        .parent()
        .siblings("p.js-textInvalid")
        .addClass("invisible")
        .removeClass("visible");
      valid = true;
    } else {
      thisEl
        .parent()
        .parent()
        .siblings("p.js-radioHeading")
        .removeClass("text-primary")
        .addClass("text-danger");
      thisEl
        .parent()
        .parent()
        .siblings("p.js-textInvalid")
        .text("Priority is required . . .")
        .addClass("visible")
        .removeClass("invisible");
      valid = false;
    }
  });
  return valid;
}
