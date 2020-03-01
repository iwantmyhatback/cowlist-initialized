import jQuery from "jquery";

window.$ = window.jQuery = jQuery;

var getCows = $.ajax({
  url: "http://localhost:3000/api/cows",
  dataType: "json",
  success: data => {
    console.log(data);
  }
});

export default getCows;
