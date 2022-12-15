const _$addForm = $("#addForm"),
  LOCALSTORAGE_ITEMS_KEY = "items";

$(function () {
  $("tbody").sortable({
    start: function (e, ui) {
      // creates a temporary attribute on the element with the old index
      $(this).attr("data-previndex", ui.item.index());
    },
    update: function (e, ui) {
      // gets the new and old index then removes the temporary attribute
      var newIndex = ui.item.index();
      var oldIndex = $(this).attr("data-previndex");

      updatePosition(oldIndex, newIndex);
      $(this).removeAttr("data-previndex");
    },
  });
  displayTable();

  //hide html input invalid popup
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

  $("input").on("keypress", (e) => {
    formValidation();
  });
  $("input").on("change", function () {
    formValidation();
  });

  //   Add items
  _$addForm.find(".js-submit-btn").on("click", function () {
    // validate
    formValidation();
    if (valid) {
      const btnEl = $(this);
      btnEl.attr("disabled", true).text("Adding...");

      const data = _$addForm.serializeObject();

      const items =
        JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEMS_KEY)) || [];

      data["index"] = `${items.length}`;

      items.push(data);

      localStorage.setItem(LOCALSTORAGE_ITEMS_KEY, JSON.stringify(items));

      console.log(table.row);
      table.row
        .add([
          data.title,
          data.description,
          `<button class="shadow-none btn btn-outline-danger pr-4 my-1 js-delete"><i class="fa fa-trash"></i> Delete</button>
          <button id="${data.index}" class="shadow-none btn btn-outline-secondary pr-3  js-edit"><i class="fa fa-edit"></i> Update</button>`,
        ])
        .draw();

      // $("#myTable").DataTable().destroy();

      // $("table").append(`<tr id="${data.index}">
      // <td>${data.title}</td>
      // <td>${data.description}</td>
      // <td>
      // <button class="shadow-none btn btn-outline-danger pr-4 my-1 js-delete" onclick=removeTR(${data.index})><i class="fa fa-trash"></i> Delete</button>
      // <button id="${data.index}" class="shadow-none btn btn-outline-secondary pr-3  js-edit"><i class="fa fa-edit"></i> Update</button>
      // </td>
      // </tr>`);

      // $("#myTable").DataTable();

      // table append
      btnEl.attr("disabled", false).text("Add");
      _$addForm.trigger("reset");
      myFunc();
      //displayTable();
    } else {
      myFailure();
    }
  });

  //   Update Td
  $("table").on("click", ".js-edit", function () {
    let thisIndex = $(this).attr("id");

    let data = table.row(thisIndex).data();
    data[0] = `<input type="text" class="form-control border-primary" name="title" id="title" minlength="2"
                placeholder="Title..." value="${data[0]}" required>`;
    data[1] = `<input type="text" class="form-control border-primary" name="description" id="description" minlength="2"
                placeholder="Description..." value="${data[1]}" required>`;
    data[2] = `<button id="${thisIndex}" type="button" class="shadow-none btn btn-block btn-outline-secondary js-save">
               <i class="fa fa-check"></i> save </button>`;

    table.row(thisIndex).data(data).draw();

    $("button").not(".js-save").attr("disabled", true);
    // save changes
  });

  $("table").on("click", ".js-save", function () {
    let thisIndex = $(this).attr("id");

    let updatedObj = { title: "", description: "", index: thisIndex };

    let data = table.row(thisIndex).data();
    const trEl = $(this).closest("tr");
    let title = trEl.find('input[name="title"]').val();
    let description = trEl.find('input[name="description"]').val();
    updatedObj.title = title;
    updatedObj.description = description;

    data[0] = `${title}`;
    data[1] = `${description}`;
    data[2] = `<button class="shadow-none btn btn-outline-danger pr-4 my-1 js-delete" ><i class="fa fa-trash"></i> Delete</button>
               <button class="shadow-none btn btn-outline-secondary pr-3 js-edit"><i class="fa fa-edit"></i> Update</button>`;

    $("button").attr("disabled", false);
    const items =
      JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEMS_KEY)) || [];

    items[thisIndex] = updatedObj;

    localStorage.setItem(LOCALSTORAGE_ITEMS_KEY, JSON.stringify(items));

    table.row(thisIndex).data(data).draw();
    showAlert("Updated", "Save all changes successfully", "success", "Ok");
    //displayTable();
  });

  // Delet experiment
  $("table").on("click", ".js-delete", function () {
    let thisEl = $(this).closest("tr");
    let thisID = thisEl.attr("id");
    let items = JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEMS_KEY)) || [];

    items.splice(thisID, 1);

    localStorage.setItem(LOCALSTORAGE_ITEMS_KEY, JSON.stringify(items));

    table.row(thisEl).remove().draw();
  });

  var table = $("#myTable").DataTable({
    dom: "Bfrtip",
    buttons: ["pdfHtml5", "excelHtml5"],
    autoWidth: false,
    columnDefs: [
      {
        targets: ["_all"],
        className: "mdc-data-table__cell",
      },
    ],
  });
});

function displayTable() {
  let items = JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEMS_KEY));
  //   console.log(table);
  $("tbody").html("");
  let tabelBody = $("tbody");
  if (items) {
    let tr;
    items.forEach(function (item, index) {
      let html = `<tr id="${index}">
                      <td>${item.title}</td>
                      <td>${item.description}</td>
                      <td>
                          <button class="shadow-none btn btn-outline-danger pr-4 my-1 js-delete" ><i class="fa fa-trash"></i> Delete</button>
                          <button id="${index}" class="shadow-none btn btn-outline-secondary pr-3 js-edit"><i class="fa fa-edit"></i> Update</button>
                      </td>
                   </tr>`;
      tr += html;
    });
    tabelBody.append(tr);
  } else {
    myFailure();
  }
}

// Update local storage position
function updatePosition(fromIndex, toIndex) {
  console.log("old position" + fromIndex);
  console.log("new position" + toIndex);

  const items = JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEMS_KEY)) || [];

  var item = items[fromIndex];
  items.splice(fromIndex, 1);
  items.splice(toIndex, 0, item);
  localStorage.setItem(LOCALSTORAGE_ITEMS_KEY, JSON.stringify(items));
}

// validation function
var valid = false;
var inputCount;
function formValidation() {
  inputCount = 0;
  $(":text").each(function () {
    let thisEl = $(this);
    let min = thisEl.attr("minlength");

    let txt = $(this).val();
    if (txt && txt.length + 1 >= min) {
      thisEl.removeClass("border-danger").addClass("border-primary");
      thisEl
        .siblings("label")
        .removeClass("text-danger")
        .addClass("text-primary");
      thisEl.siblings("p").removeClass("visible").addClass("invisible");
      inputCount++;
      valid = true;
      return;
    } else {
      thisEl.removeClass("border-primary").addClass("border-danger");
      thisEl
        .siblings("label")
        .removeClass("text-primary")
        .addClass("text-danger");
      thisEl
        .siblings("p")
        .text(
          thisEl.siblings("label").text() +
            ` is required (minimum ${min} characters)`
        )
        .addClass("invisible")
        .removeClass("invisible");
      valid = false;
      return;
    }
  });
  return valid;
}

// Sweet alert functions
function myFunc() {
  showAlert("Good Job!", "New item added successfully", "success", "Ok");
}
function myFailure() {
  showAlert("Error", "Somthing wrong...Please check", "error", "Try again");
}
function showAlert(title, text, icon, btnText) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: btnText,
  });
}

// serializeObject function
$.fn.serializeObject = function () {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function (i) {
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || "");
    } else {
      o[this.name] = this.value || "";
    }
  });
  return o;
};
