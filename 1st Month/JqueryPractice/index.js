$(document).ready(function () {
  //   $("#demo").load("test.txt");
  //   $("button").click(function () {
  //     $("#demo").load("test2.txt");
  //   });

  //   $("button").click(function () {
  //     $("#demo").load("test.txt", function (responseTxt, statusTxt, xhr) {
  //       if (statusTxt == "success")
  //         alert("External content loaded successfully!");
  //       if (statusTxt == "error")
  //         alert("Error: " + xhr.status + ": " + xhr.statusText);
  //     });
  //   });

  //   $("button").click(function () {
  //     $.get("test.txt", function (data, status) {
  //       alert("Data: " + data + "\nStatus: " + status);
  //       $("#demo").text(data);
  //     });
  //   });

  $("button").click(function () {
    $.post("test.txt", "hello hello hello");
    $("#demo").load("test.txt");
  });
});
