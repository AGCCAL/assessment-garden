
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  ev.dataTransfer.dropEffect = "move";
}

function resize_box(all_id)
{
  var all = document.getElementById(all_id);
  var body = all.children[0];
  var available = body.children[0];
  var chosen = body.children[1];
  
  if (available != null && chosen != null)
  {
    var ah = (available.children.length + 1) * 74;
    var ch = (chosen.children.length + 1) * 74;
    var h;
    
    if (ch > ah)
    {
      h = ch;
    }
    else
    {
      h = ah;
    }
    
    
    available.style.height = h + "px";
    chosen.style.height = h + "px";
    body.style.height = h + "px";
  }
}


function drop(ev, containerMatch, dataMatch, box)
{
  ev.preventDefault();
  var container = ev.target;
  var data = ev.dataTransfer.getData("text");
  
  if ((container.id.indexOf(containerMatch) >= 0) &&
      (data.indexOf(dataMatch) >= 0))
  {
    container.appendChild(document.getElementById(data));
    var el = document.getElementById(data);
    resize_box(box);
  }
}

function dropInParent(ev, containerMatch, dataMatch, box)
{
  ev.preventDefault();
  var container = ev.target.parentNode;
  var data = ev.dataTransfer.getData("text");
  
  if ((container.id.indexOf(containerMatch) >= 0) &&
      (data.indexOf(dataMatch) >= 0))
  {
    container.insertBefore(document.getElementById(data), ev.target);
    var el = document.getElementById(data);
    resize_box(box);
  }
}


function check_logged_in_users()
{
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "./logged-in-admins", true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  
  xhr.onloadend = function () 
  {
  
    if (xhr.readyState != 4) {return;}
  
    var response = xhr.responseText;
    var json = JSON.parse(response);
    var div = document.getElementById("logged_in_admins");
    
    if (json.success)
    {
      if ((json.full_admins.length == 0) &&
          (json.group_admins.length == 0))
      {
        div.style.display = "none";
      }
      else
      {
        var str;
        if (json.full_admins.length)
        {
          str = "The following admins are logged in: <ul> ";
          for (var i = 0; i < json.full_admins.length; ++i)
          {
            str += "<li>" + json.full_admins[i] + "</li>";
          }
          str += "</ul>";
          
          if (json.group_admins.length)
          {
            str += "as well as " + json.group_admins.length + " group admins.";
          }
        }
        else
        {
          str = "There are currently " + json.group_admins.length + " group admins logged in.";
        }
        
        div.innerHTML = str;
        div.style.display = "inline-block";
      }
    }
    else
    {
      div.style.display = "none";
    }
    
  };
  
  xhr.send("");  
}


(function() {
  window.setInterval("check_logged_in_users()", 60000);
  check_logged_in_users();
 })();


