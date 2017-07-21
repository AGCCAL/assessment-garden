(function()
{
 var x = document.getElementsByClassName("date");
 var i;
 for (i = 0; i < x.length; i++)
 {
   var e = x[i];
   var dateText = e.innerHTML;
   var date = new Date(dateText);
   var now = Date.now();
   if ((now - date) > (86400*1000))
   {
     dateText = date.toLocaleDateString();
   }
   else
   {
     dateText = date.toLocaleTimeString();
   }

   e.innerHTML = dateText;
 }

})();