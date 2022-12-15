function printTodoList() {
  let dataInLocalStorage = localStorage.getItem("todos");
  if (dataInLocalStorage == null) {
    todos = [];
  } else {
    todos = JSON.parse(dataInLocalStorage);
    let html = "";
    todos.forEach((todo, index) => {
      html += `
             <li style="border: 1px solid" class="border-success list-unstyled row justify-content-between mx-auto py-1 my-2">
                <div class="col-4 align-self-center">
                  <span class="font-weight-bold mt-2 text-break">${todo}</span>
                </div>
                <div class="col-4 mr-0 pr-1 align-self-center">
                  <button class="btn btn-danger px-3 pt-1 text float-right js-delete"  onclick='${removeTodo(
                    { index }
                  )}'>x</button>
                </div>
             </li>
             <li style="border: 1px solid" class="border-success list-unstyled row justify-content-between mx-auto py-1 my-2 onclick='removeTodo(${index});'">${todo}</li>
             `;
    });
    $("#todos").append(html);
    console.log(todos);
  }
}
function removeTodo(index) {
  console.log(this);
  let todosData = localStorage.getItem("todos");
  todos = JSON.parse(todosData);
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  printTodoList();
}
$(document).ready(function () {
  printTodoList();
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

  // add todo with Press Enter Key
  $("input").keypress(function (event) {
    if (event.which === 13 && $("input").val() !== "") {
      todo = $("input").val();
      let todosData = localStorage.getItem("todos");
      if (todosData == null) {
        todos = [];
      } else {
        todos = JSON.parse(todosData);
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        $("#todoInput").val("");
        printTodoList();
      }
    }
  });
});
