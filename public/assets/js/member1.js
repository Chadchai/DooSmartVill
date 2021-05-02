var houseid = localStorage.getItem("HouseID", houseid);
var villagename = localStorage.getItem("villagename", villagename);
var custid = localStorage.getItem("custid", custid);

document.getElementById("villagename1").innerHTML = villagename;
if (houseid !== null) {

 
     document.getElementById("post1").href = "/post";
     document.getElementById("invoice1").href = "/invoiceform1/" + houseid;
      document.getElementById("receipt1").href = "/getmyreceiptlist/" + houseid;
      document.getElementById("report1").href = "/incomeexpense1";
      document.getElementById("contact1").href = "/contact";
     
      document.getElementById("sendcomment").href = "/comment";
      document.getElementById("changepwd1").href = "/changepwd/" + houseid;
  

} else {

     
}
function logout()
     {
localStorage.clear();
window.location.href="/" + villagename + "/login";
//console.log(storeid);
     }

