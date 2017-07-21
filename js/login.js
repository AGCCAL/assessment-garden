
function munge_form(formname)
{
  var form = document.getElementById(formname);

  form.onsubmit = function (e) {
    // stop the regular form submission
    e.preventDefault();

    // collect the form data while iterating over the inputs
    var data = {};
    for (var i = 0, ii = form.length; i < ii; ++i) {
      var input = form[i];
      if (input.name) {
        if (input.type == "checkbox")
        {
          data[input.name] = input.checked;
        }
        else
        {
          data[input.name] = input.value;
        }
      }
    }

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    xhr.onloadend = function () {

      if (xhr.readyState != 4) {return;}

      var response = xhr.responseText;
      var json = JSON.parse(response);
      if (json.success)
      {
        document.location = json.redirect;
      }
      else
      {
        var output = document.getElementById("status");
        var reason = json.reason;
        output.innerHTML = reason;
        show_alert();
      }
    };

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));

  };

}


(function()
{
  var forms = ["login-form", "signup-form"];

  for (var index in forms)
  {
    var formname = forms[index];
    munge_form(formname);
  }
  
  var forgot = document.getElementById("forgot");
  if (forgot)
  {
    forgot.href = null;
  }
 })();

function show_signup()
{
  var hide = document.getElementById("login-login");
  var show = document.getElementById("login-signup");
  hide.style.display = "none";
  show.style.display = "block";
}

function show_login()
{
  var show = document.getElementById("login-login");
  var hide = document.getElementById("login-signup");
  hide.style.display = "none";
  show.style.display = "block";
}

function forgot_password()
{
  var input = document.getElementById("username");
  var user = input.value;
  var loc = "./forgot?user="+user;
  document.location = loc;
}

