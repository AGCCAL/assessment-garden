
function show_alert()
{
  var mask = document.getElementById("alert-mask");
  mask.style.display = "block";
  var a = document.getElementById("alert-alert");
  a.style.display = "block";

  var body = document.body;
  body.style.overflow = "hidden";
  body.style.height = "100%";
}

function hide_alert()
{
  var mask = document.getElementById("alert-mask");
  mask.style.display = "none";
  var a = document.getElementById("alert-alert");
  a.style.display = "none";

  var body = document.body;
  body.style.overflow = "auto";
  body.style.height = "auto";
}

