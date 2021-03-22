
window.scrollTo(0,1);
  //document.body.requestFullscreen();

var houseid = localStorage.getItem("HouseID", houseid);
//console.log(localStorage.getItem("HouseID",houseid));
if (houseid == null) {
 
 
 houseid= document.getElementById("house_id").value;
 localStorage.setItem("HouseID", houseid);
} 

if (houseid !== null) {

 
 document.getElementById("post1").href = "/post";
 document.getElementById("invoice1").href = "/invoiceform/" + houseid;
   document.getElementById("receipt1").href = "/getmyreceiptlist/" + houseid;
   document.getElementById("report1").href = "/incomeexpense1";
   document.getElementById("contact1").href = "/contact";

   document.getElementById("changepwd1").href = "/changepwd/" + houseid;
  

}
function logout()
     {
localStorage.clear();
window.location.href="/login";
//console.log(storeid);
     }

