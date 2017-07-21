

function archive_assessment(assessment_id, name)
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

function publish_assessment(assessment_id, name)
{
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "./assessment-publish", true);
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


function duplicate_assessment(assessment_id, name)
{
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "./assessment-duplicate", true);
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


function assessment_groups(assessment_id)
{
  var url = "./assessment-groups?a=" + assessment_id;
  window.location = url;
}

function modify_assessment(assessment_id)
{
  var url = "./assessment-modify?a=" + assessment_id;
  window.location = url;
}

function export_assessment(assessment_id)
{
  var url = "./assessment-export?a=" + assessment_id;
  window.location = url;
}





function show_regular()
{
  var regular = document.getElementById("regular");
  var combined = document.getElementById("combined");
  regular.style.display="block";
  combined.style.display="none";

}

function show_combined()
{
  var regular = document.getElementById("regular");
  var combined = document.getElementById("combined");
  regular.style.display="none";
  combined.style.display="block";
  resize_subs();

}

 

function resize_subs()
{
  resize_box("all_subs");
}

function resize_groups()
{
  resize_box("all_groups");
}

function confirm_delete_dimension(id)
{
  var message = document.getElementById("alert-message");
  var code = document.getElementById("dc"+id).value;
  var button = document.getElementById("alert-confirm");
  message.innerHTML = "<b>Deleting a dimension cannot be undone. You will also lose any unsaved changes.</b><br/><br/>Are you sure you want to delete “" + code + "”?";

  button.innerHTML = "Delete";
  button.onclick = function() {do_delete_dimension(id);}

  show_alert();
}

function confirm_delete_question(id)
{
  var message = document.getElementById("alert-message");
  var code = document.getElementById("qt"+id).value;
  var button = document.getElementById("alert-confirm");
  message.innerHTML = "<b>Deleting a question cannot be undone. You will also lose any unsaved changes.</b><br/><br/>Are you sure you want to delete “" + code + "”?";

  button.innerHTML = "Delete";
  button.onclick = function() {do_delete_question(id);}

  show_alert();
}

function show_failure_reason(reason)
{
  var message = document.getElementById("alert-message");
  message.innerHTML = reason;
  show_alert();
}




function confirm_add_dimension()
{
  var message = document.getElementById("alert-message");
  var button = document.getElementById("alert-confirm");
  message.innerHTML = "Add a new dimension?<br/><br/><b>You will lose any unsaved changes.</b>";

  button.innerHTML = "Add";
  button.onclick = function() {do_add_dimension();}

  show_alert();
}


function confirm_add_question()
{
  var message = document.getElementById("alert-message");
  var button = document.getElementById("alert-confirm");
  message.innerHTML = "Add a new question?<br/><br/><b>You will lose any unsaved changes.</b>";

  button.innerHTML = "Add";
  button.onclick = function() {do_add_question();}

  show_alert();
}


function do_delete_dimension(id)
{
  hide_alert();
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "./assessment-delete-dimension", true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  var data = {};
  data["assessment_id"] = document.getElementById("a").value;
  data["dimension_id"] = id;

  var json = JSON.stringify(data);
  // send the collected data as JSON
  xhr.send(json);

  xhr.onloadend = function () {
    var response = xhr.responseText;
    var json = JSON.parse(response);
    if (json.success)
    {
      window.location.reload(true);
    }
  };
}



function do_delete_question(id)
{
  hide_alert();
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "./assessment-delete-question", true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  var data = {};
  data["assessment_id"] = document.getElementById("a").value;
  data["question_id"] = id;

  var json = JSON.stringify(data);
  xhr.send(json);

  xhr.onloadend = function () {
    var response = xhr.responseText;
    var json = JSON.parse(response);
    if (json.success)
    {
      window.location.reload(true);
    }
  };
}



function do_add_dimension()
{
  hide_alert();
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "./assessment-add-dimension", true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  var data = {};
  data["assessment_id"] = document.getElementById("a").value;

  var json = JSON.stringify(data);
  // send the collected data as JSON
  xhr.send(json);

  xhr.onloadend = function () {
    var response = xhr.responseText;
    var json = JSON.parse(response);
    if (json.success)
    {
      window.location.reload(true);
    }
  };
}


function do_add_question()
{
  hide_alert();
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "./assessment-add-question", true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  var data = {};
  data["assessment_id"] = document.getElementById("a").value;

  var json = JSON.stringify(data);
  // send the collected data as JSON
  xhr.send(json);

  xhr.onloadend = function () {
    var response = xhr.responseText;
    var json = JSON.parse(response);
    if (json.success)
    {
      window.location.reload(true);
    }
  };
}

function dimension(o)
{
  var str = o.innerHTML;
  if (str == "+")
  {
    str = "-";
    o.value = 2;
  }
  else if (str == "-")
  {
    str = "&nbsp;";
    o.value = 0;
  }
  else
  {
    str = "+";
    o.value = 1;
  }
  o.innerHTML = str;
}



function assessment_admin_on_load()
{
  var onsubmit = function (e) {
    // stop the regular form submission
    e.preventDefault();
    
    // collect the form data while iterating over the inputs
    var data = {};
    for (var i = 0, ii = this.length; i < ii; ++i) {
      var input = this[i];
      if (input.name) {
        data[input.name] = input.value;
      }
    }

    if (this.id == "combined_form")
    {
      var chosen = document.getElementById("chosen_subs");
      var chosen_subs = [];

      for (var i = 0, ii = chosen.children.length; i < ii; ++i) {
        var input = chosen.children[i];
        chosen_subs[i] = input.id;
      }

      data["chosen_subs"] = chosen_subs;
    }

    if (this.id == "assessment_group_form")
    {
      var chosen = document.getElementById("chosen_groups");
      var chosen_groups = [];

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
    
    // send the collected data as JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
      var response = xhr.responseText;
      var json = JSON.parse(response);
      if (json.success)
      {
        var output = document.getElementById("questionnaire-submit");
        output.innerHTML = json.output;
        assessment_admin_on_load();

      }
      else
      {
        var reason = json.reason;
        show_failure_reason(reason);
      }
    };
  };

  var regular_form = document.getElementById("regular_form");
  var combined_form = document.getElementById("combined_form");
  var assessment_group_form = document.getElementById("assessment_group_form");
  var answer_type_form = document.getElementById("answer_type_form");
  
  if (regular_form)
  {
    regular_form.onsubmit = onsubmit;
  }

  if (combined_form)
  {
    combined_form.onsubmit = onsubmit;
    resize_subs();
  }
  
  if (assessment_group_form)
  {
    assessment_group_form.onsubmit = onsubmit;
    resize_groups();
  }

  if (answer_type_form)
  {
    answer_type_form.onsubmit = onsubmit;
  }

}

(function() {
  assessment_admin_on_load();
})();



