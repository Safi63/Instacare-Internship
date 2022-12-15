$(function () {
  $("table tbody").sortable();

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
  $("#submit-btn").on("click", function (e) {
    let inputLength = $(":text").length;
    formValidation();
    if (valid && inputCount === inputLength) {
      let title, description;
      $(":text").each(function () {
        let name = $(this).attr("name");
        if (name === "title") {
          title = $(`input[name='${name}']`).val();
        } else if (name === "description") {
          description = $(`input[name='${name}']`).val();
        }
        $(this).val("");
      });
      addTableRow(title, description);
    } else {
      myFailure();
    }
    e.preventDefault();
  });
});
function deleteTR() {
  //   $("button.js-delete");
  console.log($(this));
}
function addTableRow(title, desc) {
  console.log(title);
  console.log(desc);
  let tabel = $("tbody");
  let tr = `<tr>
                   <td>${title}</td>
                   <td>${desc}</td>
                   <td>
                       <button class="shadow-none btn btn-outline-danger js-delete" onclick='deleteTR()'><i class="fa fa-trash"></i></button>
                       <button class="shadow-none btn btn-outline-secondary js-edit"><i class="fa fa-edit"></i></button>
                   </td>
               </tr>`;
  tabel.append(tr);
  myFunc();
}

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

function myFunc(data) {
  showAlert(
    "Good Job!",
    "This function is Completed successfully",
    "success",
    "Ok"
  );
}
function myFailure(err) {
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
