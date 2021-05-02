var x = screen.width;

    
var token1 = localStorage.getItem("token1");
  var empname = localStorage.getItem("empname");
  var fullname1 = localStorage.getItem("fullname");
  var role = localStorage.getItem("role");
var villagename = localStorage.getItem("villagename") ;
var villageid = localStorage.getItem("villageid") ;
document.getElementById("village_id").value = villageid;
document.getElementById("villagename").innerHTML = villagename;
document.getElementById("villagename1").innerHTML = "หมู่บ้าน "+ villagename;
// console.log("token = "+ token1);

  //Check token
   if (token1 == null || token1 =='' )  {
    
       var x = screen.width;
       var token2 = document.getElementById("token3").value;
       var empname2= document.getElementById("emp_name1").value;  
       var role2= document.getElementById("role").value; 
       villagename= document.getElementById("villagename").value; 
       villageid= document.getElementById("villageid").value; 
       var fullname = document.getElementById("fullname").value; 
       document.getElementById("village_id").value = villageid;
       if (token2 !== null && token2 !== '')  {
          
        localStorage.setItem("token1", token2);
        localStorage.setItem("empname", empname2);
        localStorage.setItem("role", role2);
        localStorage.setItem("fullname", fullname);
        localStorage.setItem("villagename", villagename);
        localStorage.setItem("villageid", villageid);
        window.location.href="/";


} else {
  window.location.href= "/"+villagename+"/loginadmin";

} 

   
  } else   {
      var base64Url = token1.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  var obj = JSON.parse(jsonPayload);
  var now = new Date();
  var expired = new Date(obj.exp );
  console.log(obj.villagename);
villagename = obj.village;
 //window.location.href="/";
  document.getElementById("username").innerHTML = "คุณ "+  obj.id;
  document.getElementById("villagename").innerHTML = obj.village;
document.getElementById("villagename1").innerHTML = "หมู่บ้าน "+ obj.village;
//   document.getElementById("editinfo").href = "/editemployee1/" + obj.id1;
  role = obj.role;
  //console.log(role);
} 
  function logout()
  {
    localStorage.removeItem('token1');
    localStorage.removeItem('empname');
    localStorage.removeItem('fullname');
    localStorage.removeItem('role');
//document.getElementById("logout").style = "display:none";
//localStorage.clear();
window.location.href= "/"+ villagename + "/loginadmin";
//console.log(storeid);\
  } 

  function convertThaiDate(date) {
    var newdate = date.split("-").reverse().join("-");
    let date1 = new Date(newdate);
    var day = new Array();
      day[0] = "วันอาทิตย์";
      day[1] = "วันจันทร์";
      day[2] = "วันอังคาร";
      day[3] = "วันพุธ";
      day[4] = "วันพฤหัสบดี";
      day[5] = "วันศุกร์";
      day[6] = "วันเสาร์";
    var month = new Array();
    month[0] = "มกราคม";
    month[1] = "กุมภาพันธ์";
    month[2] = "มีนาคม";
    month[3] = "เมษายน";
    month[4] = "พฤษภาคม";
    month[5] = "มิถุนายน";
    month[6] = "กรกฎาคม";
    month[7] = "สิงหาคม";
    month[8] = "กันยายน";
    month[9] = "ตุลาคม";
    month[10] = "พฤศจิกายน";
    month[11] = "ธันวาคม";
    return day[date1.getDay()]+ " ที่ " + date1.getDate() +" " + month[date1.getMonth()]+" "+ (Number(date1.getFullYear())+543);
     
  };
  function convertThaiDate1(date) {
        
    let date1 = new Date(date);
    var day = new Array();
      day[0] = "วันอาทิตย์";
      day[1] = "วันจันทร์";
      day[2] = "วันอังคาร";
      day[3] = "วันพุธ";
      day[4] = "วันพฤหัสบดี";
      day[5] = "วันศุกร์";
      day[6] = "วันเสาร์";
    var month = new Array();
    month[0] = "มกราคม";
    month[1] = "กุมภาพันธ์";
    month[2] = "มีนาคม";
    month[3] = "เมษายน";
    month[4] = "พฤษภาคม";
    month[5] = "มิถุนายน";
    month[6] = "กรกฎาคม";
    month[7] = "สิงหาคม";
    month[8] = "กันยายน";
    month[9] = "ตุลาคม";
    month[10] = "พฤศจิกายน";
    month[11] = "ธันวาคม";
    return day[date1.getDay()]+ " ที่ " + date1.getDate() +" " + month[date1.getMonth()]+" "+ (Number(date1.getFullYear())+543);
     
  }