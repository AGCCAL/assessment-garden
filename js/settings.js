
(function() {

  cache_settings();

  var forms = ["settings-form"];
  for (var index in forms)
  {
    var formname = forms[index];
    var form = document.getElementById(formname);
 
    form.onsubmit = function (e) {
      // stop the regular form submission
      e.preventDefault();
      
      // collect the form data while iterating over the inputs
      var data = {};
      for (var i = 0, ii = form.length; i < ii; ++i)
      {
        var input = form[i];
        data[input.name] = input.value;
      }

      var output = document.getElementById("settings-status");
      var valid = true;

      if (data["old"].length)
      {
        valid = false;
        if (data["new"].length > 0)
        {
          if (data["new"].length < 8)
          {
            output.innerHTML = "<span class='error'>Password is too short</span>";
          }
          else
          {
            if (data["new"].length < 12)
            {
              output.innerHTML = "<span class='warning'>Weak password — consider making it longer</span>";
            }

            if (data["repeat"].length)
            {
              if (data["repeat"] != data["new"])
              {
                output.innerHTML = "<span class='error'>Passwords do not match</span>";
              }
              else
              {
                valid = true;
              }
            }
            else
            {
              output.innerHTML = "Please repeat your new password";
            }
          }
        }
        else
        {
          output.innerHTML = "Please enter your new password";
        }
      }
      else if (data["new"].length)
      {
        valid = false;
        output.innerHTML = "Please enter your current password";
      }


      if (valid)
      {
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
            output.innerHTML = "&nbsp;";
            cache_settings();
            hide_settings();
          }
          else
          {
            var reason = "<span class='error'>" + json.reason + "</span>";
            output.innerHTML = reason;
          }
        };

        var json = JSON.stringify(data);
        // send the collected data as JSON
        xhr.send(json);
      }
    };
  }
 
 var settings = document.getElementById("settings");
 if (settings)
 {
   settings.href = null;
 }

 })();


function show_settings()
{
  var mask = document.getElementById("settings-mask");
  mask.style.display = "block";
  var settings = document.getElementById("settings-settings");
  settings.style.display = "block";

  var body = document.body;
  body.style.overflow = "hidden";
  body.style.height = "100%";
}

function hide_settings()
{
  var mask = document.getElementById("settings-mask");
  mask.style.display = "none";
  var settings = document.getElementById("settings-settings");
  settings.style.display = "none";

  var body = document.body;
  body.style.overflow = "auto";
  body.style.height = "auto";
}


var realname;
var email;
var ucid;

function cache_settings()
{
  realname = document.getElementById("realname").value;
  email = document.getElementById("email").value;
  ucid = document.getElementById("ucid").value;
}

function restore_settings()
{
  document.getElementById("realname").value = realname;
  document.getElementById("email").value = email;
  document.getElementById("ucid").value = ucid;
  document.getElementById("old").value = "";
  document.getElementById("new").value = "";
  document.getElementById("repeat").value = "";
  hide_settings();
}



