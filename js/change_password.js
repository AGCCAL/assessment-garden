
function on_load()
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
    
    if (data["old"].length)
    {
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
            output.innerHTML = "<span class='warning'>Weak password</span>";
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
        }
      }
      else
      {
        output.innerHTML = "Please enter your new password";
      }
    }
    else
    {
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
          var output = document.getElementById("status");
          output.innerHTML = "Your password was changed successfully";
        }
        else
        {
          var output = document.getElementById("status");
          var reason = "<span class='error'>" + json.reason + "</span>";
          output.innerHTML = reason;
        }
      };
      
      // send the collected data as JSON
      xhr.send(JSON.stringify(data));
    }
  };
}

