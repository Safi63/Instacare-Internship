$(function () {
  $("input").on("keypress", (e) => {
    formValidation();
  });

  $("input").change(function () {
    formValidation();
  });

  $("#addRow").on("click", () => {
    addNewRow();
  });

  //submit form and get data
  let formDataCollection = {};
  $("#btn-submit").on("click", function (e) {
    if (valid) {
      var formData = $("form").serializeArray();
      $.each(formData, function (i, field) {
        if (field.value) {
          $("#list").append(field.name + ": " + field.value + " " + "<br/>");
          let fieldObject = {
            value: field.value,
          };
          formDataCollection[field.name] = fieldObject.value;
        }
      });
      console.log(formDataCollection);
      formDataCollection = {};
    }
    // e.preventDefault();
    formValidation();
  });

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
  // remove row
  $(document).on("click", "#removeRow", function () {
    $(this).closest("#inputFormRow").remove();
  });
});

var valid;
function formValidation() {
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
      return;
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
      return;
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
      return;
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
      return;
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
      return;
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
      return;
    }
  });
  return valid;
}
function addNewRow() {
  var userInput = prompt("Set the field name...");

  // let testedValue = testPromptedValue(userInput);
  if (userInput) {
    var html = `<div class="mb-2 " id="inputFormRow">
                  <label for="input${userInput}" class="mb-1 font-weight-bold text-primary">${userInput} </label>
                  <input class="form-control border-primary shadow-none" id="input${userInput}" placeholder="${userInput} . . ."
                  required name="${userInput}" value="" autocomplete="off"/>
                  <div class="input-group-append float-right">
                    <button id="removeRow" type="button" class="float-right"><i class="fa-solid fa-trash"></i></button>
                  </div>
                  <p class="m-0 invisible text-danger">.</p>
                </div>`;

    $("#textFieldsDiv").append(html);
  } else {
    console.log("Must enter a Value");
  }
}

// Test prompted value
function testPromptedValue(str) {
  return /^[a-zA-Z]+$/.test(str);
}
