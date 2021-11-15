var houseid = localStorage.getItem("HouseID", houseid);
var villagename = localStorage.getItem("villagename", villagename);
var custid = localStorage.getItem("custid", custid);
var villageid = localStorage.getItem("villageid");
var mytoken = localStorage.getItem("mytoken");
document.getElementById("villagename1").innerHTML = villagename;
if (houseid !== null) {

     if (mytoken == null ){
          logout();
       }
     document.getElementById("post1").href = "/post";
     document.getElementById("invoice1").href = "/invoiceform1/" + houseid + "/Bearer "+ mytoken;
      document.getElementById("receipt1").href = "/getmyreceiptlist/" + houseid + "/Bearer "+ mytoken;
      document.getElementById("report1").href = "/incomeexpense1";
      document.getElementById("contact1").href = "/contact";
     
      document.getElementById("sendcomment").href = "/comment";
      document.getElementById("changepwd1").href = "/changepwd/" + houseid;
  

} else {

     logout();
}
function logout()
     {
localStorage.clear();
window.location.href="/" + villagename + "/login";
//console.log(storeid);
     }

     $(document).ready(function() {
          $(".notification-drop .item").on('click',function() {
            $(this).find('ul').toggle();
          });
        });