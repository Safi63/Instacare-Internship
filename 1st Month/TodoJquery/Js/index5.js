// Events
// Functions

$(function () {
  console.log("Ready");
  // adding items in todos
  $("input").on("keypress", (e) => {
    validateInput();
    if (e.which === 13) {
      addNewTodo();
    }
  });

  // add todo with button click
  $("#addBtn").on("click", function () {
    addNewTodo();
  });

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
  todo = $("input").val();
  let todosData = localStorage.getItem("todos");
  if (todosData !== null && validateInput() == true) {
    todos = JSON.parse(todosData);
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    $("#todoInput").val("");
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

function validateInput() {
  let valid;
  let inputValue = $("input");
  console.log(inputValue.attr("minlength"));
  let inputLength = inputValue.val().length;
  console.log(inputLength);
  if (inputValue.val()) {
    inputValue.removeClass("border-danger").addClass("border-success");
    $("#addBtn").removeClass("btn-danger").addClass("btn-success");
    $("#validationText").removeClass("visible").addClass("invisible");
    valid = true;
  } else {
    inputValue.removeClass("border-success").addClass("border-danger");
    $("#addBtn").removeClass("btn-success").addClass("btn-danger");
    $("#validationText").removeClass("invisible").addClass("visible");
    valid = false;
  }
  return valid;
}
