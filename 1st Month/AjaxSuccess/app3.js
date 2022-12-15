$(document).ready(function () {
  let baseUrl = "https://jsonplaceholder.typicode.com/";

  // In your Javascript (external .js resource or <script> tag)

  // $(".js-example-basic-single").select2({
  //   multiple: true,
  //   theme: "classic",
  // });
  $(".js-example-basic-single").select2({
    multiple: true,
    theme: "classic",
    // maximumSelectionLength: 2,
    placeholder: "This is my placeholder",
    // allowClear: true,
    tags: true,
  });

  $("button").on("click", function () {
    $("option:selected").each(function (data) {
      console.log($(this).val());
    });
  });
});
