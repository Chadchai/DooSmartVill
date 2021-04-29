
var houseid = localStorage.getItem("HouseID", houseid);
var villagename = localStorage.getItem("villagename", villagename);
var custid = localStorage.getItem("custid", custid);
//console.log(localStorage.getItem("HouseID",houseid));



if (houseid == null) {


houseid= document.getElementById("house_id").value;
localStorage.setItem("HouseID", houseid);
villagename= document.getElementById("villagename").value; 
localStorage.setItem("villagename", villagename);
custid= document.getElementById("cust_id").value; 
localStorage.setItem("custid", custid);
} 



document.getElementById("villagename1").innerHTML = villagename;
document.getElementById("villagename2").innerHTML = villagename;
 document.getElementById("villagename3").innerHTML = "หมู่บ้าน "+ villagename;

if (houseid !== null) {


document.getElementById("post1").href = "/post";
document.getElementById("invoice1").href = "/invoiceform/" + houseid;
 document.getElementById("receipt1").href = "/getmyreceiptlist/" + houseid;
 document.getElementById("report1").href = "/incomeexpense1";
 document.getElementById("contact1").href = "/contact";
 document.getElementById("post2").href = "/post";
document.getElementById("invoice2").href = "/invoiceform/" + houseid;
 document.getElementById("receipt2").href = "/getmyreceiptlist/" + houseid;
 document.getElementById("slip").href = "/uploadslip";
 document.getElementById("report2").href = "/incomeexpense1";
 document.getElementById("contact2").href = "/contact";
 document.getElementById("sendcomment").href = "/comment";
 document.getElementById("changepwd1").href = "/changepwd/" + houseid;


}
function logout()
   {
localStorage.clear();
window.location.href="/" + villagename + "/login";
//console.log(storeid);
   }
