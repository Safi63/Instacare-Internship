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

      data["index"] = items.length;

      items.push(data);

      localStorage.setItem(LOCALSTORAGE_ITEMS_KEY, JSON.stringify(items));
      console.log(items);
      // table append
      btnEl.attr("disabled", false).text("Add");
      _$addForm.trigger("reset");
      myFunc();
      displayTable();
    } else {
      myFailure();
    }
  });

  //   Update Td
  $("table").on("click", ".js-edit", function () {
    let thisTR = $(this).closest("tr");
    let tdTitle = thisTR.children("td:nth-child(1)").html();
    let tdDesc = thisTR.children("td:nth-child(2)").html();
    let trIndex = thisTR
      .children("td:nth-child(3)")
      .children(".js-edit")
      .attr("id");

    const items =
      JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEMS_KEY)) || [];

    thisTR.children(
      "td:nth-child(1)"
    ).html(`  <input type="text" class="form-control border-primary" name="title" id="title" minlength="2"
    placeholder="Title..." value="${tdTitle}" required>`);
    thisTR.children(
      "td:nth-child(2)"
    ).html(`  <input type="text" class="form-control border-primary" name="description" id="description" minlength="2"
    placeholder="Description..." value="${tdDesc}" required>`);

    thisTR.children(
      "td:nth-child(3)"
    ).html(`<button type="button" class="shadow-none btn btn-block btn-outline-secondary js-save">
    <i class="fa fa-check"></i> save </button>`);

    $("button").not(".js-save").attr("disabled", true);
    // save changes
    let updatedObj = { title: "", description: "" };
    $("table").on("click", ".js-save", function () {
      const trEl = $(this).closest("tr");
      const title = trEl.find('input[name="title"]').val();
      const description = trEl.find('input[name="description"]').val();
      updatedObj.title = title;
      updatedObj.description = description;

      if (title && description) {
        $("button").attr("disabled", false);
        let items =
          JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEMS_KEY)) || [];

        items[trIndex] = updatedObj;
        localStorage.setItem(LOCALSTORAGE_ITEMS_KEY, JSON.stringify(items));
        showAlert("Updated", "Save all changes successfully", "success", "Ok");
        displayTable();
      } else {
        myFailure();
      }
    });
  });
  $("#myTable").dataTable({
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
  $("tbody").sortable("refreshPositions");
  const table = JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEMS_KEY));
  //   console.log(table);
  $("tbody").html("");
  let tabelBody = $("tbody");
  if (table) {
    let tr;
    table.forEach(function (item, index) {
      let html = `<tr id="${index}">
                      <td>${item.title}</td>
                      <td>${item.description}</td>
                      <td>
                          <button class="shadow-none btn btn-outline-danger pr-4 my-1 js-delete" onclick=removeTR(${index})><i class="fa fa-trash"></i> Delete</button>
                          <button id="${index}" class="shadow-none btn btn-outline-secondary pr-3  js-edit"><i class="fa fa-edit"></i> Update</button>
                      </td>
                   </tr>`;
      tr += html;
    });
    tabelBody.append(tr);
  } else {
    myFailure();
  }
}

// remove current row Function
function removeTR(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.value) {
      let items =
        JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEMS_KEY)) || [];

      items.splice(index, 1);

      localStorage.setItem(LOCALSTORAGE_ITEMS_KEY, JSON.stringify(items));
      displayTable();
    }
  });
}

// Update local storage position
function updatePosition(fromIndex, toIndex) {
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
