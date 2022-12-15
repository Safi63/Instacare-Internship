$(document).ready(function () {
  let baseUrl = "https://jsonplaceholder.typicode.com/";

  // In your Javascript (external .js resource or <script> tag)

  $(".js-example-basic-single").select2({
    multiple: true,
  });

  $("button").on("click", function () {
    $("body").loading({
      message: "Processing...",
    });
    $.when(
      $.get(`${baseUrl}posts`),
      $.get(`${baseUrl}comments`),
      $.get(`${baseUrl}users`),
      $.get(`${baseUrl}todos`)
    ).then(myFunc, myFailure);
  });
});

function myFunc(data) {
  $("body").loading("stop");
  showAlert(
    "Good Job!",
    "This function is Completed successfully",
    "success",
    "Ok"
  );
  console.log(data);
}
function myFailure(err) {
  showAlert("Error", "Somthing wrong...Please check", "error", "Try again");
  console.error(err);
}
function showAlert(title, text, icon, btnText) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: btnText,
  });
}
