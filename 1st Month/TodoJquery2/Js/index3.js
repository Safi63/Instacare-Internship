printTodoList();
function printTodoList() {
  let dataInLocalStorage = localStorage.getItem("todos");
  if (dataInLocalStorage == null) {
    todos = [];
  } else {
    todos = JSON.parse(dataInLocalStorage);
  }
  let html = "";
  todos.forEach((todo, index) => {
    html += `<li style="border: 1px solid" class="border-success row align-items-center bg-white list-unstyled px-2 mx-auto py-2 my-2">
    <div class="col-6 font-weight-bold">${todo}</div>
     <div class="col-6 mx-0 px-0"><button class="btn btn-danger float-right py-0 " onclick='removeTodo(${index});'>x</button></div></li>`;
  });
  $("ul").empty().append(html);
}

// adding items in todos
$("input").on("keypress", (e) => {
  if (e.which === 13 && $("input").val() !== "") {
    todo = $("input").val();
    let todosData = localStorage.getItem("todos");
    if (todosData == null) {
      todos = [];
    } else {
      todos = JSON.parse(todosData);
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    $("input").val("");
    printTodoList();
  }
});

// add todo with button click
$("#addBtn").click(function () {
  todo = $("input").val();
  let todosData = localStorage.getItem("todos");
  if (todosData == null) {
    todos = [];
  } else {
    todos = JSON.parse(todosData);
    if (todo !== "") {
      todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      $("#todoInput").val("");
    } else {
      alert("Must Enter the value");
    }
  }
  printTodoList();
});

// logic for removing todo from the todos list
let removeTodo = (index) => {
  let todosData = localStorage.getItem("todos");
  todos = JSON.parse(todosData);
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  printTodoList();
};
