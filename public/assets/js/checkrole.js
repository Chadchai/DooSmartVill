var role = localStorage.getItem("role");
//console.log("Role =" + role);
if (role == 'Committee') {
  document.getElementById("group1").style = "display:none";
  document.getElementById("group2").style = "display:none";
  document.getElementById("group3").style = "display:none";
  document.getElementById("group5").style = "display:none";
 
} 


     document.getElementById("houselist1").href = "/gethouselist/Bearer " + token1;
 document.getElementById("receiptlist1").href = "/getreceiptlist3/Bearer " + token1;
 document.getElementById("allinvoice1").href = "/getallinvoice/Bearer " + token1;
 document.getElementById("allreceipt1").href = "/getallreceiptlist1/Bearer " + token1;
 document.getElementById("invoicelist1").href = "/getinvoicelist/Bearer " + token1;
 document.getElementById("income1").href = "/income/Bearer " + token1;
 document.getElementById("expense1").href = "/expense/Bearer " + token1;
 document.getElementById("allreceipt11").href = "/getreceiptlist1/Bearer " + token1;
 document.getElementById("allexpense1").href = "/getexpenselist/Bearer " + token1;
 document.getElementById("oldcommonfee1").href = "/oldcommonfee/Bearer " + token1;
 document.getElementById("sliplist1").href = "/getsliplist/0/Bearer " + token1;
 document.loadincome1.action = "/loadincome/Bearer " + token1;
 document.getElementById("loadhouse1").href = "/loadhouseinfo/Bearer " + token1;

