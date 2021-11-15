var mytoken = localStorage.getItem("mytoken");
var houseid = localStorage.getItem("HouseID");
var villagename = localStorage.getItem("villagename", villagename);
var custid = localStorage.getItem("custid", custid);
//console.log(localStorage.getItem("HouseID",houseid));
var villageid = localStorage.getItem("villageid");


if (houseid == null) {

  mytoken= document.getElementById("mytoken").value;
   localStorage.setItem("mytoken", mytoken);
houseid= document.getElementById("house_id").value;
localStorage.setItem("HouseID", houseid);
villagename= document.getElementById("villagename").value; 
localStorage.setItem("villagename", villagename);
custid= document.getElementById("cust_id").value; 
localStorage.setItem("custid", custid);
villageid= document.getElementById("villageid2").value; 
localStorage.setItem("villageid", villageid);
window.location.href="/member";

} 



document.getElementById("villagename1").innerHTML = villagename;
document.getElementById("villagename2").innerHTML = villagename;
 document.getElementById("villagename3").innerHTML = "หมู่บ้าน "+ villagename;

if (houseid !== null) {

if (mytoken == null ){
   logout();
}
document.getElementById("post1").href = "/post";
document.getElementById("invoice1").href = "/invoiceform1/" + houseid + "/Bearer "+ mytoken;
 document.getElementById("receipt1").href = "/getmyreceiptlist/" + houseid + "/Bearer "+ mytoken;
 document.getElementById("report1").href = "/incomeexpense1";
 document.getElementById("contact1").href = "/contact";
 document.getElementById("post2").href = "/post";
document.getElementById("invoice2").href = "/invoiceform1/" + houseid + "/Bearer "+ mytoken;
 document.getElementById("receipt2").href = "/getmyreceiptlist/" + houseid + "/Bearer "+ mytoken;
 document.getElementById("slip").href = "/uploadslip";
 document.getElementById("report2").href = "/incomeexpense1";
 document.getElementById("contact2").href = "/contact";
 document.getElementById("comment2").href = "/comment";
 document.getElementById("sendcomment").href = "/comment";
 document.getElementById("commentstatus").href = "/getmycommentlist/"+ custid;
 document.getElementById("changepwd1").href = "/changepwd/" + houseid;

}
function logout()
   {
      localStorage.removeItem('HouseID');
      localStorage.removeItem('custid');
      localStorage.removeItem('mytoken');

window.location.href="/" + villagename + "/login";
//console.log(storeid);
   }

   $(document).ready(function() {
      $(".notification-drop .item").on('click',function() {
        $(this).find('ul').toggle();
      });
    });
