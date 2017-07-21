function select(assessment,question, min, max, answer, attempt)
{
  for (a = min; a <=max; a++)
  {
    var id = "a"+assessment+"_"+question+"_"+a;
    var e = document.getElementById(id);
    e.className = "answer-option";
    if (a == answer)
    {
      e.className += " selected";
    }
  }
  
  for (a = min; a <=max; a++)
  {
    var id = "at"+assessment+"_"+question+"_"+a;
    var e = document.getElementById(id);
    e.className = "answer-option-text";
    if (a == answer)
    {
      e.className += " selected";
    }
  }
  
  var id = "a"+assessment+"_"+question;
  var e = document.getElementById(id);
  e.value = answer;

  var div = e.parentElement.parentElement;
  div.style.backgroundColor = "#fbf9f7";


  var magic = document.getElementById("magic");
  var data = {};


  data["magic"] = magic.value;
  data["assessment"] = assessment;
  data["question"] = question;
  data["answer"] = answer;
  
  var json = JSON.stringify(data);
  var xhr = new XMLHttpRequest();
  xhr.open(form.method, "assessment-answer", true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.onloadend = function ()
  {
    var response = xhr.responseText;
    var json = JSON.parse(response);
    var success = json.success;
    if ((!success) && (attempt < 3))
    {
      select(assessment, question, min, max, answer, attempt+1);
    }
  };
  xhr.send(json);
}

function over(assessment,question, min, max, answer)
{
  {
    var id = "a"+assessment+"_"+question+"_"+answer;
    var e = document.getElementById(id);
    var className = e.className;
    if (className.search("selected") < 0)
    {
      e.className = "answer-option over";
    }
  }
  {
    var id = "at"+assessment+"_"+question+"_"+answer;
    var e = document.getElementById(id);
    var className = e.className;
    if (className.search("selected") < 0)
    {
      e.className = "answer-option-text over";
    }
  }
}

function out(assessment,question, min, max, answer)
{
  {
    var id = "a"+assessment+"_"+question+"_"+answer;
    var e = document.getElementById(id);
    var className = e.className;
    if (className.search("selected") < 0)
    {
      e.className = "answer-option";
    }
  }
  {
    var id = "at"+assessment+"_"+question+"_"+answer;
    var e = document.getElementById(id);
    var className = e.className;
    if (className.search("selected") < 0)
    {
      e.className = "answer-option-text";
    }
  }
}



function change(assessment,question,attempt)
{  
  var id = "a"+assessment+"_"+question;
  var e = document.getElementById(id);
  var answer = e.value;

  var div = e.parentElement.parentElement;
  div.style.backgroundColor = "#fbf9f7";


  var magic = document.getElementById("magic");
  var data = {};


  data["magic"] = magic.value;
  data["assessment"] = assessment;
  data["question"] = question;
  data["answer"] = answer;
  
  var json = JSON.stringify(data);
  var xhr = new XMLHttpRequest();
  xhr.open(form.method, "assessment-answer", true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.onloadend = function ()
  {
    var response = xhr.responseText;
    var json = JSON.parse(response);
    var success = json.success;
    if ((!success) && (attempt < 3))
    {
      change(assessment, question, attempt+1);
    }
  };
  xhr.send(json);
}


function change_checkbox(assessment,question, min, max, answer, attempt)
{
  var value = "";
  for (a = min; a <=max; a++)
  {
    var id = "a"+assessment+"_"+question+"_"+a;
    var e = document.getElementById(id);
    if (e.checked)
    {
      value = "X" + value;
    }
    else
    {
      value = "O" + value;
    }
  }
    
  var id = "a"+assessment+"_"+question;
  var e = document.getElementById(id);
  e.value = value;

  var div = e.parentElement.parentElement;
  div.style.backgroundColor = "#fbf9f7";


  var magic = document.getElementById("magic");
  var data = {};


  data["magic"] = magic.value;
  data["assessment"] = assessment;
  data["question"] = question;
  data["answer"] = value;
  
  var json = JSON.stringify(data);
  var xhr = new XMLHttpRequest();
  xhr.open(form.method, "assessment-answer", true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.onloadend = function ()
  {
    var response = xhr.responseText;
    var json = JSON.parse(response);
    var success = json.success;
    if ((!success) && (attempt < 3))
    {
      change_checkbox(assessment, question, min, max, answer, attempt+1);
    }
  };
  xhr.send(json);
}










function email_assessment(instance_id, name)
{
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "./assessment-email", true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  var data={};
  data["instance_id"] = instance_id;

  xhr.send(JSON.stringify(data));
  xhr.onloadend = function () {
    var response = xhr.responseText;
    var json = JSON.parse(response);
    var output = document.getElementById("status");
    var reason = json.output;
    output.innerHTML = reason;
    show_alert();
  };

}



function hide_submit()
{
  var button = document.getElementById("questionnaire-submit");
  button.style.display="none";
}


function scroll_to(elem, pos)
{
  var y = elem.scrollTop;
  y += Math.round((pos - y) * 0.3);

  if (Math.abs(y-pos) <= 2)
  {
    elem.scrollTop = pos;
    return;
  }
  elem.scrollTop = y;
  setTimeout(scroll_to, 40, elem, pos);
}

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
    
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action, true);
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
        on_load();
      }
      else
      {
        if (json.reason == "missing answers.")
        {
          var missing_answers = json.missing_answers;
          for (var i = 0; i < missing_answers.length; i++)
          {
            var answer = missing_answers[i];
            var anchor = "a" + answer["assessment_id"] + "_" + answer["question_id"];
            var div = document.getElementById(anchor).parentElement.parentElement;
            div.style.backgroundColor = "#fcc";
            if (i == 0)
            {
              var top = div.offsetTop;
              scroll_to(document.body,top);
            }
          }
        }
      }
    };
  };
  rewrite_external_links();
}

function rewrite_external_links()
{
  var links = document.links;

  for (var i = 0, linksLength = links.length; i < linksLength; i++) 
  {
    if (links[i].hostname != window.location.hostname) 
    {
       links[i].target = '_blank';
    } 
  }
}
