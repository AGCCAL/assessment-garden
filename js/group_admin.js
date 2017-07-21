

function archive_group(assessment_id, name)
{
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "./assessment-archive", true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  
  var data={};
  data["a"] = assessment_id;
  
  xhr.send(JSON.stringify(data));
  xhr.onloadend = function () {
    var response = xhr.responseText;
    var json = JSON.parse(response);
    if (json.success)
    {
      window.location.reload(true);
    }
  };

}


function on_load()
{
  var onsubmit = function (e) {
    // stop the regular form submission
    e.preventDefault();
    
    // collect the form data while iterating over the inputs
    var data = {};
    for (var i = 0, ii = this.length; i < ii; ++i) {
      var input = this[i];
      if (input.name) 
      {
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

    if (this.id == "group_form")
    {
      var chosen_assessments = [];
      var chosen_users = [];

      var chosen = document.getElementById("chosen_users");
      for (var i = 0, ii = chosen.children.length; i < ii; ++i) {
        var input = chosen.children[i];
        chosen_users[i] = input.id;
      }
      
      chosen = document.getElementById("chosen_assessments");
      for (var i = 0, ii = chosen.children.length; i < ii; ++i) {
        var input = chosen.children[i];
        chosen_assessments[i] = input.id;
      }

      data["chosen_users"] = chosen_users;
      data["chosen_assessments"] = chosen_assessments;
    }
    else if (this.id == "group_invitation_form")
    {
      var chosen_groups = [];
      
      var chosen = document.getElementById("chosen_groups");
      for (var i = 0, ii = chosen.children.length; i < ii; ++i) {
        var input = chosen.children[i];
        chosen_groups[i] = input.id;
      }
      
      data["chosen_groups"] = chosen_groups;      
    }

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open(this.method, this.action, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    
    var json = JSON.stringify(data);
    // send the collected data as JSON
    xhr.send(json);

    xhr.onloadend = function () {
      var response = xhr.responseText;
      var json = JSON.parse(response);
      if (json.success)
      {
        var output = document.getElementById("questionnaire-submit");
        output.innerHTML = json.output;
        on_load();
      }
    };
  };

  var group_form = document.getElementById("group_form");
  var group_invitation_form = document.getElementById("group_invitation_form");

  if (group_form)
  {
    group_form.onsubmit = onsubmit;
    resize_users();
    resize_assessments();
  }
  else if (group_invitation_form)
  {
    group_invitation_form.onsubmit = onsubmit;
    resize_groups();    
  }
}


function resize_users()
{
  resize_box("all_users");
}

function resize_groups()
{
  resize_box("all_groups");
}

function resize_assessments()
{
  resize_box("all_assessments");
}





