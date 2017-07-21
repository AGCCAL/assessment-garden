
(function ()
{
  var form = document.getElementById("form");
  
  form.onsubmit = function (e) {
    // stop the regular form submission
    e.preventDefault();
    
    // collect the form data while iterating over the inputs
    var data = {};
    for (var i = 0, ii = form.length; i < ii; ++i) {
      var input = form[i];
      if (input.name) {
        data[input.name] = input.value;
      }
    }
    
    var output = document.getElementById("status");
    var valid = false;
    
    if (data["new"].length > 0)
    {
      if (data["new"].length < 8)
      {
        output.innerHTML = "<span class='error'>Password is too short: your password needs to be at least 8 characters long.</span>";
      }
      else
      {
        if (data["new"].length < 12)
        {
          output.innerHTML = "<span class='warning'>Weak password</span>";
        }
        
        if (data["repeat"].length)
        {
          if (data["repeat"] != data["new"])
          {
            output.innerHTML = "<span class='error'>Passwords do not match. Please enter the same password in both the boxes.</span>";
          }
          else
          {
            valid = true;
          }
        }
        else
        {
          output.innerHTML = "<span class='error'>Please repeat your password in the second box.</span>";
        }
      }
    }
    else
    {
      output.innerHTML = "Please enter your new password";
    }
    
    if (valid)
    {
      form.submit();
    }
    else
 {
 show_alert();
 }
  };
 })();


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
