function addTodoFunction() {
  let todos = document.getElementById("todos");
  let text = prompt("Enter a Value");
  let T = Test(text);
  function Test(str) {
    return /^[a-zA-Z]+$/.test(str);
  }
  const d = new Date();

  let li = `<li class="bg-warning rounded-pill list-unstyled row justify-content-between p-2 my-2">
               <div class="col-4 align-self-center">
                 <span class="font-weight-bold mt-2 ml-3 text-break">${text}</span> 
               </div>
               <div class="col-4 text-center align-self-center">
                 <span class="font-weight-bold mt-2 ml-3 text-center ">${d.toDateString()}</span>
               </div>
               <div class="col-4 mr-0 pr-1 align-self-center">
                 <button class="btn btn-danger float-right rounded-pill js-delete">Delete</button>
               </div>
            </li>`;
  if (!T || !text) {
    text = prompt("Must enter a Value");
  } else {
    todos.insertAdjacentHTML("beforeend", li);
  }

  //   Delete todo
  var del = document.getElementsByClassName("js-delete");
  for (i = 0; i < del.length; i++) {
    del[i].onclick = function () {
      var div = this.parentElement.parentElement;
      div.remove();
    };
  }
}
