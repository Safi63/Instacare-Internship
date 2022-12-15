$(document).ready(function () {
  let baseUrl = "https://jsonplaceholder.typicode.com/";
  let ajaxCount, successCount;

  $(document).ajaxSuccess(function () {
    if (successCount == ajaxCount) {
      showAlert(
        "Good Job!",
        "This function is Completed successfully",
        "success",
        "Ok"
      );
    }
  });

  $(document).ajaxError(function () {
    showAlert("Error", "Somthing wrong...Please check", "error", "Try again");
  });

  $("button").on("click", function () {
    $("body").loading({
      message: "Processing...",
    });

    ajaxCount = $.get.length;
    successCount = 0;
    $.get(`${baseUrl}posts`, function (data) {
      console.log(data);
      successCount++;
      $("body").loading("stop");
    });
    $.get(`${baseUrl}comments`, function (data) {
      console.log(data);
      successCount++;
    });
    $.get(`${baseUrl}users`, function (data) {
      console.log(data);
      successCount++;
    });
    $.get(`${baseUrl}todos`, function (data) {
      console.log(data);
      successCount++;
    });
  });
});

function showAlert(title, text, icon, btnText) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: btnText,
  });
}
