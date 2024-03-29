const fs = require('fs');
var express = require('express');
//const Blob = require('blob');
const THBText = require('thai-baht-text') ;// for ES5
const http = require('http');
const readline = require('readline');
 const jwt = require("jwt-simple");
//const jwt = require('jsonwebtoken');
//ใช้ในการ decode jwt ออกมา
const mysql = require('mysql');
//สร้าง Strategy
const bodyParser = require("body-parser");

// function dbconnect(villagename){
//   console.log(villagename);
//   var dbhost = "",dbuser ="",dbpassword="",dbdatabase ="";
//   if (villagename == "idesign2020" || villagename == "Idesign2020" ) {
      
//     dbhost= 'ijj1btjwrd3b7932.cbetxkdyhwsb.us-east-1.rds.amazonaws.com';
//       dbuser= 'ghwr2m49z94xqrt3';
//       dbpassword = 'qp0lr9wyokjzsg7k';
//       dbdatabase = 'me0wpspgmbwzlkyn';
 
// } else {
//   dbhost= 'j8oay8teq9xaycnm.cbetxkdyhwsb.us-east-1.rds.amazonaws.com';
//   dbuser= 'hxhlwc9l5dz0ivcf';
//   dbpassword = 'hc5epzesc5j5vlqq';
//   dbdatabase = 'w15nea6r2gb91x7i';
 
// }



// console.log("db host =" + dbhost);
// if ( dbhost !== ""){
// db = mysql.createConnection ({
//   host: dbhost,
//     user: dbuser,
//     password: dbpassword,
//     database: dbdatabase
// });
// db.connect((err) => {
//   if (err) {
//       throw err;
//   }
//   //console.log('Connected to database to doSmartvill village');
// });

// global.db = db;
// }
// }
//var fs = require('fs');
//var gm = require('gm');
var cloudinary = require('cloudinary');
const Json2csvParser = require("json2csv").Parser;
//const querystring = require('querystring');  
//var pendingRFQ;
cloudinary.config({ 
    cloud_name: 'hiuscvdu2', 
    api_key: '134241229815455', 
    api_secret: '8otzx5zTxjtO-gi7ipJe7FowaoY' 
  });
module.exports = {
 
getdbconnect: function(req, res){
    var villagename = req.params.village_name;
//console.log(villagename);
  //  if (global.db == null) {
  //    dbconnect(villagename);
  //  } 
 
},

  index: function(req, res){
       // let token = req.params.token;
             
        //custid1= result[0].emp_id;
    res.render('mainpage.ejs', {
      title: "iDesign2020"
      ,message: '',count1:'',role1:'',adminname:'',empname:'',token1:'',villagename:'',fullname:'',villageid:'',
    

  });
  },
memberpage: function(req, res){
          
    res.render('member.ejs', {
      title: "Main Page"
      ,message: '',houseno:'',villagename:'',custid:'',villageid:'',mytoken:'',
  });
  },
  contact: function(req, res){
    let getcontactlist = "SELECT * FROM contact_info"
    db.query(getcontactlist, (err, result) => {
      if (err) {
          return res.status(500).send(err);
      } else {
        //console.log(result);
       res.render('contact.ejs', {
           title: "List of Contact"
           ,message: '', contactlist:result,
       });
  
      }
  
   });
  },
  contact1: function(req, res){
          
    res.render('contact1.ejs', {
      title: "Contact Admin Page"
      ,message: ''
  });
  },
  login: function(req, res){
    let villagename = req.params.village_name;
    res.render('login.ejs', {
      title: "Login Page"
      ,message: '',villagename:villagename,
  });
  },
  loginadmin: function(req, res){
    
    let villagename = req.params.village_name;
    
    //dbconnect(villagename);
    
    res.render('loginadmin.ejs', {
      title: "Admin Login Page"
      ,message: '',villagename:villagename,
  });
  },
  news: function(req, res){
    let getnewslist = "SELECT *,DATE_FORMAT(post_date, '%d-%m-%Y') AS post_date,DATE_FORMAT(post_date, '%Y-%m-%d') AS post_date1,DATE_FORMAT(expired_date, '%Y-%m-%d') AS expired_date1 FROM news_info ORDER BY news_id DESC"
    db.query(getnewslist, (err, result) => {
      if (err) {
          return res.status(500).send(err);
      } else {
        //console.log(result);
  
      
       res.render('news.ejs', {
           title: "List of News"
           ,message: '', newslist:result,
       });
  
      }
  
   });

          
 
  },


  invoice: function(req, res){
          
    res.render('invoice.ejs', {
      title: "Main Page"
      ,message: ''
  });
  },
  receipt: function(req, res){
          
    res.render('receipt.ejs', {
      title: "Receipt"
      ,message: ''
  });
  },
  uploadslip: function(req, res){
          
    res.render('uploadslip.ejs', {
      title: "Upload Slip"
      ,message: ''
  });
  },
 changepwd: function(req, res){
  let houseid = req.params.house_no;

    res.render('changepassword.ejs', {
      title: "Change Password"
      ,message: '',houseno:houseid,
  });
  },
  expense: function(req, res){
          
    res.render('expense.ejs', {
      title: "Expense"
      ,message: ''
  });
  },
  income: function(req, res){
          
    res.render('income.ejs', {
      title: "Income"
      ,message: ''
  });
  },
  report: function(req, res){
          
    res.render('report.ejs', {
      title: "Report"
      ,message: ''
  });
  },
  oldcommonfee: function(req, res){
          
    res.render('oldcommonfee.ejs', {
      title: "Pay old common fee"
      ,message: '',houseno:'',ownername:'',balance:''
  });
  },
  issuereceipt: function(req, res){
          
    res.render('issuereceipt.ejs', {
      title: "Issue Receipt"
      ,message: '',ownername:'ไม่พบบ้านเลขที่นี้',houseno:'',invoicelist:'',balance:'',remain:'',lastremain:''
  });
  },
  createinvoice1month: function(req, res){
var villageid = req.body.village_id;
    var today = new Date();
    var c_date = today.getDate();
    var c_month = today.getMonth()+1;
    var c_year = today.getFullYear();
    var c_year1 = today.getFullYear()+543;
    var month = new Array();
    var token = req.body.token;
    
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
  
    var thismonth = month[today.getMonth()] + "-" + c_year1.toString() ;

    let getinvoicelist = "SELECT period_id,period_mo,status  FROM `invoice_period` WHERE MONTH(period_mo) ='" + c_month + "' AND YEAR(period_mo) ='"+ c_year +"'";
    //console.log(getinvoicelist);
  
  db.query(getinvoicelist, (err, result) => {
    if (err) {
        return res.status(500).send(err);
    } 
    else {
        var periodid = result[0].period_id;
        let gethouselist = "SELECT * FROM `house_info` WHERE invoice_period < " + result[0].period_id + " OR invoice_period IS NULL AND village_id =" + villageid ;
        //console.log(gethouselist);
        db.query(gethouselist, (err, result1) => {
            if (err) {
                return res.status(500).send(err);
            } 
            else {
                if (result1.length >0) {
                    var i;
                    var invoiceno ;
                    for (i=0;i<result1.length;i++) {
                        invoiceno = c_year.toString() + c_month.toString() + c_date.toString() + i.toString();
                        //console.log(invoiceno);
                        let createinvoice= "INSERT INTO `invoice_info` (`village_id`,`invoice_no`, house_no,invoice_type,invoice_period,amount,invoice_month) VALUES ("+ villageid + ",'" + invoiceno +"-1', '" + result1[i].house_no + "' , 'ค่าส่วนกลาง', '"+ periodid + "',"+ result1[i].common_fee + ",'"+ thismonth + "' )";
                        //console.log(createinvoice);
                       let updateinvoiceperiod = "UPDATE `house_info` SET `invoice_period`= "+ periodid + " WHERE  `house_no`='"+ result1[i].house_no + "' AND village_id ="+ villageid;
                      //result1[i].parking_qty;
                      if (result1[i].parking_qty >0 ){
                        let createparkinvoice= "INSERT INTO `invoice_info` (`village_id`,`invoice_no`, house_no,invoice_type,invoice_period,amount,invoice_month) VALUES ("+ villageid + ",'" + invoiceno +"-2', '" + result1[i].house_no + "' , 'ค่าจอดรถ', '"+ periodid + "',"+ result1[i].parking_fee + ",'"+ thismonth +  "' )";
                        //console.log(createinvoice);
                        db.query(createparkinvoice, (err, result4) => {
                            if (err) {
                                return res.status(500).send(err);
                            } 
                        } );
                    }
                       db.query(createinvoice, (err, result3) => {
                        if (err) {
                            return res.status(500).send(err);
                        } 
                        else {
                            
                            db.query(updateinvoiceperiod, (err, result2) => {
                                if (err) {
                                    return res.status(500).send(err);
                                } 
                        } );
                        }
                      
                    });

                    }
                    
                } else {
                    res.redirect('/getinvoicelist/Bearer ' + token);

                }
            }
        });
    }
});
   
  },

  gethouselist: function(req, res){

    let gethouselist = "SELECT * FROM house_info"
    db.query(gethouselist, (err, result) => {
      if (err) {
          return res.status(500).send(err);
      } else {
        //console.log(result);
       res.render('houselist.ejs', {
           title: "Main Page"
           ,message: '',houselist:result,
       });

      }

   });
  },
  gethouseinfo: function(req, res){
    let houseid = req.params.house_no;
    let groupid = req.params.groupid;
    let getinfo = "SELECT * FROM house_info WHERE house_no = '"  + "104/" + houseid +"'"
    //console.log(getinfo);
    db.query(getinfo, (err, result) => {
      if (err) {
          return res.status(500).send(err);
      } else {
        //console.log(result);
       res.render('edithouse.ejs', {
           title: "Main Page"
           ,message: '',house_info:result[0]
       });

      }

   });
  },
  updatehouseinfo: function(req, res){
    
    let houseid = req.body.house_no;
    let ownername = req.body.owner_name;
    let laneno = req.body.lane_no;
    let commonfee = Number(req.body.common_fee);
    let parkingqty = Number(req.body.parking_qty);
    let parkingfee = Number(req.body.parking_fee);
    let lockno = req.body.lock_no;
    let remark = req.body.remark;
    let token = req.body.token;
    
    let updateinfo = "UPDATE house_info SET lane_no ='" + laneno + "', owner_name ='" +ownername +"', common_fee = "+ commonfee + " , parking_qty = "+ parkingqty + ", parking_fee = " + parkingfee + ", lock_no = '" + lockno + "', remark = '" + remark +"' WHERE house_no = '" + houseid +"'"

    //console.log(updateinfo);
    db.query(updateinfo, (err, result) => {
      if (err) {
          return res.status(500).send(err);
      } else {
        //console.log(result);
        res.redirect('/gethouselist/Bearer ' + token);

      }

   });
  },
  getinvoicelist: function(req, res){
    
    let getinvoicelist = "SELECT invoice_info.house_no,invoice_info.id,ROUND(SUM(invoice_info.amount),2) AS t_amount,invoice_info.invoice_month AS remark,invoice_info.payment_type,house_info.owner_name " +  
    "FROM `invoice_info` " +
    "LEFT JOIN `house_info` " + 
    "ON invoice_info.house_no = house_info.house_no " +
    "WHERE payment_type = '' OR payment_type IS NULL " +
    "GROUP BY house_no" +
  " ORDER BY invoice_info.id DESC";
    //console.log(getinvoicelist);
        var today = new Date();
        //var c_month = today.getMonth()+1;
        var c_year = today.getFullYear()+543;
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
      
        var n = month[today.getMonth()] + "-" + c_year.toString() ;
     db.query(getinvoicelist, (err, result) => {
       if (err) {
           return res.status(500).send(err);
       } else {
         //console.log(result);
        res.render('invoicelist.ejs', {
            title: "Main Page"
            ,message: 'ออกใบแจ้งหนี้เดือนนี้ไปแล้ว ออกซ้ำ',invoicelist:result, monthyear:n
        });

       }

    });
  },
  getreceiptlist: function(req, res){
    
    let getreceiptlist = "SELECT invoice_info.house_no,invoice_info.id,FORMAT(SUM(invoice_info.actual_pay),-2) AS t_amount,MAX(invoice_info.invoice_month) AS remark,invoice_info.payment_type AS payment_type,invoice_info.receipt_no,house_info.owner_name,DATE_FORMAT(invoice_info.receipt_date, '%d-%m-%Y') AS receipt_date,invoice_info.lastmonth,SUM(invoice_info.actual_pay) as t_amount1,DATE_FORMAT(CURDATE(), '%d-%m-%Y') AS today " +  
    "FROM `invoice_info` " +
    "LEFT JOIN `house_info` " + 
    "ON invoice_info.house_no = house_info.house_no " +
    "WHERE payment_type <> '' AND (invoice_type = 'ค่าส่วนกลาง' || invoice_type ='ค่าจอดรถ') AND receipt_date > DATE_ADD(NOW(), INTERVAL -30 DAY) " +
    "GROUP BY receipt_no " + 
    "ORDER BY receipt_no DESC "
    ;  
   //console.log(getreceiptlist);
        var today = new Date();
        //var c_month = today.getMonth()+1;
        var c_year = today.getFullYear()+543;
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
        var n = month[today.getMonth()] + "-" + c_year.toString() ;
     db.query(getreceiptlist, (err, result) => {
       if (err) {
           return res.status(500).send(err);
       } else {
        // console.log(result);
        res.render('receiptlist.ejs', {
            title: "Main Page"
            ,message: 'ออกใบแจ้งหนี้เดือนนี้ไปแล้ว ออกซ้ำ',receiptlist:result, monthyear:n
        });
       }
    });
  },
  getallreceiptlist: function(req, res){
    
    let getreceiptlist = "SELECT invoice_info.house_no,invoice_info.id,FORMAT(SUM(invoice_info.actual_pay),-2) AS t_amount,MAX(invoice_info.invoice_month) AS remark,invoice_info.payment_type,invoice_info.receipt_no,house_info.owner_name,invoice_info.receipt_date,DATE_FORMAT(invoice_info.receipt_date, '%d-%m-%Y') AS receipt_date1 " +  
    "FROM `invoice_info` " +
    "LEFT JOIN `house_info` " + 
    "ON invoice_info.house_no = house_info.house_no " +
    "WHERE payment_type <> '' AND (invoice_type = 'ค่าส่วนกลาง' || invoice_type ='ค่าจอดรถ')" +
    "GROUP BY receipt_no " + 
    "ORDER BY receipt_date DESC "
    ;  
   //console.log(getreceiptlist);
        var today = new Date();
        //var c_month = today.getMonth()+1;
        var c_year = today.getFullYear()+543;
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
        var n = month[today.getMonth()] + "-" + c_year.toString() ;
     db.query(getreceiptlist, (err, result) => {
       if (err) {
           return res.status(500).send(err);
       } else {
        // console.log(result);
        res.render('allreceiptlist.ejs', {
            title: "Main Page"
            ,message: 'ออกใบแจ้งหนี้เดือนนี้ไปแล้ว ออกซ้ำ',receiptlist:result, monthyear:n
        });
       }
    });
  },
  getreceiptlist1: function(req, res){
    
    let getreceiptlist = "SELECT invoice_info.house_no,invoice_info.id,FORMAT(SUM(invoice_info.actual_pay),-2) AS t_amount,MAX(invoice_info.invoice_month) AS remark,invoice_info.remark AS payer,invoice_info.payment_type,invoice_info.receipt_no,house_info.owner_name,DATE_FORMAT(invoice_info.receipt_date, '%d-%m-%Y') AS receipt_date " +  
    "FROM `invoice_info` " +
    "LEFT JOIN `house_info` " + 
    "ON invoice_info.house_no = house_info.house_no " +
    "WHERE payment_type <> '' AND (invoice_type <> 'ค่าส่วนกลาง' AND invoice_type <>'ค่าจอดรถ') " +
    "GROUP BY receipt_no " + 
    "ORDER BY receipt_no DESC LIMIT 250"
    ;  
  // console.log(getreceiptlist);
        var today = new Date();
        //var c_month = today.getMonth()+1;
        var c_year = today.getFullYear()+543;
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
        var n = month[today.getMonth()] + "-" + c_year.toString() ;
     db.query(getreceiptlist, (err, result) => {
       if (err) {
           return res.status(500).send(err);
       } else {
        // console.log(result);
        res.render('receiptlist1.ejs', {
            title: "Main Page"
            ,message: 'ออกใบแจ้งหนี้เดือนนี้ไปแล้ว ออกซ้ำ',receiptlist:result, monthyear:n
        });
       }
    });
  },
  getmyreceiptlist: function(req, res){
    let houseid = req.params.house_no;
    let mytoken = req.params.mytoken;
    let getreceiptlist = "SELECT invoice_info.house_no,invoice_info.id,SUM(invoice_info.amount) AS t_amount,MAX(invoice_info.invoice_month) AS remark,invoice_info.payment_type,invoice_info.receipt_no,invoice_info.invoice_type,house_info.owner_name " +  
    "FROM `invoice_info`" +
    "LEFT JOIN `house_info` " + 
    "ON invoice_info.house_no = house_info.house_no " +
    "WHERE invoice_info.house_no = '104/" + houseid + "' AND payment_type <> '' AND (invoice_type = 'ค่าส่วนกลาง' || invoice_type ='ค่าจอดรถ' || invoice_type ='รายได้อื่นๆ' )  " +
    "GROUP BY receipt_no ORDER BY invoice_info.id DESC" ;  
   //console.log(getreceiptlist);
        var today = new Date();
        //var c_month = today.getMonth()+1;
        var c_year = today.getFullYear()+543;
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
        var n = month[today.getMonth()] + "-" + c_year.toString() ;
     db.query(getreceiptlist, (err, result) => {
       if (err) {
           return res.status(500).send(err);
       } else {
         //console.log(result);
        res.render('myreceiptlist.ejs', {
            title: "Main Page"
            ,message: 'ออกใบแจ้งหนี้เดือนนี้ไปแล้ว ออกซ้ำ',receiptlist:result, monthyear:n,mytoken:mytoken,
        });

       }

    });
  },
  advanceinvoice: function(req, res){

            
    res.render('advanceinvoice.ejs', {
      title: "Issue Invoice in Advance"
      ,message: '',ownername:'ไม่พบบ้านเลขที่นี้',houseno:'',carqty:0 ,periodid:'',commonfee:'',parkfee:'',houseid:'',villageid:'',
  });
  },
getownername: function(req, res){
    let houseid = req.params.house_no;
    let groupid = req.params.groupid;
    let villageid = req.params.village_id;
    //console.log(groupid);
    let getownername1 = "SELECT *  FROM `house_info` WHERE house_no = '" + "104/" + houseid + "' AND village_id =" + villageid;
  //console.log(getownername1);
    db.query(getownername1, (err, result) => {
     // console.log(result);
        if (err || result == "") {
            res.render('advanceinvoice.ejs', {
                title: "Issue Invoice in Advance"
                ,message: '',ownername:'ไม่พบบ้านเลขที่นี้',carqty:0,houseno: '104/'+ houseid,periodid:'',commonfee:'',parkfee:'',houseid:'',
              })
        } else {
            
    res.render('advanceinvoice.ejs', {
      title: "Issue Invoice in Advance"
      ,message: '',ownername:result[0].owner_name,carqty:result[0].parking_qty,houseno: '104/' + houseid,periodid:result[0].invoice_period,commonfee:result[0].common_fee,parkfee:result[0].parking_fee,houseid:result[0].id,
    })
}
  });
  },
  getrcpowner: function(req, res){
    let houseid = req.params.house_no;
    let groupid = req.params.groupid;
    //console.log(houseid);
    let getownername1 = "SELECT *  FROM `house_info` WHERE house_no = '104"+ "/" + houseid + "'";
    let getpendinginvoice =  "SELECT * FROM `invoice_info` WHERE house_no ='104" + "/" + houseid + "' AND (payment_type = '' OR payment_type IS NULL) ";
    console.log(getownername1);
    db.query(getownername1, (err, result) => {
     // console.log(result);
        if (err || result == "") {
            res.render('issuereceipt.ejs', {
                title: "Issue Invoice in Advance"
                ,message: '',ownername:'ไม่พบบ้านเลขที่นี้',houseno: '104/'+ houseid,invoicelist:'',periodid:'',balance:0
              })
        } else {
            db.query(getpendinginvoice, (err, result1) => {
                if (err || result1 == "") {
                 // console.log(result1);
                  res.render('issuereceipt.ejs', {
                    title: "Issue Invoice in Advance"
                    ,message: '',ownername:result[0].owner_name,houseno:'104/'+ houseid,invoicelist:'',periodid:'',balance:result[0].remain
                  })
                } else {
            
    res.render('issuereceipt.ejs', {
      title: "Issue Invoice in Advance"
      ,message: '',ownername:result[0].owner_name,balance:result[0].remain,houseno:'104/'+ houseid,invoicelist: result1,periodid:result[0].invoice_period
    })
}
})
}
  });
  },
  getrcpowner1: function(req, res){
    let houseid = req.params.house_no;
    //console.log(houseid);
    let getownername1 = "SELECT *  FROM `house_info` WHERE house_no = '104/" + houseid + "'";
     //console.log(getownername1);
    db.query(getownername1, (err, result) => {
     // console.log(result);
        if (err || result == "") {
            res.render('oldcommonfee.ejs', {
                title: "Pay old common fee"
                ,message: '',ownername:'ไม่พบบ้านเลขที่นี้',houseno:'104/'+ houseid,invoicelist:'',periodid:'',balance:0
              })
        } else {
    res.render('oldcommonfee.ejs', {
      title: "Issue Invoice in Advance"
      ,message: '',ownername:result[0].owner_name,balance:result[0].remain,houseno:'104/'+ houseid
    })
}
  });
  },
  createadvanceinvoice: function(req, res){
    let villageid = req.body.village_id1;
    let houseid = req.body.house_no;
    let token = req.body.token;
    let invdate = req.body.inv_date;
    let periodid = req.body.period_id;
    let commonfee1 = Number(req.body.common_fee);
    let parkfee = req.body.parking_fee;
    let advmonth = Number(req.body.adv_month);
    let remark = req.body.remark;
    let discount = Number(req.body.discount);
    let other = Number(req.body.o_discount);
    if (discount == 100){  
      commonfee1 = other;
  } else {
    commonfee1 = Number(commonfee1*(1-discount)).toFixed(2);
  }
    var today = new Date();
    var c_date = today.getDate();
    var c_month = today.getMonth()+1;
    var c_year = today.getFullYear();
    var c_year1 = today.getFullYear()+543;
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
  
    var thismonth = month[today.getMonth()] + "-" + c_year1.toString() ;
        
               
                    var i;
                    var invoiceno ;
                    var newperiod;
                    var thismonth1;
                    var c_year2;
                    for (i=0;i<advmonth;i++) {
                        invoiceno = c_year.toString() + c_month.toString() + c_date.toString() + + houseid.toString().split('/')[1]+i;
                        //console.log(invoiceno);
                        newperiod = Number(periodid)+i+1;
                        if (newperiod <=12) {
                          thismonth1 = month[newperiod-1] + "-" + c_year1.toString() ;
                        }
                         else if (newperiod/12 - Math.floor(newperiod/12) > 0) {
                          //console.log ("check modulo = "+ newperiod%12 );
                         
                          c_year2 = 2563 + Math.floor(newperiod/12);
                          
                          thismonth1 = month[newperiod- (12*Math.floor(newperiod/12))-1] + "-" + c_year2.toString() ;
                        //console.log(thismonth1);
                        } else {
                           c_year2 = 2563 + Math.floor(newperiod/12)-1;
                          thismonth1 = month[11] + "-" + c_year2.toString() ;

                        }
                        
                        let createinvoice= "INSERT INTO `invoice_info` (`village_id`,`invoice_no`, house_no,invoice_type,invoice_period,amount,invoice_month) VALUES (" + villageid + ",'" + invoiceno +"-1', '" + houseid + "' , 'ค่าส่วนกลาง', '"+ newperiod + "',"+ commonfee1 + ",'"+ thismonth1 + "' )";
                       // console.log(createinvoice);
                   
                       let updateinvoiceperiod = "UPDATE `house_info` SET `invoice_period`= "+ newperiod + " WHERE  `house_no`='"+ houseid + "'";
                      //result1[i].parking_qty;
                      if (parkfee >0 ){
                        let createparkinvoice= "INSERT INTO `invoice_info` (`village_id`,`invoice_no`, house_no,invoice_type,invoice_period,amount,invoice_month) VALUES ("+ villageid + ",'" + invoiceno +"-2', '" + houseid + "' , 'ค่าจอดรถ', '"+ newperiod + "',"+ parkfee + ",'"+ thismonth1 +  "' )";
                        //console.log(createinvoice);
                        db.query(createparkinvoice, (err, result4) => {
                            if (err) {
                                return res.status(500).send(err);
                            } 
                        } );
                    }
                       db.query(createinvoice, (err, result3) => {
                        if (err) {
                            return res.status(500).send(err);
                        } 
                        else {
                            
                            db.query(updateinvoiceperiod, (err, result2) => {
                                if (err) {
                                    return res.status(500).send(err);
                                } 
                        } );
                        }
                      
                    });

                    }
                    res.redirect('/getinvoicelist/Bearer ' + token);
                   
            },
receiptpayment: function(req, res){
           
              let houseid = req.body.house_no;
              let invid = req.body.invoicelist.split(",");
              let paymenttype = req.body.payment_type;
              let transferno = req.body.transfer_no;
              let transferdate = req.body.transfer_date;
              let receivername = req.body.receiver;
              let receiptdate = req.body.receiptdate;
              let remark = req.body.remark;
              let token = req.body.token;
              let actual_pay = req.body.actual_pay;
              let lastremain=req.body.lastremain;
           //console.log(invid);
              let remain = req.body.remain;
              if (lastremain == ''){
                lastremain = 0;
              } else {
                lastremain = req.body.lastremain;
              }
              var today = new Date();
              var c_date = today.getDate();
              var c_month = today.getMonth()+1;
              var c_month1 = ("0" + (today.getMonth() + 1)).slice(-2);
              var c_year = today.getFullYear();
              var c_year1 = today.getFullYear()+543;
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
              let updatepayment;
              let updatebalance;
              var thismonth = month[today.getMonth()] + "-" + c_year1.toString() ;
              var receiptno ;
              var monthcode = "RE" +c_year.toString() + c_month1.toString();
              //console.log(invid);
             
                let getlastrcvno = " SELECT COUNT(DISTINCT receipt_no) AS count FROM (SELECT receipt_no FROM invoice_info WHERE receipt_no LIKE '" + monthcode +"%' UNION SELECT receipt_no FROM void_info WHERE receipt_no LIKE '"+monthcode +"%') AS TABLE1" 
               
                 
                
                // var createinvoice;
                  //console.log(c_month);
                //console.log(getlastrcvno);
        db.query(getlastrcvno, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          } else {
            let no = ("00" + (Number(result[0].count)+1)).slice(-3);;
            receiptno = "RE" +c_year.toString() + c_month1.toString()+ no;
        //console.log(receiptno);
         for (i=0;i<invid.length;i++) {
                if (i == invid.length-1){
                   updatepayment = "UPDATE `invoice_info` SET `payment_type`= '"+ paymenttype + "', `transfer_no`= '" + transferno + "', `payment_date`= '" + transferdate + "' , `receipt_date` = '"+ receiptdate  + "', `receiver_name` = '"+ receivername + "', `receipt_no` = '" + receiptno +"', `remark` = '"+ remark + "', `actual_pay` =" + actual_pay + " , `lastmonth` = " + lastremain +" , `balance` = " + remain +" WHERE  `id`= "+ invid[i];
                  updatebalance = "UPDATE house_info SET remain = "+ remain + " WHERE house_no = '" + houseid + "'";
                } else {
                 updatepayment = "UPDATE `invoice_info` SET `payment_type`= '"+ paymenttype + "', `transfer_no`= '" + transferno + "', `payment_date`= '" + transferdate + "' , `receipt_date` = '"+ receiptdate  + "', `receiver_name` = '"+ receivername + "', `receipt_no` = '" + receiptno +"', `remark` = '"+ remark + "' WHERE  `id`= "+ invid[i];
               //  updatebalance = "UPDATE house_info SET remain = 0 WHERE house_no = '" + houseid + "'";
              
                }
                //console.log(updatepayment);
                //console.log(updatebalance);
        db.query(updatepayment, (err, result) => {
         if (err) {
             return res.status(500).send(err);
         } 
           db.query(updatebalance, (err, result1) => {
           if (err) {
               return res.status(500).send(err);
           } 
          
         
         });
         
       });
       
              }
              res.redirect('/getreceiptlist3/Bearer ' +token);
            }
            
            }); 
            
            
      
              
                         
            },
            saveexpense: function(req, res){
              let expensetype = req.body.expense_type;
              let expensedate = req.body.expense_date;
              let companyname = req.body.company_name;
              let token = req.body.token;
               let amount = req.body.amount;
              let rcvname = req.body.receiver_name;
              let detail = req.body.detail;
              let paymenttype = req.body.payment_type;
              let saveexpense1 = "INSERT INTO `expense_info` (expense_type, expense_date,expense_amount,receive_name,company_name,details,payment_type) VALUES ('" + expensetype + "' , '" + expensedate + "', " + amount + " ,'" + rcvname + "','" + companyname + "','" + detail + "','" + paymenttype + "')" ;
           // console.log(saveexpense1);
              db.query(saveexpense1, (err, result) => {
                  if (err) {
                    return res.status(500).send(err);
                  } else {
                      
                    res.redirect('/getexpenselist/0/Bearer ' + token);
          }
            });
            },
            getexpenselist: function(req, res){
              let period = req.params.period;
              let getexpense1;
              if (period == 0) {
                getexpense1 = "SELECT *,FORMAT(expense_amount,2) AS expense_amount, DATE_FORMAT(expense_date, '%d-%m-%Y') AS exp_date1 FROM expense_info WHERE MONTH(expense_date) = MONTH(CURDATE()) AND YEAR(expense_date) = YEAR(CURDATE()) ORDER BY expense_date DESC";
                
              } else {
                getexpense1 = "SELECT *,FORMAT(expense_amount,2) AS expense_amount, DATE_FORMAT(expense_date, '%d-%m-%Y') AS exp_date1 FROM expense_info ORDER BY expense_date DESC";
                
              }

             //console.log(getexpense1);
              db.query(getexpense1, (err, result) => {
                  if (err) {
                    return res.status(500).send(err);
                  } else {
                      
                    res.render('expenselist.ejs', {
                      title: "Issue Invoice in Advance"
                      ,message: '',expenselist:result,condition:period,
                    })
          }
            });
            },
            saveincome: function(req, res){

              
              let incomedate = req.body.income_date;
              let incometype = req.body.income_type;
              let token =req.body.token;
              let amount = req.body.income_amount;
              let payername = req.body.payer_name;
              let rcvname = req.body.receiver_name;
              let detail = req.body.details;
              let receipttype = req.body.receipt_type;
              let transferno = req.body.transfer_no;
              let transferdate = req.body.transfer_date;
              let houseno = req.body.house_no;
              let villageid = req.body.village_id;
              var today = new Date();
              var c_date = today.getDate();
              var c_month = ("0" + (today.getMonth() + 1)).slice(-2);
              //console.log(houseno);
              var c_year = today.getFullYear();
             // var c_year1 = today.getFullYear()+543;
              var invoiceno = "INV" +c_year.toString() + c_month.toString() + c_date.toString() + today.getSeconds().toString();
              var monthcode = "RE" +c_year.toString() + c_month.toString();
  //console.log(invid);
            var receiptno;
            let periodid = 0;
            let getlastrcvno = " SELECT COUNT(DISTINCT receipt_no) AS count FROM (SELECT receipt_no FROM invoice_info WHERE receipt_no LIKE '" + monthcode +"%' UNION SELECT receipt_no FROM void_info WHERE receipt_no LIKE '"+monthcode +"%') AS TABLE1" 
            var createinvoice;
              //console.log(c_month);
            //console.log(getlastrcvno);
            db.query(getlastrcvno, (err, result) => {
              if (err) {
                return res.status(500).send(err);
              } else {
                let no = ("00" + (Number(result[0].count)+1)).slice(-3);;
                receiptno = "RE" +c_year.toString() + c_month.toString()+ no;
                //console.log(receiptno);
                createinvoice= "INSERT INTO `invoice_info` (`village_id`,`invoice_no`, house_no,invoice_type,invoice_period,amount,invoice_month,payment_type,transfer_no,payment_date,receipt_date,receiver_name,receipt_no,remark,actual_pay) VALUES (" + 
            +villageid + ",'"+invoiceno +"','"+houseno +"' , '"+ incometype +"','"+ periodid + "',"+ amount + ",'" + detail + "','"+ receipttype + "','"+ transferno +"','" + transferdate +"','" +  incomedate + "','" +  rcvname + "','" +  receiptno + "','"+ payername + "'," +  amount + ")";
           // console.log(createinvoice);
            db.query(createinvoice, (err, result) => {
                      if (err) {
                        return res.status(500).send(err);
                     } else {
                      res.redirect('/getreceiptlist1/Bearer ' + token);
                     }
              });
            }
            });

            
            //let saveincome1 = "INSERT INTO `income_info` ( income_date,income_amount,payer_name,receiver_name,details,receipt_type) VALUES ('" + incomedate + "' , " + amount + ", '" + payername + "' ,'" + rcvname + "','" + detail + "','" + receipttype + "')" ;
           //console.log(saveexpense1);
          //     db.query(saveincome1, (err, result) => {
          //         if (err) {
          //           return res.status(500).send(err);
          //         } else {
          //           receiptno = "RE" +c_year.toString() + c_month.toString();
          //           res.redirect('/getincomelist');
          // }
          //   });
            },
            getincomelist: function(req, res){
                            
              let getincome1 = "SELECT * , DATE_FORMAT(income_date, '%d-%m-%Y') AS inc_date1 FROM income_info";
            //console.log(getexpense1);
              db.query(getincome1, (err, result) => {
                  if (err) {
                    return res.status(500).send(err);
                  } else {
                      
                    res.render('incomelist.ejs', {
                      title: "Income List"
                      ,message: '',incomelist:result
                    })
          }
            });
            },
            incomeexpense: function(req, res){
            
                let monthincome = "SELECT FORMAT(SUM(actual_pay),0) AS monthincome FROM invoice_info WHERE YEAR(receipt_date) = YEAR(CURDATE()) AND MONTH(receipt_date) = MONTH(CURDATE())" ;
                let cashtransfer = "SELECT SUM(actual_pay) AS income,payment_type FROM invoice_info WHERE YEAR(receipt_date) = YEAR(CURDATE()) AND MONTH(receipt_date) = MONTH(CURDATE()) GROUP BY payment_type" ;
                let incomebymonth = "SELECT SUM(actual_pay) AS monthincome,payment_date FROM invoice_info WHERE YEAR(receipt_date) = YEAR(CURDATE()) GROUP BY MONTH(receipt_date) ORDER BY MONTH(receipt_date) " ;
                let incomebytype = "SELECT SUM(amount) AS incomebytype,invoice_type FROM invoice_info WHERE YEAR(receipt_date) = YEAR(CURDATE()) AND MONTH(receipt_date) = MONTH(CURDATE()) GROUP BY invoice_type" ;
                let percentbymonth = "SELECT COUNT(DISTINCT house_no) AS percentbymonth,payment_date FROM invoice_info WHERE YEAR(receipt_date) = YEAR(CURDATE()) GROUP BY MONTH(receipt_date) ORDER BY MONTH(receipt_date) " ;
               
                let monthexpense = "SELECT FORMAT(SUM(expense_amount),0) AS monthexpense FROM expense_info WHERE YEAR(expense_date) = YEAR(CURDATE()) AND MONTH(expense_date) = MONTH(CURDATE())";
                let expensebytype = "SELECT SUM(expense_amount) AS monthexpense,expense_type FROM expense_info WHERE YEAR(expense_date) = YEAR(CURDATE()) AND MONTH(expense_date) = MONTH(CURDATE()) GROUP BY expense_type";
                let yearincome = "SELECT FORMAT(SUM(actual_pay),0) AS yearincome FROM invoice_info WHERE YEAR(receipt_date) = YEAR(CURDATE())" ;
                let yearexpense = "SELECT FORMAT(SUM(expense_amount),0) AS yearexpense FROM expense_info WHERE YEAR(expense_date) = YEAR(CURDATE())";
               // console.log(monthexpense);
                //console.log(incomebytype);
               // console.log(expensebytype);
                //console.log(percentbymonth);
                db.query(monthincome, (err, result) => {
                  if (err) {
                      return res.status(500).send(err);
                  }
                  console.log(result[0].monthincome);
                  db.query(monthexpense , (err, result1) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    console.log("result1 "+ result1[0].monthexpense);
                    db.query(yearincome, (err, result2) => {
                      if (err) {
                          return res.status(500).send(err);
                      }  
                      if (result2[0].yearincome == null ) {
                        result2[0].yearincome = 0;
                      }
                     // console.log("result2"+result2);
                      db.query(yearexpense, (err, result3) => {
                        if (err) {
                            return res.status(500).send(err);
                        }   
                        if (result3[0].yearexpense == null ) {
                          result3[0].yearexpense = 0;
                        }
                       // console.log("result3"+result3);
                        db.query(cashtransfer, (err, result4) => {
                          if (err) {
                              return res.status(500).send(err);
                          } 
                        //  console.log("result4"+ result4);
                          db.query(expensebytype, (err, result5) => {
                            if (err) {
                                return res.status(500).send(err);
                            } 
                            //console.log("result5"+ result5);
                            db.query(incomebymonth, (err, result6) => {
                              if (err) {
                                  return res.status(500).send(err);
                              }  
                            //  console.log("result6"+ result6);
                              db.query(incomebytype, (err, result7) => {
                                if (err) {
                                 // result7=0;
                                    return res.status(500).send(err);
                                } 
                                db.query(percentbymonth, (err, result8) => {
                                  if (err) {
                                      return res.status(500).send(err);
                                  } 
                                console.log("result7="+ result7.length);
                            x = [];
                            y = [];                    
                            if ((result4.length > 0 )) {
                            
                             
                                for (i = 0; i<result4.length; i++) {
                                  x[i] = result4[i].payment_type;
                                  y[i] = result4[i].income;
                              
                           
                          }
                        }
                          x1 = [];
                            y1 = [];     
                           // console.log("result5"+ x1);
                          
                                        
                            if ((result5 !== null || result5.length > 0 )) {
                            
                             
                                for (i = 0; i<result5.length; i++) {
                                  x1[i] = result5[i].expense_type;
                                  y1[i] = result5[i].monthexpense;
                              
                           
                          }
                        }
                          
                            y2 = [];                    
                            if ((result6.length > 0 )) {
                            
                             
                                for (i = 0; i<=11; i++) {
                                 if (result6[i] == null) {
                                  y2[i] = 0;
                              
                                } else {
                                  y2[i] = result6[i].monthincome;
                                }
                          }
                        }
                          x3 = [];
                          y3 = [];                    
                          if ((result7.length > 0 )) {
                          
                           
                              for (i = 0; i<result7.length; i++) {
                                x3[i] = result7[i].invoice_type;
                                y3[i] = result7[i].incomebytype;
                            
                         
                        }
                      }
                        y4 = [];                    
                        if ((result8.length > 0 )) {
                        
                         
                            for (i = 0; i<=11; i++) {
                             if (result8[i] == null) {
                              y4[i] = 0;
                          
                            } else {
                              y4[i] = result8[i].percentbymonth;
                            }
                      }
                    }

                      //console.log("result 0 =" + result[0].monthincome);
                     
                  if (result1[0].monthexpense !== null && result[0].monthincome !== null ) {
                    console.log("no result4");
                    res.render('income-expense.ejs', {
                      title: "Income"
                      ,message: '',monthincome: result[0].monthincome.toLocaleString(), monthexpense:result1[0].monthexpense,yearincome: result2[0].yearincome.toLocaleString(),yearexpense: result3[0].yearexpense.toLocaleString(),paymentype:x,amount:y,expensetype:x1,expenseamount:y1,incomebymonth:y2,invoicetype:x3,incomebytype:y3,percentbymonth:y4
                  });
                  
                  } else if (result1[0].monthexpense == null && result[0].monthincome == null) {
                    console.log("no result5");
                    res.render('income-expense.ejs', {
                      title: "Income"
                      ,message: '',monthincome: 0, monthexpense: 0 ,yearincome: result2[0].yearincome.toLocaleString(),yearexpense: result3[0].yearexpense.toLocaleString(),paymentype:'0',amount:'0',expensetype:x1,expenseamount:y1,incomebymonth:y2,invoicetype:x3,incomebytype:y3,percentbymonth:y4
                  });
                  } else {
                    console.log("no result6");
                    res.render('income-expense.ejs', {
                      title: "Income"
                      ,message: '',monthincome: result[0].monthincome.toLocaleString(), monthexpense: 0 ,yearincome: result2[0].yearincome.toLocaleString(),yearexpense: result3[0].yearexpense.toLocaleString(),paymentype:x,amount:y,expensetype:x1,expenseamount:y1,incomebymonth:y2,invoicetype:x3,incomebytype:y3,percentbymonth:y4
                  });
                  }   
                  
              } 
            
            
                
            
          
        
      );
              
      
          });
          });
          }); 
        });
          });
          });
        });
      });
    
            },
pendingpayment: function(req, res){
              var today = new Date();
            
            
              var c_year1 = today.getFullYear()+543;
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
  
    var thismonth = month[today.getMonth()] + "-" + c_year1.toString() ;
        
             let percentpayment = "SELECT COUNT(invoice_no) AS totalpay FROM invoice_info WHERE payment_type IS NOT NULL AND invoice_type ='ค่าส่วนกลาง' AND invoice_month = '" + thismonth + "'";
             let over30days = "SELECT FORMAT(SUM(amount),0) AS days30,SUM(amount) AS afterfeb FROM invoice_info WHERE payment_type IS NULL OR payment_type=''";
             let over90days = "SELECT FORMAT(ABS(SUM(remain)),0) AS days90,ABS(SUM(remain)) AS beforefeb FROM house_info WHERE remain <0";
             //let over120days = "SELECT FORMAT(SUM(amount),0) AS days120 FROM invoice_info WHERE payment_type IS NULL AND invoice_type='ค่าส่วนกลาง' AND invoice_date < DATE_ADD(NOW(), INTERVAL -120 DAY)";
            let allpending;
             let getbysoi = "SELECT SUM(amount) AS sumbysoi, invoice_info.house_no, house_info.lane_no AS laneno " + 
             "FROM invoice_info " + 
             "LEFT JOIN house_info " + 
             "ON invoice_info.house_no = house_info.house_no " +
             "WHERE payment_type IS NULL AND invoice_type='ค่าส่วนกลาง' AND invoice_date > DATE_ADD(NOW(), INTERVAL -30 DAY) " +
             "GROUP BY lane_no ORDER BY sumbysoi DESC ";
             //console.log(over30days);
            db.query(percentpayment, (err, result) => {
              if (err) {
                  return res.status(500).send(err);
              }  else {
                db.query(over30days, (err, result1) => {
                  if (err) {
                      return res.status(500).send(err);
                  } else {
                    db.query(over90days, (err, result2) => {
                      if (err) {
                          return res.status(500).send(err);
                      } else {
                       allpending = (Number(result1[0].afterfeb) + Number(result2[0].beforefeb)).toLocaleString('es-ES', {maximumFractionDigits: 0})
                            db.query(getbysoi, (err, result4) => {
                              if (err) {
                                  return res.status(500).send(err);
                              } else {
                                x = [];
                                y = [];                    
                                if ((result4.length > 0 )) {
                                
                                 if ((result4.length > 5 )) {
                                    for (i = 0; i<5; i++) {
                                      x[i] = "ซอย "+ result4[i].laneno;
                                      y[i] = result4[i].sumbysoi;
                              } 
                            } else {
                              for (i = 0; i<result4.length; i++) {
                                x[i] = "ซอย "+ result4[i].laneno;
                                y[i] = result4[i].sumbysoi;
                        } 

                            }
                              if (result1[0].days30 != null ){
                                res.render('duepayreport.ejs', {
                                  title: "Overdue Payment Report"
                                  ,message: '',percentpayment: (Number(result[0].totalpay)*100/282).toFixed(2), over30days: result1[0].days30,over90days: result2[0].days90,over120days:allpending,soino:x,sumbysoi:y
                              });
                            } else {
                              res.render('duepayreport.ejs', {
                                title: "Overdue Payment Report"
                                ,message: '',percentpayment: (Number(result[0].totalpay)*100/282).toLocaleString('es-ES', {maximumFractionDigits: 2}), over30days: 0,over90days: 0 ,over120days:0,soino:x,sumbysoi:y
                            });

                            }
                            }
                              }
                            });
                          }
                        });
                      }
                 
                });

              } 
  });
},
invoiceform: function(req, res){
  let houseid = req.params.house_no;

  //console.log(houseid);
  let getownername1 = "SELECT *, FORMAT(Abs(remain),2) AS remain1  FROM `house_info` WHERE house_no = '104/" + houseid + "'";
  let getpendinginvoice =  "SELECT *,FORMAT(amount,2) AS amount FROM `invoice_info` WHERE house_no ='104/" + houseid + "' AND (payment_type = '' OR payment_type IS NULL) ";
  
  let getsum =  "SELECT FORMAT(SUM(amount)-house_info.remain,2) AS t_amount,(DATE_FORMAT(MAX(invoice_info.invoice_date),'%d %b %Y')) AS invoice_date1,SUBSTRING_INDEX(GROUP_CONCAT(invoice_month),',',1) AS START,SUBSTRING_INDEX(GROUP_CONCAT(invoice_month),',',-1) AS END FROM `invoice_info` " +
 "LEFT JOIN house_info " + 
  "ON invoice_info.house_no = house_info.house_no "+
  "WHERE invoice_info.house_no ='104/"+ houseid  + "' AND (invoice_info.payment_type = '' OR invoice_info.payment_type IS NULL)";
   //console.log(getsum);
  let getvillageinfo = "SELECT * FROM village_info"
   db.query(getownername1, (err, result) => {
    //console.log(result.length);
      if (err || result.length == 0 ) {
        
        res.render('invoiceform.ejs', {
          title: "invoiceform"
          ,message: 'ไม่มีค่าส่วนกลางค้างชำระ',invoiceno:'',oldamount:'',invoicedate:'',ownername:'',houseno:'',invoicelist:'',oldamount:'',laneno:'',villageid:'',periodid:'',commonfee:'',
      });
        
      } else {
        db.query(getvillageinfo, (err, villageinfo) => {
          if (err || villageinfo.length == 0 ) {
        
            return res.status(500).send(err);
        
        } else {

        //console.log(result[0].remain);
        db.query(getsum, (err, result2) => {
          //console.log(result2);
          if (err || result2[0].t_amount == null) {
           // console.log(getpendinginvoice);
            res.render('invoiceform.ejs', {
              title: "invoiceform"
              ,message: 'ไม่มีค่าส่วนกลางค้างชำระ',invoiceno:'',oldamount1:result[0].remain,invoicedate:'',ownername:result[0].owner_name,laneno:result[0].lane_no,houseno:'104/'+ houseid,invoicelist:'',oldamount:result[0].remain1.toLocaleString(),villageid:result[0].village_id,periodid:result[0].invoice_period,commonfee:result[0].common_fee,
          });
          } else {
          db.query(getpendinginvoice, (err, result1) => {
            
              if (err || result1 == "" ) {
          
                return res.status(500).send(err);
              } else {
           var invoicedate = new Date(result2[0].invoice_date1);
           var c_year1 = invoicedate.getFullYear()+543;
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

 var invoicedate1 = invoicedate.getDate() +" " +month[invoicedate.getMonth()] + " " + c_year1.toString() ;
  res.render('invoiceform.ejs', {
    title: "invoiceform"
    ,message: '',ownername:result[0].owner_name,oldamount1:result[0].remain,laneno:result[0].lane_no,oldamount:result[0].remain1,houseno:'104/'+ houseid,invoicelist: result1,periodid:result[0].invoice_period,invoiceno:result1[0].invoice_no,invoicedate: invoicedate1,totalamount:result2[0].t_amount.toLocaleString(),villageid:result[0].village_id,periodid:result[0].invoice_period,commonfee:result[0].common_fee,villageinfo:villageinfo[0],
});
              }
            });
          }
        });
}
})
}
});
  
},
invoiceform1: function(req, res){
  let houseid = req.params.house_no;
  //console.log(houseid);
  let getownername1 = "SELECT *, FORMAT(Abs(remain),0) AS remain1  FROM `house_info` WHERE house_no = '104/" + houseid + "'";
  let getpendinginvoice =  "SELECT * FROM `invoice_info` WHERE house_no ='104/" + houseid + "' AND (payment_type = '' OR payment_type IS NULL) ";
  let getsum =  "SELECT SUM(amount)-house_info.remain AS t_amount,(DATE_FORMAT(MAX(invoice_info.invoice_date),'%d %b %Y')) AS invoice_date1,SUBSTRING_INDEX(GROUP_CONCAT(invoice_month),',',1) AS START,SUBSTRING_INDEX(GROUP_CONCAT(invoice_month),',',-1) AS END FROM `invoice_info` " +
 "LEFT JOIN house_info " + 
  "ON invoice_info.house_no = house_info.house_no "+
  "WHERE invoice_info.house_no ='104/"+ houseid  + "' AND (invoice_info.payment_type = '' OR invoice_info.payment_type IS NULL)";
   //console.log(getsum);
  db.query(getownername1, (err, result) => {
    //console.log(result.length);
      if (err || result.length == 0 ) {
        
        res.render('invoiceform1.ejs', {
          title: "invoiceform"
          ,message: 'ไม่มีค่าส่วนกลางค้างชำระ',invoiceno:'',oldamount:'',invoicedate:'',ownername:'',houseno:'',invoicelist:'',oldamount:'',laneno:'',villageid:'',periodid:'',commonfee:'',
      });
        
      } else {
        //console.log(result[0].remain);
        db.query(getsum, (err, result2) => {
          //console.log(result2);
          if (err || result2[0].t_amount == null) {
           // console.log(getpendinginvoice);
            res.render('invoiceform1.ejs', {
              title: "invoiceform"
              ,message: 'ไม่มีค่าส่วนกลางค้างชำระ',invoiceno:'',oldamount1:result[0].remain,invoicedate:'',ownername:result[0].owner_name,laneno:result[0].lane_no,houseno:'104/'+ houseid,invoicelist:'',oldamount:result[0].remain1.toLocaleString(),villageid:result[0].village_id,periodid:result[0].invoice_period,commonfee:result[0].common_fee,
          });
          } else {
          db.query(getpendinginvoice, (err, result1) => {
            
              if (err || result1 == "" ) {
          
                return res.status(500).send(err);
              } else {
           var invoicedate = new Date(result2[0].invoice_date1);
           var c_year1 = invoicedate.getFullYear()+543;
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

 var invoicedate1 = invoicedate.getDate() +" " +month[invoicedate.getMonth()] + " " + c_year1.toString() ;
  res.render('invoiceform1.ejs', {
    title: "invoiceform"
    ,message: '',ownername:result[0].owner_name,oldamount1:result[0].remain,laneno:result[0].lane_no,oldamount:result[0].remain1,houseno:'104/'+ houseid,invoicelist: result1,periodid:result[0].invoice_period,invoiceno:result1[0].invoice_no,invoicedate: invoicedate1,totalamount:result2[0].t_amount.toLocaleString(),villageid:result[0].village_id,periodid:result[0].invoice_period,commonfee:result[0].common_fee,
});
              }
            });
}
})
}
});
  
},
receiptform: function(req, res){
  let receiptno1 = req.params.receiptno;
  let houseid = req.params.house_no;
 // let houseid = req.params.house_no;
  //console.log(houseid);
  let getownername1 = "SELECT *  FROM `house_info` WHERE house_no ='104/" + houseid + "'";
  let getreceiptlist =  "SELECT *,(DATE_FORMAT(payment_date,'%d/%m/%Y')) AS transfer_date,invoice_period,amount AS amount1,FORMAT(SUM(amount),2) AS amount,SUBSTRING_INDEX(GROUP_CONCAT(invoice_month),',',1) AS START,SUBSTRING_INDEX(GROUP_CONCAT(invoice_month),',',-1) AS END FROM  `invoice_info` WHERE receipt_no = '" + receiptno1 + "' AND invoice_type ='ค่าส่วนกลาง' ORDER BY invoice_period";
  let getreceiptlist1 =  "SELECT *,invoice_period,amount AS amount1,FORMAT(SUM(amount),2) AS amount,SUBSTRING_INDEX(GROUP_CONCAT(invoice_month),',',1) AS START,SUBSTRING_INDEX(GROUP_CONCAT(invoice_month),',',-1) AS END FROM  `invoice_info` WHERE receipt_no = '" + receiptno1 + "' AND invoice_type ='ค่าจอดรถ' ORDER BY invoice_period";
  let getsum =  "SELECT SUM(amount) AS t_amount, FORMAT(SUM(actual_pay),2) AS t_pay,Abs(SUM(lastmonth)) AS t_lastmonth,FORMAT(SUM(lastmonth),2) AS t_lastmonth1, FORMAT(SUM(balance),2) AS t_balance FROM `invoice_info` WHERE receipt_no = '" + receiptno1 + "'";
   //console.log(getreceiptlist);
  db.query(getownername1, (err, result) => {
    //console.log(result);
      if (err || result == "") {
        return res.status(500).send(err);
      } else {
        db.query(getsum, (err, result2) => {
          if (err) {
              return res.status(500).send(err);
          } else {
          db.query(getreceiptlist, (err, result1) => {
              if (err || result1 == "") {
                //console.log(result1);
               return res.status(500).send(err);
              } else {
                db.query(getreceiptlist1, (err,result3) => {
                  if (err || result1 == "") {
                    //console.log(result1[0].receipt_date);
                   return res.status(500).send(err);
                  } else {
                    var receiptdate;
                    if (result1[0].receipt_date == null) {
                      receiptdate = new Date(result3[0].receipt_date);
                    } else {
                      receiptdate = new Date(result1[0].receipt_date);
                    }
                    //console.log(receiptdate);
          
           var c_year1 = receiptdate.getFullYear()+543;
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

 var receiptdate1 = receiptdate.getDate() +" " +month[receiptdate.getMonth()] + " " + c_year1.toString() ;
  var netremain = Number(result2[0].t_pay) - Number(result2[0].t_amount);
  var totaltopay = Number(result2[0].t_amount) - Number(result2[0].t_lastmonth1);
  totaltopay = totaltopay.toFixed(2);
var paymenttype = result1[0].payment_type;
if (paymenttype == null ) {
  paymenttype = result3[0].payment_type;
  
}
//console.log(paymenttype);
var transferno = result1[0].transfer_no;
var transferdate = result1[0].transfer_date;
  var lastmonth;
  if (result2[0].t_lastmonth == null) {
    lastmonth = 0;
    lastmonth1 = 0;
  } else {
    lastmonth = result2[0].t_lastmonth;
    lastmonth1 = result2[0].t_lastmonth1;
  }

 res.render('receiptform.ejs', {
    title: "receiptform"
    ,message: '',ownername:result[0].owner_name,laneno:result[0].lane_no,houseno:'104/'+ houseid,invoicelist: result1,invoicelist1: result3,periodid:result[0].invoice_period,receiptno:receiptno1,receiptdate: receiptdate1,totalamount:totaltopay.toLocaleString(),totalpay:result2[0].t_pay.toLocaleString(),netdiff:result2[0].t_balance.toLocaleString(),netdiff1:result2[0].t_balance,lastbalance:lastmonth.toLocaleString(),lastbalance1:lastmonth1,invoicemonth:result1[0].invoice_month,paymenttype:paymenttype,transferno:transferno,transferdate:transferdate
});
 }
});
}
})
}
});
}
});
},
receiptform1: function(req, res){
  let receiptno1 = req.params.receiptno;
  let houseid = req.params.house_no;
 // let houseid = req.params.house_no;
  //console.log(houseid);
  let getownername1 = "SELECT *  FROM `house_info` WHERE house_no ='104/" + houseid + "'";
  let getreceiptlist =  "SELECT *,(DATE_FORMAT(payment_date,'%d/%m/%Y')) AS transfer_date,invoice_period,amount AS amount1,FORMAT(SUM(amount),2) AS amount,SUBSTRING_INDEX(GROUP_CONCAT(invoice_month),',',1) AS START,SUBSTRING_INDEX(GROUP_CONCAT(invoice_month),',',-1) AS END FROM  `invoice_info` WHERE receipt_no = '" + receiptno1 + "' AND invoice_type ='ค่าส่วนกลาง' ORDER BY invoice_period";
  let getreceiptlist1 =  "SELECT *,invoice_period,FORMAT(amount,2) AS amount1,FORMAT(SUM(amount),2) AS amount,SUBSTRING_INDEX(GROUP_CONCAT(invoice_month),',',1) AS START,SUBSTRING_INDEX(GROUP_CONCAT(invoice_month),',',-1) AS END FROM  `invoice_info` WHERE receipt_no = '" + receiptno1 + "' AND invoice_type ='ค่าจอดรถ' ORDER BY invoice_period";
  let getsum =  "SELECT SUM(amount) AS t_amount, FORMAT(SUM(actual_pay),2) AS t_pay,FORMAT(Abs(SUM(lastmonth)),2) AS t_lastmonth,SUM(lastmonth) AS t_lastmonth1, SUM(balance) AS t_balance FROM `invoice_info` WHERE receipt_no = '" + receiptno1 + "'";
   //console.log(getreceiptlist1);
  db.query(getownername1, (err, result) => {
    //console.log(result);
      if (err || result == "") {
        return res.status(500).send(err);
      } else {
        db.query(getsum, (err, result2) => {
          if (err) {
              return res.status(500).send(err);
          } else {
          db.query(getreceiptlist, (err, result1) => {
              if (err || result1 == "") {
                //console.log(result1);
               return res.status(500).send(err);
              } else {
                db.query(getreceiptlist1, (err,result3) => {
                  if (err || result1 == "") {
                    //console.log(result1[0].receipt_date);
                   return res.status(500).send(err);
                  } else {
                    var receiptdate;
                    if (result1[0].receipt_date == null) {
                      receiptdate = new Date(result3[0].receipt_date);
                    } else {
                      receiptdate = new Date(result1[0].receipt_date);
                    }
                    
          
           var c_year1 = receiptdate.getFullYear()+543;
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

 var receiptdate1 = receiptdate.getDate() +" " +month[receiptdate.getMonth()] + " " + c_year1.toString() ;
  var netremain = Number(result2[0].t_pay) - Number(result2[0].t_amount);
  var totaltopay = Number(result2[0].t_amount) - Number(result2[0].t_lastmonth1);
  
var paymenttype = result1[0].payment_type;
if (paymenttype == null ) {
  paymenttype = result3[0].payment_type;
  
}
//console.log(paymenttype);
var transferno = result1[0].transfer_no;
var transferdate = result1[0].transfer_date;
  var lastmonth;
  if (result2[0].t_lastmonth == null) {
    lastmonth = 0;
    lastmonth1 = 0;
  } else {
    lastmonth = result2[0].t_lastmonth;
    lastmonth1 = result2[0].t_lastmonth1;
  }

 res.render('receiptform1.ejs', {
    title: "receiptform"
    ,message: '',ownername:result[0].owner_name,laneno:result[0].lane_no,houseno:'104/'+ houseid,invoicelist: result1,invoicelist1: result3,periodid:result[0].invoice_period,receiptno:receiptno1,receiptdate: receiptdate1,totalamount:totaltopay.toLocaleString(undefined, {minimumFractionDigits: 2}),totalpay:result2[0].t_pay.toLocaleString(),netdiff:result2[0].t_balance.toLocaleString(undefined, {minimumFractionDigits: 2}),netdiff1:result2[0].t_balance,lastbalance:lastmonth.toLocaleString(),lastbalance1:lastmonth1,invoicemonth:result1[0].invoice_month,paymenttype:paymenttype,transferno:transferno,transferdate:transferdate
});
 }
});
}
})
}
});
}
});
},
receiptform2: function(req, res){
  let receiptno1 = req.params.receiptno;
  let houseid = req.params.house_no;
 // let houseid = req.params.house_no;
  
  let getownername1 = "SELECT *  FROM `house_info` WHERE house_no ='104/" + houseid + "'";
  //console.log(getownername1);
  
  let getreceiptlist =  "SELECT *,(DATE_FORMAT(payment_date,'%d/%m/%Y')) AS transfer_date,invoice_period,amount AS amount1,FORMAT(SUM(amount),2) AS amount,SUBSTRING_INDEX(GROUP_CONCAT(invoice_month),',',1) AS START,SUBSTRING_INDEX(GROUP_CONCAT(invoice_month),',',-1) AS END FROM  `invoice_info` WHERE receipt_no = '" + receiptno1 + "' AND invoice_type <>'ค่าส่วนกลาง' AND invoice_type <>'ค่าจอดรถ' ORDER BY invoice_period";
  //let getreceiptlist1 =  "SELECT *,invoice_period,amount AS amount1,FORMAT(SUM(amount),0) AS amount,SUBSTRING_INDEX(GROUP_CONCAT(invoice_month),',',1) AS START,SUBSTRING_INDEX(GROUP_CONCAT(invoice_month),',',-1) AS END FROM  `invoice_info` WHERE receipt_no = '" + receiptno1 + "' AND invoice_type ='ค่าจอดรถ' ORDER BY invoice_period";
  let getsum =  "SELECT FORMAT(SUM(amount),2) AS t_amount, FORMAT(SUM(actual_pay),2) AS t_pay,FORMAT(Abs(SUM(lastmonth)),2) AS t_lastmonth,SUM(lastmonth) AS t_lastmonth1, FORMAT(SUM(balance),2) AS t_balance FROM `invoice_info` WHERE receipt_no = '" + receiptno1 + "'";
  //console.log(getsum);
  db.query(getownername1, (err, result) => {
    //console.log(result);
      if (err ) {
        return res.status(500).send(err);
      } else {
        db.query(getsum, (err, result2) => {
          if (err) {
              return res.status(500).send(err);
          } else {
          db.query(getreceiptlist, (err, result1) => {
              if (err || result1 == "") {
               // console.log(result1);
               return res.status(500).send(err);
              } else {
           var receiptdate = new Date(result1[0].receipt_date);
           var c_year1 = receiptdate.getFullYear()+543;
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
 var receiptdate1 = receiptdate.getDate() +" " +month[receiptdate.getMonth()] + " " + c_year1.toString() ;
  //var netremain = Number(result2[0].t_pay) - Number(result2[0].t_amount);
  var totaltopay = Number(result2[0].t_amount) - Number(result2[0].t_lastmonth1);
var paymenttype = result1[0].payment_type;
var transferno = result1[0].transfer_no;
var transferdate = result1[0].transfer_date;
if (result.length >0 ){
 res.render('receiptform2.ejs', {
    title: "receiptform"
    ,message: '',ownername:result[0].owner_name,laneno:result[0].lane_no,houseno:'104/'+ houseid,invoicelist: result1,periodid:result[0].invoice_period,receiptno:result1[0].receipt_no,receiptdate: receiptdate1,totalamount:totaltopay.toLocaleString(),totalpay:result2[0].t_pay.toLocaleString(),invoicemonth:result1[0].invoice_month,paymenttype:paymenttype,transferno:transferno,transferdate:transferdate,
});
} else {
  res.render('receiptform2.ejs', {
    title: "receiptform"
    ,message: '',ownername:result1[0].remark,laneno:'',houseno:'',invoicelist: result1,periodid:'',receiptno:result1[0].receipt_no,receiptdate: receiptdate1,totalamount:totaltopay.toLocaleString(),totalpay:result2[0].t_pay.toLocaleString(),invoicemonth:result1[0].invoice_month,paymenttype:paymenttype,transferno:transferno,transferdate:transferdate,
});
}
 }
});
}
})
}
});
},
receiptform4: function(req, res){
  let receiptno1 = req.params.receiptno;
  let houseid = req.params.house_no;
 // let houseid = req.params.house_no;
  //console.log(houseid);
  let getownername1 = "SELECT *  FROM `house_info` WHERE house_no ='104/" + houseid + "'";
   let getvoidreceiptinfo = "SELECT * FROM void_info WHERE receipt_no ='"+ receiptno1 + "'"
 
   //console.log(getvoidreceiptinfo);
  db.query(getownername1, (err, result) => {
    //console.log(result);
      if (err || result == "") {
        return res.status(500).send(err);
      } else {
        
                db.query(getvoidreceiptinfo, (err,result1) => {
                  if (err || result1 == "") {
                    //console.log(result1[0].receipt_date);
                   return res.status(500).send(err);
                  } else {
                    var receiptdate;
                    if (result1[0].void_date == null) {
                      receiptdate = new Date(result3[0].void_date);
                    } else {
                      receiptdate = new Date(result1[0].void_date);
                    }
                    
          
           var c_year1 = receiptdate.getFullYear()+543;
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

 var receiptdate1 = receiptdate.getDate() +" " +month[receiptdate.getMonth()] + " " + c_year1.toString() ;


//console.log(paymenttype);


 res.render('receiptform3.ejs', {
    title: "receiptform"
    ,message: '',ownername:result[0].owner_name,laneno:result[0].lane_no,houseno:'104/'+ houseid,invoicelist: result1,totalpay:result1[0].void_amount.toLocaleString(),paymenttype:result1[0].payment_type,receiptno:result1[0].receipt_no,receiptdate:receiptdate1,
});
 }

});
}
});
},
incomeexpense1: function(req, res){
            
  let monthincome = "SELECT FORMAT(SUM(actual_pay),0) AS monthincome FROM invoice_info WHERE YEAR(receipt_date) = YEAR(CURDATE()) AND MONTH(receipt_date) = MONTH(CURDATE())" ;
  let cashtransfer = "SELECT SUM(actual_pay) AS income,payment_type FROM invoice_info WHERE YEAR(receipt_date) = YEAR(CURDATE()) AND MONTH(receipt_date) = MONTH(CURDATE()) GROUP BY payment_type" ;
  let incomebymonth = "SELECT SUM(actual_pay) AS monthincome,payment_date FROM invoice_info WHERE YEAR(receipt_date) = YEAR(CURDATE()) GROUP BY MONTH(receipt_date) ORDER BY MONTH(payment_date) " ;
  let incomebytype = "SELECT SUM(actual_pay) AS incomebytype,invoice_type FROM invoice_info WHERE YEAR(receipt_date) = YEAR(CURDATE()) AND MONTH(receipt_date) = MONTH(CURDATE()) GROUP BY invoice_type" ;
  //console.log(incomebymonth);
  //console.log(incomebytype);
  let monthexpense = "SELECT FORMAT(SUM(expense_amount),0) AS monthexpense FROM expense_info WHERE YEAR(expense_date) = YEAR(CURDATE()) AND MONTH(expense_date) = MONTH(CURDATE())";
  let expensebytype = "SELECT SUM(expense_amount) AS monthexpense,expense_type FROM expense_info WHERE YEAR(expense_date) = YEAR(CURDATE()) AND MONTH(expense_date) = MONTH(CURDATE()) GROUP BY expense_type";
  let yearincome = "SELECT FORMAT(SUM(actual_pay),0) AS yearincome FROM invoice_info WHERE YEAR(receipt_date) = YEAR(CURDATE())" ;
  let yearexpense = "SELECT FORMAT(SUM(expense_amount),0) AS yearexpense FROM expense_info WHERE YEAR(expense_date) = YEAR(CURDATE())";

  //console.log(monthexpense);
  db.query(monthincome, (err, result) => {
    if (err) {
        return res.status(500).send(err);
    }
    db.query(monthexpense , (err, result1) => {
      if (err) {
          return res.status(500).send(err);
      }

      db.query(yearincome, (err, result2) => {
        if (err) {
            return res.status(500).send(err);
        }  
        db.query(yearexpense, (err, result3) => {
          if (err) {
              return res.status(500).send(err);
          }
          if (result3[0].yearexpense == null ) {
            result3[0].yearexpense = 0;
          }   
          db.query(cashtransfer, (err, result4) => {
            if (err) {
                return res.status(500).send(err);
            } 
            db.query(expensebytype, (err, result5) => {
              if (err) {
                  return res.status(500).send(err);
              } 
              db.query(incomebymonth, (err, result6) => {
                if (err) {
                    return res.status(500).send(err);
                }  
                db.query(incomebytype, (err, result7) => {
                  if (err) {
                      return res.status(500).send(err);
                  } 
                 
              x = [];
              y = [];                    
              if ((result4.length > 0 )) {
              
              
                  for (i = 0; i<result4.length; i++) {
                    x[i] = result4[i].payment_type;
                    y[i] = result4[i].income;
                             
            }
          }
            console.log(result4.length);
            x1 = [];
              y1 = [];        
              //console.log("no result5");            
              if ((result5 !== null || result5.length > 0 )) {
              
                  for (i = 0; i<result5.length; i++) {
                    x1[i] = result5[i].expense_type;
                    y1[i] = result5[i].monthexpense;
                
             
            }
          }
              y2 = [];                    
              if ((result6.length > 0 )) { 
                  for (i = 0; i<=11; i++) {
                   if (result6[i] == null) {
                    y2[i] = 0;
                
                  } else if (i== 0){
                    y2[0] = 0;
                  } else {
                    y2[i] = result6[i].monthincome;
                    
                  }
             
            }
          }
           
            x3 = [];
            y3 = [];                    
            if ((result7.length > 0 )) {
            
             
                for (i = 0; i<result7.length; i++) {
                  x3[i] = result7[i].invoice_type;
                  y3[i] = result7[i].incomebytype;
                         
          }
        }
         
          if (result1[0].monthexpense == null && result[0].monthincome == null) {
            console.log("result1");
            res.render('income-expense1.ejs', {
              title: "Income"
              ,message: '',monthincome: 0, monthexpense: 0,yearincome: result2[0].yearincome.toLocaleString(),yearexpense:result3[0].yearexpense.toLocaleString(),paymentype:x,amount:y,expensetype:x1,expenseamount:y1,incomebymonth:y2,invoicetype:x3,incomebytype:y3
          });


          } else if ((result1[0].monthexpense == null && result[0].monthincome !== null)) {
            console.log("result2");
            res.render('income-expense1.ejs', {
              title: "Income"
              ,message: '',monthincome: result[0].monthincome.toLocaleString(), monthexpense: 0 ,yearincome: result2[0].yearincome.toLocaleString(),yearexpense:result3[0].yearexpense.toLocaleString(),paymentype:x,amount:y,expensetype:'',expenseamount:'',incomebymonth:y2,invoicetype:x3,incomebytype:y3
          });
          
        }  else {
          console.log("no result5");
            res.render('income-expense1.ejs', {
              title: "Income"
              ,message: '',monthincome: result[0].monthincome.toLocaleString(), monthexpense: result1[0].monthexpense.toLocaleString(),yearincome: result2[0].yearincome.toLocaleString(),yearexpense:result3[0].yearexpense.toLocaleString(),paymentype:x,amount:y,expensetype:x1,expenseamount:y1,incomebymonth:y2,invoicetype:x3,incomebytype:y3
          });

          }
    
} 



);
});
}); 
});
});
});
});
});
},
checkusr: function(req, res){
  let username = req.body.houseno;
  let password = req.body.password;
  let villagename = req.body.village_name;

  let checkpwd = "SELECT * FROM `house_info` WHERE house_no ='" + username + "' AND password ='" + password + "' AND village_name = '" + villagename +"'";
// console.log(checkpwd);
  db.query(checkpwd, (err, result) => {
    if (err) {
        return res.status(500).send(err);
    } else if (result =="") {
      
      res.render('login.ejs', {
        title: "Login"
        ,message: '!!ชื่อ username หรือ password ไม่ถูกต้อง',villagename:villagename,
    });

      } else {

        const payload = {
          id: username,
          id1: result[0].id,
          houseno:result[0].house_no,
          village:result[0].village_name,
          villageid:result[0].village_id,
          iat: new Date().getTime(),//มาจากคำว่า issued at time (สร้างเมื่อ),
          exp: new Date().getTime() + (4*60*60*1000),
       };
       const SECRET = "IDESIGN2020"; //ในการใช้งานจริง คีย์นี้ให้เก็บเป็นความลับ
    var token = jwt.encode(payload, SECRET);
          
       
        res.render('member.ejs', {
          title: "Login"
          ,message: '',houseno:result[0].house_no,villagename:result[0].village_name,custid:result[0].id,mytoken:token,villageid:result[0].village_id,
      });
      }

    //     title: "Logged in"
    //     ,status:"loggedin",storeid:result[0].store_id
    // });
  

});
},
receiptoldpayment: function(req, res){
           
  let houseid = req.body.house_no;
 
  let paymenttype = req.body.payment_type;
  let transferno = req.body.transfer_no;
  let transferdate = req.body.transfer_date;
  let receivername = req.body.receiver;
  let receiptdate = req.body.receiptdate;
  let remark = req.body.remark;
  let actualpay = req.body.actual_pay;
  let lastremain=req.body.lastremain;;
  let remain = req.body.remain;
  let token = req.body.token;
  if (lastremain == ''){
    lastremain = 0;
  } else {
    lastremain = req.body.lastremain;
  }
  var today = new Date();
  var c_date = today.getDate();
  //var c_month = today.getMonth()+1;
  var c_year = today.getFullYear();
  var c_year1 = today.getFullYear()+543;
  var c_month = ("0" + (today.getMonth() + 1)).slice(-2);
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
  var monthcode = "RE" +c_year.toString() + c_month.toString();
  var thismonth = month[today.getMonth()] + "-" + c_year1.toString() ;
  var invoiceno = "INV" +c_year.toString() + c_month.toString() + c_date.toString() + today.getSeconds().toString() + houseid.toString().split('/')[1];
  var receiptno;
  //let periodid = 0;
  let getlastrcvno = "SELECT COUNT(DISTINCT receipt_no) AS count FROM invoice_info WHERE receipt_no LIKE '" + monthcode +"%'"

  //var receiptno = "RE" +c_year.toString() + c_month.toString() + c_date.toString() + today.getSeconds().toString() + houseid.toString().split('/')[1];
  //console.log(invid);
  //console.log(getlastrcvno);
  let periodid = 0;
  db.query(getlastrcvno, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      let no = ("00" + (Number(result[0].count)+1)).slice(-3);;
      receiptno = "RE" +c_year.toString() + c_month.toString()+ no;
  let createinvoice= "INSERT INTO `invoice_info` (`invoice_no`, house_no,invoice_type,invoice_period,amount,invoice_month,payment_type,transfer_no,payment_date,receipt_date,receiver_name,receipt_no,remark,actual_pay,lastmonth,balance) VALUES ('" + 
  invoiceno +"', '" + houseid + "' , 'ค่าส่วนกลาง', '"+ periodid + "',"+ actualpay + ",'ชำระค่าส่วนกลางค้างจ่ายสะสม','"+ paymenttype + "','"+ transferno + "','" +  transferdate + "','" +  receiptdate + "','" +  receivername + "','" +  receiptno + "','" +  remark + "'," +  actualpay + "," +  lastremain + "," +  remain + " )";
    let  updatebalance = "UPDATE house_info SET remain = "+ remain + " WHERE house_no = '" + houseid + "'";
    
    //console.log(createinvoice);
 db.query(createinvoice, (err, result) => {
 if (err) {
 return res.status(500).send(err);
 }  db.query(updatebalance, (err, result1) => {
 if (err) {
   return res.status(500).send(err);
 } 
 });
 });
};

    res.redirect('/getreceiptlist3/Bearer ' + token);

  }); 
             
},

saveSlip: (req, res) => {
  let transferdate = req.body.slip_date;
  let villageid = req.body.village_id;
  let memo = req.body.details;
  let houseid = req.body.houseno;
  var today = new Date();
  var c_min = today.getMinutes();
  var c_date = today.getDate();
  var c_month = today.getMonth();
  var villagename = req.body.villagename5;
  var custid = req.body.custid5;
  let filename;
  //console.log(houseid);
if (typeof req.files.image !== "undefined"){
let uploadedFile = req.files.image;
let image_name = uploadedFile.name;

let image_name1 = uploadedFile.name.split('.')[0];

 filename = 'idesign_slip/' + "104_" +houseid.toString().split('/')[1] + "_" + c_date + c_month+ c_min;
//console.log(filename);
  if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
    //console.log("upload Failed")  
 
    uploadedFile.mv(`public/assets/images/${image_name}`, (err ) => {
      if (err) {
        //console.log("upload Failed")
          return res.status(500).send(err)          
       }
     
      
   });

   cloudinary.v2.uploader.upload(`public/assets/images/${image_name}`, {public_id: filename } ,
   function(error, result) {console.log(result, error)
    //console.log("filelink =" + result.secure_url);
    let saveslip = "INSERT INTO slip_info (house_no,memo,image_name,status) VALUES ('" + houseid + "','" + memo + "','" + result.secure_url + "','ส่ง slip แล้ว')";

    db.query(saveslip, (err, result) => {
      if (err) {
          return res.status(500).send(err);
      } else {
     
        res.render('member.ejs', {
          title: "Main Page"
          ,message:'ส่งสลิปให้นิติบุคคลเรียบร้อยแล้ว',houseno:houseid,villagename:villagename,houseid:houseid,custid:custid,villageid:villageid,mytoken:'',
      });
  
    
  }
});
});

} else {
  message = "Invalid File format. Only 'gif', 'jpg' and 'png' images are allowed.";

}



   }


},
newpassword: function(req, res){ 
  let houseno = req.body.houseno;
 console.log(houseno)
  let password = req.body.password1;
 
 
  let  updatepassword = "UPDATE house_info SET password = '" + password + "' WHERE house_no = '" + houseno +"'";
  
  

  db.query(updatepassword , (err, result) => {
    if (err ) {
      return res.status(500).send(err);
    } else {

      res.redirect('/member');

    }
  });
    
},

getinvoicesform: function(req, res){
  
  let gethouselist = "SELECT invoice_info.house_no,(DATE_FORMAT(MAX(invoice_info.invoice_date),'%d %b %Y')) AS invoicedate,FORMAT(SUM(invoice_info.amount)-house_info.remain,2) AS t_amount,invoice_info.invoice_month AS remark,invoice_info.invoice_no,house_info.owner_name,FORMAT(Abs(house_info.remain), 2) AS remain,house_info.remain AS remain1,house_info.lane_no " +  
    "FROM `invoice_info` " +
    "LEFT JOIN `house_info` " + 
    "ON invoice_info.house_no = house_info.house_no " +
    "WHERE payment_type = '' OR payment_type IS NULL " +
    "GROUP BY house_no" +
  " ORDER BY house_info.lane_no ASC";

  let getinvoicelist = "SELECT invoice_info.house_no,invoice_info.id,FORMAT(invoice_info.amount,2) AS amount1,FORMAT(SUM(invoice_info.amount),2) AS amount,GROUP_CONCAT(invoice_info.invoice_month ORDER BY invoice_info.id ASC SEPARATOR '+') AS remark,SUBSTRING_INDEX(GROUP_CONCAT(invoice_month ORDER BY invoice_info.id ASC),',',1) AS START, SUBSTRING_INDEX(GROUP_CONCAT(invoice_month ORDER BY invoice_info.id ASC),',',-1) AS END ,invoice_info.invoice_type " +  
  "FROM `invoice_info` " +
  "WHERE (payment_type = '' OR payment_type IS NULL) AND invoice_type ='ค่าส่วนกลาง' " +
  "GROUP BY house_no " +
" ORDER BY invoice_info.id DESC";
let getinvoicelist1 = "SELECT invoice_info.house_no,invoice_info.id,FORMAT(invoice_info.amount,2) AS amount1,FORMAT(SUM(invoice_info.amount),2) AS amount,GROUP_CONCAT(invoice_info.invoice_month ORDER BY invoice_info.id ASC SEPARATOR '+') AS remark,SUBSTRING_INDEX(GROUP_CONCAT(invoice_month ORDER BY invoice_info.id ASC),',',1) AS START, SUBSTRING_INDEX(GROUP_CONCAT(invoice_month ORDER BY invoice_info.id ASC),',',-1) AS END, invoice_info.invoice_type " +  
"FROM `invoice_info` " +
"WHERE (payment_type = '' OR payment_type IS NULL) AND invoice_type ='ค่าจอดรถ' " +
"GROUP BY house_no " +
" ORDER BY invoice_info.id DESC";
//console.log(gethouselist);
     db.query(gethouselist, (err, result) => {
     if (err) {
         return res.status(500).send(err);
     } else {
   
     db.query(getinvoicelist, (err, result1) => {
      if (err) {
          return res.status(500).send(err);
      } else {
        db.query(getinvoicelist1, (err, result2) => {
          if (err) {
              return res.status(500).send(err);
          } else {
      
        res.render('allinvoiceforms.ejs', {
          title: "all invoiceform"
          ,message: '',houselist:result,invoicelist:result1,invoicelist1:result2
    
        });
 
      }
      
    });
 
  }
   });
  }
      
});
  
},
getsliplist: function(req, res){
     let condition = req.params.condition;
     let getslip;
     if (condition == 0 ){
      getslip = "SELECT * , DATE_FORMAT(slip_date, '%d-%m-%Y') AS slip_date1 FROM slip_info WHERE status <> 'ออกใบเสร็จแล้ว' ORDER BY slip_date DESC ";
     } else {
      getslip = "SELECT * , DATE_FORMAT(slip_date, '%d-%m-%Y') AS slip_date1 FROM slip_info ORDER BY slip_date DESC ";

     }
              
 
//console.log(getexpense1);
  db.query(getslip, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
          
        res.render('mailbox.ejs', {
          title: "See slip list"
          ,message: '',sliplist:result,condition:condition,
        })
}
});
},
updateslipstatus: function(req, res){
  let slipid = req.body.slip_id; 
  let status = req.body.status;
  let token = req.body.token3; 
                   
  let updateslip = "UPDATE slip_info SET status = '" + status+ "' WHERE id =" + slipid;
//console.log(getexpense1);
  db.query(updateslip, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
          
        res.redirect('/getsliplist/0/Bearer ' + token);
}
});
},

 
loadincome: function(req, res){
  let period = req.body.period; 
  let startdate = req.body.start_date; 
  let enddate = req.body.end_date; 
 // console.log(period);
  var today = new Date();
  var c_date = today.getDate();
  var c_month = today.getMonth()+1;
  var c_year = today.getFullYear();
  var date1 = c_date.toString() + c_month.toString() +c_year.toString();
  var getreceiptlist1 ;
  if (period == "today") {
    getreceiptlist1 = "SELECT DATE_FORMAT(invoice_info.receipt_date , '%d-%b-%Y') AS วันที่ออกใบเสร็จ,invoice_info.receipt_no AS เลขที่ใบเสร็จรับเงิน,invoice_info.house_no AS บ้านเลขที่,house_info.owner_name AS ชื่อเจ้าบ้าน,house_info.common_fee AS ค่าส่วนกลางต่อเดือน,SUM(invoice_info.actual_pay) AS จำนวนเงินที่ชำระ,IF(SUBSTRING_INDEX(GROUP_CONCAT(invoice_info.invoice_month),',',1) <> SUBSTRING_INDEX(GROUP_CONCAT(invoice_info.invoice_month),',',-1), CONCAT(SUBSTRING_INDEX(GROUP_CONCAT(invoice_info.invoice_month ORDER BY invoice_info.id),',',1),'-',SUBSTRING_INDEX(GROUP_CONCAT(invoice_info.invoice_month ORDER BY invoice_info.id),',',-1)),CONCAT(SUBSTRING_INDEX(GROUP_CONCAT(invoice_info.invoice_month),',',1))) AS รายละเอียด,invoice_info.payment_type AS ชำระเป็น,invoice_info.transfer_no AS เลขที่การโอนหรือใบเสร็จ,DATE_FORMAT(invoice_info.payment_date, '%d-%b-%Y') AS วันที่โอน,SUM(invoice_info.balance) AS ยอดงินค้างชำระ ,CONCAT(invoice_info.remark) AS หมายเหต FROM `invoice_info` LEFT JOIN `house_info` ON invoice_info.house_no = house_info.house_no " +
    "WHERE receipt_no <>'' AND receipt_date = '" + c_year + "-" + c_month + "-" + c_date + "' GROUP BY receipt_no ORDER BY invoice_info.receipt_date"; 
  

  } else if (period == "thismonth") {
    getreceiptlist1 = "SELECT DATE_FORMAT(invoice_info.receipt_date , '%d-%b-%Y') AS วันที่ออกใบเสร็จ,invoice_info.receipt_no AS เลขที่ใบเสร็จรับเงิน,invoice_info.house_no AS บ้านเลขที่,house_info.owner_name AS ชื่อเจ้าบ้าน,house_info.common_fee AS ค่าส่วนกลางต่อเดือน,SUM(invoice_info.actual_pay) AS จำนวนเงินที่ชำระ,IF(SUBSTRING_INDEX(GROUP_CONCAT(invoice_info.invoice_month),',',1) <> SUBSTRING_INDEX(GROUP_CONCAT(invoice_info.invoice_month),',',-1), CONCAT(SUBSTRING_INDEX(GROUP_CONCAT(invoice_info.invoice_month ORDER BY invoice_info.id),',',1),'-',SUBSTRING_INDEX(GROUP_CONCAT(invoice_info.invoice_month ORDER BY invoice_info.id),',',-1)),CONCAT(SUBSTRING_INDEX(GROUP_CONCAT(invoice_info.invoice_month),',',1))) AS รายละเอียด,invoice_info.payment_type AS ชำระเป็น,invoice_info.transfer_no AS เลขที่การโอนหรือใบเสร็จ,DATE_FORMAT(invoice_info.payment_date, '%d-%b-%Y') AS วันที่โอน,SUM(invoice_info.balance) AS ยอดเงินค้างชำระ ,CONCAT(invoice_info.remark) AS หมายเหต FROM `invoice_info` LEFT JOIN `house_info` ON invoice_info.house_no = house_info.house_no " +
    "WHERE receipt_no <>'' AND Month(receipt_date) = '" + c_month +"' AND Year(receipt_date) = '"+ c_year + "' GROUP BY receipt_no ORDER BY invoice_info.receipt_date"; 
  
  } else {
 
  getreceiptlist1 = "SELECT DATE_FORMAT(invoice_info.receipt_date , '%d-%b-%Y') AS วันที่ออกใบเสร็จ,invoice_info.receipt_no AS เลขที่ใบเสร็จรับเงิน,invoice_info.house_no AS บ้านเลขที่,house_info.owner_name AS ชื่อเจ้าบ้าน,house_info.common_fee AS ค่าส่วนกลางต่อเดือน,SUM(invoice_info.actual_pay) AS จำนวนเงินที่ชำระ,IF(SUBSTRING_INDEX(GROUP_CONCAT(invoice_info.invoice_month),',',1) <> SUBSTRING_INDEX(GROUP_CONCAT(invoice_info.invoice_month),',',-1), CONCAT(SUBSTRING_INDEX(GROUP_CONCAT(invoice_info.invoice_month ORDER BY invoice_info.id),',',1),'-',SUBSTRING_INDEX(GROUP_CONCAT(invoice_info.invoice_month ORDER BY invoice_info.id),',',-1)),CONCAT(SUBSTRING_INDEX(GROUP_CONCAT(invoice_info.invoice_month),',',1))) AS รายละเอียด,invoice_info.payment_type AS ชำระเป็น,invoice_info.transfer_no AS เลขที่การโอนหรือใบเสร็จ,DATE_FORMAT(invoice_info.payment_date, '%d-%b-%Y') AS วันที่โอน,SUM(invoice_info.balance) AS ยอดเงินค้างชำระ ,CONCAT(invoice_info.remark) AS หมายเหต FROM `invoice_info` LEFT JOIN `house_info` ON invoice_info.house_no = house_info.house_no " +
  "WHERE receipt_no <>'' AND receipt_date BETWEEN '" + startdate +"' AND '"+ enddate + "' GROUP BY receipt_no ORDER BY invoice_info.receipt_date"; 
}
//console.log(getreceiptlist1);
  // send receipt report
  db.query(getreceiptlist1, (err, result1) => {
       if (err || result1 == '' ) {
        res.redirect('/report');
       } else {
         const jsonData = JSON.parse(JSON.stringify(result1));
     //console.log("jsonData", jsonData);

     const json2csvParser = new Json2csvParser({ header: true});
   const csv = json2csvParser.parse(jsonData);
   var fileName = "รายรับ_"+ date1 +".csv";
  
   
   res.attachment(fileName);
   res.send(csv);
   
 }
 
});

},
loadpending: function(req, res){
  var today = new Date();
  var c_date = today.getDate();
  var c_month = today.getMonth()+1;
  var c_year = today.getFullYear();
  var date1 = c_date.toString() + c_month.toString() +c_year.toString();
  let getpendingpayment = "SELECT HOUSE.house_no AS บ้านเลขที่,HOUSE.lane_no  AS ซอยที่,HOUSE.owner_name AS ชื่อเจ้าบ้าน,HOUSE.remain AS ยอดค้างชำระก่อนกพ63,-INVOICE.tamount AS ยอดค้างชำระหลังกพ63 ,IF(INVOICE.tamount IS NULL,HOUSE.remain,HOUSE.remain-INVOICE.tamount) AS ยอดค้างชำระรวม "+ 
  "FROM (SELECT house_info.house_no ,house_info.lane_no,house_info.owner_name,house_info.remain  FROM house_info) AS HOUSE " +
  "LEFT JOIN "+
  "(SELECT invoice_info.house_no,SUM(invoice_info.amount) AS tamount,invoice_info.payment_type FROM invoice_info WHERE invoice_info.payment_type IS NULL OR invoice_info.payment_type ='' GROUP BY invoice_info.house_no) "+
  "AS INVOICE "+
  "ON HOUSE.house_no=INVOICE.house_no" 
  
  //console.log(getpendingpayment);
  db.query(getpendingpayment, (err, result1) => {
       if (err) {
           return res.status(500).send(err);
       } else {
         const jsonData = JSON.parse(JSON.stringify(result1));
     //console.log("jsonData", jsonData);

     const json2csvParser = new Json2csvParser({ header: true});
   const csv1 = json2csvParser.parse(jsonData);
     
     var fileName = "ยอดค้างชำระ_"+ date1 +".csv";
      
   res.attachment(fileName);
   res.send(csv1);
 }
});
},
loadhouseinfo: function(req, res){
  var today = new Date();
  var c_date = today.getDate();
  var c_month = today.getMonth()+1;
  var c_year = today.getFullYear();
  var date1 = c_date.toString() + c_month.toString() +c_year.toString();
  let gethouseinfo = "SELECT house_no AS บ้านเลขที, lane_no AS ซอยที่,owner_name AS ชื่อเจ้าบ้าน, AREA AS พื้นที่, common_fee AS ค่าส่วนกลาง ,parking_qty AS จำนวนรถ, parking_fee AS ค่าจอดรถ,lock_no AS หมายเลขล็อค  FROM house_info";
 var csv;
  db.query(gethouseinfo, (err, result1) => {
       if (err) {
           return res.status(500).send(err);
       } else {
         const jsonData = JSON.parse(JSON.stringify(result1));
     //console.log("jsonData", jsonData);

     const json2csvParser = new Json2csvParser({ header: true});
   csv = json2csvParser.parse(jsonData);

res.attachment("ข้อมูลลูกบ้าน_"+ date1 +".csv");
res.send(csv);
 }
});
},

loadexpense: function(req, res){
  let startdate = req.body.start_date; 
  let enddate = req.body.end_date; 
  var today = new Date();
  var c_date = today.getDate();
  var c_month = today.getMonth()+1;
  var c_year = today.getFullYear();
  var date1 = c_date.toString() + c_month.toString() +c_year.toString();
  let getexpenseinfo = "SELECT DATE_FORMAT(expense_date, '%d-%b-%Y') AS วันที่จ่าย, expense_type AS ประเภทรายจ่าย,details AS รายการ, expense_amount AS จำนวนเงิน, payment_type AS ชำระเป็น, receive_name AS ชื่อผู้รับเงิน, expense_type AS ประเภทการชำระเงิน  FROM expense_info " +
  "WHERE expense_date BETWEEN '" + startdate +"' AND '"+ enddate + "'";
 //console.log(getexpenseinfo);
  var csv;
  db.query(getexpenseinfo, (err, result1) => {
       if (err || result1 == '') {
        res.redirect('/report');
       } else {
         const jsonData = JSON.parse(JSON.stringify(result1));
     //console.log("jsonData", jsonData);

     const json2csvParser = new Json2csvParser({ header: true});
   csv = json2csvParser.parse(jsonData);

res.attachment("ข้อมูลรายจ่าย_"+ date1 +".csv");
res.send(csv);
 }
});
},
checkadmin: function(req, res){
  let username = req.body.username;
  let password = req.body.password;
  let villagename = req.body.village_name;
  let checkpwd = "SELECT * FROM `admin` WHERE username ='" + username + "' AND password ='" + password + "' AND village_name ='" + villagename + "'" ;
 //console.log(checkpwd);
  db.query(checkpwd, (err, result) => {
    if (err) {
        return res.status(500).send(err);
    } else if (result == "" || result == null) {
     // console.log(result);
      res.render('loginadmin.ejs', {
        title: "Login"
        ,message: '!!ชื่อ username หรือ password ไม่ถูกต้อง',villagename:villagename,
    });

      } else {
        const payload = {
          id: username,
          id1: result[0].emp_id,
          role:result[0].role,
          name:result[0].name,
          village:result[0].village_name,
          iat: new Date().getTime(),//มาจากคำว่า issued at time (สร้างเมื่อ),
          exp: new Date().getTime() + (4*60*60*1000),
       };
       const SECRET = "IDESIGN2020"; //ในการใช้งานจริง คีย์นี้ให้เก็บเป็นความลับ
    var token = jwt.encode(payload, SECRET);
          token1 =token;
  empname = result[0].username;
          let getcount = "SELECT COUNT(id) AS count FROM slip_info WHERE status <> 'ออกใบเสร็จแล้ว'"
          db.query(getcount, (err, result1) => {
            if (err) {
                return res.status(500).send(err);
            } 
            else {
              
           
              let updatelogin = "INSERT INTO log_info (username,village_name) VALUES ('"+ username + "','" + villagename + "')" 
              db.query(updatelogin, (err, result2) => {
                if (err) {
                    return res.status(500).send(err);
                } 
                else {
                  console.log(updatelogin);
              res.render('mainpage.ejs', {
      title: "DoSmartVill"
      ,message: '',count1:result1[0].count,role1:result[0].role,adminname:result[0].name,empname:empname,token1:token,villagename:result[0].village_name,villageid:result[0].village_id,
    });
    console.log(result[0].role);
  };

  });
}
});
      }
});
},
todaysummary: function(req, res){
            
  let todayincome = "SELECT FORMAT(SUM(actual_pay),0) AS todayincome FROM invoice_info WHERE receipt_date = CURDATE()" ;
  let todaytransfer = "SELECT FORMAT(SUM(actual_pay),0) AS todaytransfer FROM invoice_info WHERE receipt_date = CURDATE() AND payment_type = 'เงินโอน'" ;
  let todaycash = "SELECT FORMAT(SUM(actual_pay),0) AS todaycash FROM invoice_info WHERE receipt_date = CURDATE() AND payment_type = 'เงินสด'" ; 
  let todayexpense = "SELECT FORMAT(SUM(expense_amount),0) AS todayexpense FROM expense_info WHERE expense_date = CURDATE() AND payment_type = 'เงินสด'" ; 
  let getsumpettycash = "SELECT *,SUM(petty_amount) AS petty_amount FROM pettycash_info WHERE YEAR(petty_date) = YEAR(CURDATE()) AND MONTH(petty_date) = MONTH(CURDATE())"
   //console.log(todaypettycash);
  //console.log(todaycash);
 // console.log(expensebytype);
 let thismonthpettycash;
  db.query(todayincome, (err, result) => {
    if (err) {
        return res.status(500).send(err);
    } 
    db.query(todaytransfer, (err, result1) => {
      if (err) {
          return res.status(500).send(err);
      }
      db.query(todaycash, (err, result2) => {
        if (err) {
            return res.status(500).send(err);
        }
        //console.log(result2[0].todaycash);
        db.query(todayexpense, (err, result3) => {
          if (err) {
              return res.status(500).send(err);
          } 
          db.query(getsumpettycash, (err, result5) => {
            if (err) {
                return res.status(500).send(err);
            } else{
            thismonthpettycash = Number(result5[0].petty_amount);

          let todaypettycash = "SELECT SUM(expense_amount) AS sumexpense FROM expense_info WHERE MONTH(expense_date) = MONTH(CURDATE()) AND YEAR(expense_date) = YEAR(CURDATE()) AND payment_type = 'เงินสด'" ; 
          
          db.query(todaypettycash, (err, result4) => {
            if (err) {
                return res.status(500).send(err);
            }


            var todaypettycash1,thismonthexpense1;
            if (result4[0].sumexpense == null || result4[0].sumexpense == '') {
              todaypettycash1 = thismonthpettycash;
              thismonthexpense1 = 0;
            } else {
              todaypettycash1 = thismonthpettycash - Number(result4[0].sumexpense) ;
              thismonthexpense1 = result4[0].sumexpense.toLocaleString();
            }
         // console.log("SUM EXPENSE" + Number(result4[0].sumexpense));
          res.render('dailyincome.ejs', {
            title: "Today Income"
            ,message: '',todayincome: result[0].todayincome,todaytransfer: result1[0].todaytransfer,todaycash:result2[0].todaycash,thismonthpettycash:thismonthpettycash.toLocaleString(),todayexpense: result3[0].todayexpense,todaypettycash: todaypettycash1.toLocaleString(),thismonthexpense:thismonthexpense1,
        });

        });
      }
    });
      });
      });
    });
  });
},
getparkinglist: function(req, res){
  let getparkinglist = "SELECT * FROM parking_info"
  db.query(getparkinglist, (err, result) => {
    if (err) {
        return res.status(500).send(err);
    } else {
      //console.log(result);
     res.render('parkinglist.ejs', {
         title: "Main Page"
         ,message: '',parkinglist:result
     });

    }

 });
}, 
loadparkingfeeinfo: function(req, res){
  var today = new Date();
  var c_date = today.getDate();
  var c_month = today.getMonth()+1;
  var c_year = today.getFullYear();
  var date1 = c_date.toString() + c_month.toString() +c_year.toString();
  let getparkingfee = "SELECT DATE_FORMAT(receipt_date, '%d-%b-%Y') AS 'วันที่ออกใบเสร็จ', house_no AS 'บ้านเลขที่', CONCAT('ค่าจอดรถ เดือน', invoice_month)  AS 'รายละเอียด', amount AS 'จำนวน', payment_type AS 'ชำระเป็น',DATE_FORMAT(payment_date, '%d-%b-%Y') AS 'วันที่โอน', IF(payment_date IS null,'ยังไม่ชำระ','ชำระแล้ว') AS สถานะ FROM invoice_info WHERE invoice_type ='ค่าจอดรถ' ";
 var csv;
  db.query(getparkingfee, (err, result1) => {
       if (err) {
           return res.status(500).send(err);
       } else {
         const jsonData = JSON.parse(JSON.stringify(result1));
     //console.log("jsonData", jsonData);

     const json2csvParser = new Json2csvParser({ header: true});
   csv = json2csvParser.parse(jsonData);

res.attachment("ข้อมูลค่าจอดรถ_"+ date1 +".csv");
res.send(csv);
 }
});
},
getvotelist: function(req, res){
  let gethouselist = "SELECT *,DATE_FORMAT(vote_date, '%d-%m-%Y') AS vote_date,DATE_FORMAT(close_date, '%d-%m-%Y') AS close_date FROM vote_info"
  db.query(gethouselist, (err, result) => {
    if (err) {
        return res.status(500).send(err);
    } else {
      //console.log(result);
     res.render('votelist.ejs', {
         title: "Main Page"
         ,message: '',votelist:result
     });

    }

 });
},
getcontactlist: function(req, res){
  let getcontactlist = "SELECT * FROM contact_info"
  db.query(getcontactlist, (err, result) => {
    if (err) {
        return res.status(500).send(err);
    } else {
      //console.log(result);
     res.render('contact1.ejs', {
         title: "List of Contact"
         ,message: '', contactlist:result,
     });

    }

 });
},
addcontact: function(req, res){
  let contactname = req.body.contact_name;
  let contactno = req.body.contact_no;
  let villageno = req.body.village_id;
  let saveexpense1 = "INSERT INTO `contact_info` (village_id, contact_name,contact_no) VALUES (" + villageno + " , '" + contactname + "', '" + contactno + "')" ;
// console.log(saveexpense1);
  db.query(saveexpense1, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
          
        res.redirect('/getcontactlist');
}
});
},
updatecontact: function(req, res){
  let contactname = req.body.contact_name1;
  let contactno = req.body.contact_no1;
  let contactid = req.body.contact_id;
                  
  let updatecontact = "UPDATE `contact_info` SET contact_name = '" + contactname + "', contact_no = '"  + contactno + "' WHERE id =" + contactid ;
// console.log(saveexpense1);
  db.query(updatecontact, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
          
        res.redirect('/getcontactlist');
}
});
},
deletecontact: function(req, res){

  let contactid = req.body.contact_id1;

  let deletecontact = "DELETE FROM `contact_info` WHERE id =" + contactid ;
// console.log(saveexpense1);
  db.query(deletecontact, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
          
        res.redirect('/getcontactlist');
}
});
},
getnewslist: function(req, res){
  let getnewslist = "SELECT *,DATE_FORMAT(post_date, '%d-%m-%Y') AS post_date,DATE_FORMAT(post_date, '%Y-%m-%d') AS post_date1,DATE_FORMAT(expired_date, '%Y-%m-%d') AS expired_date1 FROM news_info ORDER BY news_id DESC"
  db.query(getnewslist, (err, result) => {
    if (err) {
        return res.status(500).send(err);
    } else {
      //console.log(result);

    
     res.render('news1.ejs', {
         title: "List of News"
         ,message: '', newslist:result,
     });

    }

 });
},
addnews: function(req, res){
  let posttype = req.body.post_type;
  let posttopic = req.body.topic_name;
  let postdate = req.body.post_date;
  let expirydate = req.body.expiry_date;
  let details = req.body.post_details;
  let villageno = req.body.village_id1;
  var today = new Date();
  var date1 = today.getDate();
  var minute = today.getMinutes();
  var sec = today.getSeconds();

  let filelink;
    let filename,filename1;
    //console.log(req.files);
    //console.log(slipdate1);
  if (typeof req.files.image !== "undefined"){
  let uploadedFile = req.files.image;
  let image_name = uploadedFile.name;
  
  let filetype = uploadedFile.name.split('.')[1];
  //console.log(image_name);
  filename = 'image_news/' + "news_" + villageno +date1+ minute +sec ;
   filename1 =  filename + "." + filetype;
  //console.log(filename1);
    if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
      //console.log("upload Failed")  
   
      uploadedFile.mv(`public/assets/images/${image_name}`, (err ) => {
        if (err) {
          //console.log("upload Failed")
            return res.status(500).send(err)          
         }
       
        
     });
    
     cloudinary.v2.uploader.upload(`public/assets/images/${image_name}`, {public_id: filename } ,
     function(error, result) {console.log(result, error);
      
      
     
      let addNews = "INSERT INTO `news_info` (village_id, post_type,news_topic,news_details,post_date,expired_date,image_name) VALUES (" + villageno + ", '" + posttype +"' , '" + posttopic  + "' , '" + details  + "' , '" + postdate  + "' , '" + expirydate  + "' , '" + result.secure_url + "')" ;
  //console.log(addNews);
  

  db.query(addNews, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
          
        res.redirect('/getnewslist');
}
});
    });
    }
  } else {
    message = "Invalid File format. Only 'gif', 'jpg' and 'png' images are allowed.";
  
  }
 

  
},
updatenews: function(req, res){
  let posttype = req.body.post_type1;
  let posttopic = req.body.topic_name1;
  let postdate = req.body.post_date1;
  let expirydate = req.body.expiry_date1;
  let details = req.body.post_details1;
  let newsid = req.body.news_id1;
  var today = new Date();
  var minute = today.getMinutes();
                  
  let updatenews = "UPDATE `news_info` SET post_type = '" + posttype + "', news_topic = '"  + posttopic + "', post_date = '"  + postdate + "', expired_date = '"  + expirydate + "', news_details = '"  + details  + "' WHERE news_id =" + newsid ;
// console.log(saveexpense1);
  db.query(updatenews, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
          
        res.redirect('/getnewslist');
}
});
},
deletenews: function(req, res){

  let newsid = req.body.news_id1;

  let deletenews = "DELETE FROM `news_info` WHERE news_id =" + newsid ;
// console.log(saveexpense1);
  db.query(deletenews, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
          
        res.redirect('/getnewslist');
}
});
},
getalert: function(req, res){

  function GetFormattedDate(date1) {
   var todayTime = new Date(date1);
   var month = todayTime.getMonth() + 1;
   var day = todayTime.getDate();
   if (month < 10) {
     month = '0' + month;
   } 
   if (day < 10) {
     day = '0' + day;
   } 
   var year = todayTime.getFullYear();
   return year + "-" + month + "-" + day;
}
let today1 = GetFormattedDate(new Date());
 let todayslip = "SELECT COUNT(id) AS nopendingslip FROM slip_info WHERE status <> 'ออกใบเสร็จแล้ว'";
 let todayfeedback = "SELECT COUNT(comment_id) AS nofeedback FROM comment_info WHERE status = 'รอการตรวจสอบ'";    
 //console.log(todaypost);
                       let jsonData = [];
                       db.query(todayslip, (err, result) => {
                         //console.log(result);
                           if (err ) {
                               return res.status(500).send(err);
                           } else {
                            db.query(todayfeedback, (err, result1) => {
                              //console.log(result);
                                if (err ) {
                                    return res.status(500).send(err);
                                } else { 
                           
                             jsonData[0] = JSON.parse(JSON.stringify(result));
                             jsonData[1] = JSON.parse(JSON.stringify(result1));
                          
                             res.setHeader('Content-Type', 'application/json');
                             res.send(JSON.stringify(jsonData));
                             
                        
                     }
 
                   });
                  }
 
                });
                       
},
getcarlist: function(req, res){
  let getcarlist = "SELECT * FROM house_info"
  db.query(getcarlist, (err, result) => {
    if (err) {
        return res.status(500).send(err);
    } else {
      //console.log(result);
     res.render('carlist.ejs', {
         title: "Car List"
         ,message: '',carlist:result
     });

    }

 });
},
updatecar: function(req, res){
  let houseid = req.body.house_id;
  let carno1 = req.body.car_no1;
  let carno2 = req.body.car_no2;
  let carno3 = req.body.car_no2;
                  
  let updatecar = "UPDATE `house_info` SET car_no1 = '" + carno1 + "', car_no2 = '"  + carno2+ "', car_no3 = '"  + carno3 + "' WHERE id =" + houseid ;
// console.log(saveexpense1);
  db.query(updatecar, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
          
        res.redirect('/getcarlist');
}
});
},
cancelreceipt: function(req, res){
  
  let lastmonth = req.body.prev_month;
  let receiptid = req.body.receipt_id;
  let houseno = req.body.homeno;
  let rcvno = req.body.receipt_no;
  let paymenttype = req.body.payment_type;
  let ownername = req.body.ownername;
  let voidreason = req.body.void_reason;
  let tamount= Number(req.body.amount);
  let token = req.body.token;
 // console.log(rcvno);
  //console.log(houseno);
  let savevoidinfo = "INSERT INTO `void_info` (receipt_no,house_no,owner_name,void_amount,payment_type,void_reason) VALUES ('" + rcvno + "', '" + houseno +"' , '" + ownername  + "' , " + tamount  + " , '" + paymenttype +"' , '" + voidreason  + "')" ;
 // console.log(savevoidinfo);
  let cancelreceipt = "UPDATE `invoice_info` SET payment_type='',transfer_no='',payment_date='',receipt_date='',receiver_name='',remark='',actual_pay = 0,balance=0,lastmonth=0 WHERE receipt_no ='" + rcvno +"'";
  //console.log(cancelreceipt);

  db.query(savevoidinfo, (err, result0) => {
    if (err) {
      return res.status(500).send(err);
    } else {
  db.query(cancelreceipt, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        let rollbackhouseinfo = "UPDATE `house_info` SET remain = '"+ lastmonth +  "' WHERE house_no ='" + houseno +"'";
        //console.log(rollbackhouseinfo);
        db.query(rollbackhouseinfo, (err, result1) => {
          if (err) {
            return res.status(500).send(err);
          } else {
        res.redirect('/getreceiptlist3/Bearer ' + token);
}
});
}
});
}
});
},
getvoidreceipt: function(req, res){
    
  let getvoidreceipt = "SELECT *,DATE_FORMAT(void_date, '%d-%m-%Y') AS void_date,FORMAT(void_amount,-2) AS void_amount from void_info"
 //console.log(getreceiptlist);
      var today = new Date();
      //var c_month = today.getMonth()+1;
      var c_year = today.getFullYear()+543;
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
      var n = month[today.getMonth()] + "-" + c_year.toString() ;
   db.query(getvoidreceipt, (err, result) => {
     if (err) {
         return res.status(500).send(err);
     } else {
      // console.log(result);
      res.render('voidlist.ejs', {
          title: "Main Page"
          ,message: 'ออกใบแจ้งหนี้เดือนนี้ไปแล้ว ออกซ้ำ',receiptlist:result, monthyear:n
      });
     }
  });
},
comment: function(req, res){
          
  res.render('comments.ejs', {
    title: "Send comment"
    ,message: ''
});
},
sendcomment: (req, res) => {
  let topic = req.body.comment_topic;
  let memo = req.body.details;
  let houseid = req.body.houseno;
  let custid = req.body.cust_id;

 
let savecomment = "INSERT INTO comment_info (cust_id,house_no,comment_topic,comment_details,status) VALUES ("+ custid + ",'" + houseid + "','" + topic + "','" + memo + "','รอการตรวจสอบ')";

 db.query(savecomment, (err, result) => {
   if (err) {
       return res.status(500).send(err);
   } else {
  
    res.redirect('/member');

   }
 });

},
getcommentlist: function(req, res){
     
              
  let getcommentlist = "SELECT * , DATE_FORMAT(comment_date, '%d-%m-%Y') AS comment_date FROM comment_info ORDER BY comment_id DESC ";
//console.log(getexpense1);
  db.query(getcommentlist, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
          
        res.render('commentlist.ejs', {
          title: "See slip list"
          ,message: '',commentlist:result
        })
}
});
},

clearadvanceinv : function(req, res){
  let villageid = req.body.village_id;
  let houseno = req.body.house_no;
  let lastestperiodid = Number(req.body.period_id);
  var today = new Date();
  
  var c_month = today.getMonth()+1;
  var c_year = today.getFullYear();

  let getperiod = "SELECT period_id,period_mo,status  FROM `invoice_period` WHERE MONTH(period_mo) ='" + c_month + "' AND YEAR(period_mo) ='"+ c_year +"'";
  
 //console.log(getperiod);
db.query(getperiod, (err, result1) => {
  if (err) {
    return res.status(500).send(err);
  } else {
    let countinvtodelete = "SELECT COUNT(DISTINCT invoice_period) AS counttodelete FROM `invoice_info` WHERE village_id =" + villageid + " AND house_no ='" + houseno +"' AND invoice_period >  "+ result1[0].period_id + " AND (payment_type = '' OR payment_type IS null)" ;
    //console.log(countinvtodelete);
  db.query(countinvtodelete, (err, result0) => {
      if (err) {
        return res.status(500).send(err);
      } else {

    let deleteadvinv = "DELETE FROM `invoice_info` WHERE village_id =" + villageid + " AND house_no ='" + houseno +"' AND invoice_period >  "+ result1[0].period_id + " AND (payment_type = '' OR payment_type IS null)" ;
    //console.log(deleteadvinv);
  db.query(deleteadvinv, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        let updateperiod;
        //console.log("delete ")
         if (lastestperiodid > Number(result1[0].period_id)){
           lastestperiodid = lastestperiodid - Number(result0[0].counttodelete);
          updateperiod = "UPDATE house_info SET  invoice_period =  "+ lastestperiodid + " WHERE village_id =" + villageid + " AND house_no ='" + houseno + "'";
       
         } else {
          updateperiod = "UPDATE house_info SET  invoice_period =  "+ result1[0].period_id + " WHERE village_id =" + villageid + " AND house_no ='" + houseno + "'";
      
         }
         db.query(updateperiod, (err, result2) => {
          if (err) {
            return res.status(500).send(err);
          } else {
        res.redirect('/invoiceform/'+houseno);
}
});
}
});
}
});
}
});
},
getnewslist1: function(req, res){
     
              
  let getnewslist = "SELECT *  FROM news_info ORDER BY news_id DESC";
//console.log(getexpense1);
let jsonData;
  db.query(getnewslist, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
          
        jsonData = JSON.parse(JSON.stringify(result));
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(jsonData));
      }
});
},
addpettycash: function(req, res){
  let pettycashamount = req.body.petty_amount;
  let adminname = req.body.admin_name;
  let villageno = req.body.village_id;
  let addpettycash = "INSERT INTO `pettycash_info` (village_id,petty_amount,admin_name) VALUES (" + villageno + " , " + pettycashamount + ", '" + adminname + "')" ;
// console.log(saveexpense1);
  db.query(addpettycash, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
          
        res.redirect('/todaysummary');
}
});
},
createletter: function(req, res){
 
  res.render('followupletter.ejs', {
    title: "Contact Admin Page"
    ,message: '',ownername:'',landno:'',houseno:'',area:'',letterno:'',finepercent:'',expirydate:'',totaltopay:'',fineamount:'',totaltext:'',totalwithfine:'',
});
},
updatecommentstatus: function(req, res){
  let commentid = req.body.comment_id; 
  let status = req.body.comment_status;    
  let remark = req.body.remark;                   
  let updatecomment = "UPDATE comment_info SET status = '" + status+ "',remark ='"+ remark + "' WHERE comment_id = " + commentid;
//console.log(getexpense1);
  db.query(updatecomment, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
          
        res.redirect('/getcommentlist');
}
});
},
getmycommentlist: function(req, res){
  let custid = req.params.cust_id;
  let getreceiptlist = "SELECT *,DATE_FORMAT(comment_date, '%d-%m-%Y') AS comment_date From comment_info WHERE cust_id = " + custid + " ORDER BY comment_id DESC";  
 //console.log(getreceiptlist);
 
   db.query(getreceiptlist, (err, result) => {
     if (err) {
         return res.status(500).send(err);
     } else {
       //console.log(result);
      res.render('mycommentstatus.ejs', {
          title: "My Comment List"
          ,message: '',mycommentlist:result,
      });

     }

  });
},
getinfoletter: function(req, res){
 
  let houseno = req.body.house_no;
  let villageno = req.body.village_no;
  let letterno = req.body.letter_no;
  let landno = req.body.land_no;
  let finepercent = Number(req.body.fine_percent);
  let expirydate = req.body.expiry_date;
 
 // let houseid = req.params.house_no;
  //console.log(houseid);
  let getownername1 = "SELECT *  FROM `house_info` WHERE house_no ='" + houseno + "' AND village_id = " + villageno;
  let getsumbalance = "SELECT SUM(amount) AS remain FROM invoice_info WHERE house_no ='" + houseno + "' AND village_id = " + villageno + " AND (payment_type IS NULL OR payment_type = '') ";
  db.query(getownername1, (err, result) => {
    //console.log(getsumbalance);
      if (err || result == "") {
        return res.status(500).send(err);
      } 
      db.query(getsumbalance, (err, result1) => {
        //console.log(result);
          if (err || result1 == "") {
            return res.status(500).send(err);
          } 


          let totaltopay = Math.abs(Number(result[0].remain)) + Math.abs(Number(result1[0].remain));
          
          let fineamount = totaltopay*finepercent/100;

          let totalwithfine = totaltopay + fineamount;

         let totalwithfine1 = totalwithfine.toFixed(2);

          let totaltext = THBText(totalwithfine1);
           
         // console.log(totaltext); 
    
 res.render('followupletter.ejs', {
    title: "followupletter"
    ,message: '',ownername:result[0].owner_name,landno:landno,houseno:houseno,area:result[0].area,finepercent:finepercent,totaltopay:totaltopay.toLocaleString(undefined, {minimumFractionDigits: 2}),totaltext:totaltext,expirydate:expirydate,fineamount:fineamount.toLocaleString(undefined, {minimumFractionDigits: 2}),totalwithfine:totalwithfine.toLocaleString(undefined, {minimumFractionDigits: 2}),letterno:letterno,
});
 });
 
});

},
getmycommentlist1: function(req, res){
  let custid = req.params.cust_id;
  let getreceiptlist = "SELECT *,DATE_FORMAT(comment_date, '%d-%m-%Y') AS comment_date From comment_info WHERE cust_id = " + custid + " ORDER BY comment_id DESC";  
 //console.log(getreceiptlist);
 
   db.query(getreceiptlist, (err, result) => {
     if (err) {
         return res.status(500).send(err);
     } else {
       //console.log(result);
      let jsonData = JSON.parse(JSON.stringify(result));
       res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(jsonData));
                             

     }

  });
},
changeadminpassword: function(req, res){
  let username  = req.body.user_name1;
   let password = req.body.password1;
   let villageid = req.body.village_id1;
   let updateadminpassword = "UPDATE admin SET password = '"+ password +"' WHERE username = '" + username + "' AND village_id = " + villageid ;                       
   //console.log(updateuserinfo);
       db.query(updateadminpassword, (err, result) => {
         //console.log(result);
           if (err || result == "") {
               return res.status(500).send(err);
           } else { 
             res.redirect('/');
         }

       });


},
getparcellist: function(req, res){
  let status = req.params.status;
  let getparcellist;
  if (status == 'pending'){
    getparcellist = "SELECT * , DATE_FORMAT(rcv_date, '%d-%m-%Y') AS rcv_date, DATE_FORMAT(pickup_date, '%d-%m-%Y') AS pickup_date FROM package_info WHERE status = 'pending' ORDER BY id DESC ";

  } else {
    getparcellist = "SELECT * , DATE_FORMAT(rcv_date, '%d-%m-%Y') AS rcv_date, DATE_FORMAT(pickup_date, '%d-%m-%Y') AS pickup_date FROM package_info WHERE status = 'completed' ORDER BY id DESC ";

  }
 //console.log(getexpense1);
  db.query(getparcellist, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
          
        res.render('parcellist.ejs', {
          title: "See slip list"
          ,message: '',parcellist:result,status:status,
        })
}
});
},
updateparcelstatus: function(req, res){
  let parcelid = req.body.parcel_id; 
  let houseno = req.body.house_no;    
  let details = req.body.parcel_detail;
  let status = req.body.status;
  let remark = req.body.remark;                   
  let updateparcel = "UPDATE package_info SET house_no = '" + houseno+ "',package_details ='"+ details + "',status = '" + status +"',remark = '"+ remark +  "' WHERE id = " + parcelid;
console.log(updateparcel);
  db.query(updateparcel, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
          
        res.redirect('/getparcellist/pending');
}
});
},
addparcel: function(req, res){
  let villagename = req.body.village_name;
  let houseno = "104/" + req.body.house_no;    
  let details = req.body.parcel_detail;
 
 let getcustid = "SELECT * FROM house_info WHERE village_name = '"+ villagename + "' AND house_no ='" +houseno + "'";
 
//console.log(addnewparcel);
  db.query(getcustid, (err, result0) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        let addnewparcel = "INSERT INTO `package_info` (village_name,house_no,cust_id,package_details,status) VALUES ('" + villagename + "','" + houseno + "',"+ result0[0].id +" , '" + details + "','pending')" ;
        //console.log(addnewparcel);
        db.query(addnewparcel, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          } else {
          
        res.redirect('/' +villagename +"/pendingparcel");
}
});
}
});
},
pendingparcel: function(req, res){
let villagename = req.params.villagename;
          
  res.render('pendingparcel.ejs', {
    title: "Pending Parcel"
    ,message: '',villagename:villagename,
});
},
newparcel: function(req, res){
  let villagename = req.params.villagename;
            
    res.render('newparcel.ejs', {
      title: "Pending Parcel"
      ,message: '',villagename:villagename,
  });
  },
getpendingparcel: function(req, res){
 
  let villagename = req.params.villagename;
    let  getparcellist = "SELECT * , DATE_FORMAT(rcv_date, '%d-%m-%Y') AS rcv_date FROM package_info WHERE status = 'pending' AND village_name ='"+ villagename +"'GROUP BY house_no ORDER BY id DESC ";
   
   //console.log(getexpense1);
    db.query(getparcellist, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        } else {
          let jsonData = [];
          jsonData[0] = JSON.parse(JSON.stringify(result));               
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(jsonData));
          
  }
  });
  },
  getpendingbyhouse: function(req, res){
 
    let villagename = req.params.villagename;
    let houseno = req.params.houseno + "/" + req.params.houseno1;
      let  getparcellist = "SELECT * , DATE_FORMAT(rcv_date, '%d-%m-%Y') AS rcv_date FROM package_info WHERE status = 'pending' AND village_name ='"+ villagename + "' AND house_no ='"+ houseno +"' ORDER BY id DESC ";
     
     //console.log(getparcellist);
      db.query(getparcellist, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          } else {
            let jsonData = [];
            jsonData[0] = JSON.parse(JSON.stringify(result));               
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(jsonData));
            
    }
    });
    },
updatepickup: function(req, res){
    let houseid = req.body.house_no3; 
    let villagename = req.body.village_name1; 
    let pickupname = req.body.rcv_name;                    
    let updateparcel = "UPDATE package_info SET status = 'completed', pickup_name ='"+ pickupname +"' WHERE house_no = '" + houseid + "' AND village_name ='"+ villagename + "' AND status ='pending'";
  //console.log(updateparcel);
    db.query(updateparcel, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        } else {
            
          res.redirect('/'+ villagename +"/pendingparcel");
  }
  });
  },
getuseralert: function(req, res){
    let custid = req.params.cust_id;
    let houseno = "104/" + req.params.house_no;
    let villageid = req.params.village_id;
    function GetFormattedDate(date1) {
     var todayTime = new Date(date1);
     var month = todayTime.getMonth() + 1;
     var day = todayTime.getDate();
     if (month < 10) {
       month = '0' + month;
     } 
     if (day < 10) {
       day = '0' + day;
     } 
     var year = todayTime.getFullYear();
     return year + "-" + month + "-" + day;
  }
  let today1 = GetFormattedDate(new Date());
   let pendingpackage = "SELECT COUNT(package_details) AS nopendingparcel FROM package_info WHERE status = 'pending' AND cust_id = "+ custid;
   let todaynews = "SELECT COUNT(news_id) AS noofnews FROM news_info WHERE post_date <= '" + today1 + "' AND post_date >= DATE_ADD('"+ today1 +"', INTERVAL -3 DAY) AND village_id = " + villageid ;    
   let checkslip = "SELECT COUNT(id) AS slipalert FROM slip_info WHERE slip_date <= '" + today1 + "' AND status = 'ส่ง slip แล้ว' AND house_no = '"+ houseno + "'" ;    
   let checkreceipt = "SELECT COUNT(id) AS receiptalert FROM invoice_info WHERE receipt_date = '" + today1 + "' AND village_id = " + villageid + " AND house_no = '" + houseno + "'" ;    
  // console.log(checkslip);
  // console.log(checkreceipt);                  
   //console.log(pendingpackage);
                         let jsonData = [];
                        
                         db.query(pendingpackage, (err, result) => {
                           console.log(result);
                             if (err ) {
                                 return res.status(500).send(err);
                             } else {
                               
                              db.query(todaynews, (err, result1) => {
                                //console.log(result);
                                  if (err ) {
                                      return res.status(500).send(err);
                                  } else { 
                                      
                                    db.query(checkslip, (err, result2) => {
                                      //console.log(result);
                                        if (err ) {
                                            return res.status(500).send(err);
                                        } else { 
                                          db.query(checkreceipt, (err, result3) => {
                                            //console.log(result);
                                              if (err ) {
                                                  return res.status(500).send(err);
                                              } else { 
                             
                               jsonData[0] = JSON.parse(JSON.stringify(result));
                               jsonData[1] = JSON.parse(JSON.stringify(result1));
                               jsonData[2] = JSON.parse(JSON.stringify(result2));
                               jsonData[3] = JSON.parse(JSON.stringify(result3));
                               res.setHeader('Content-Type', 'application/json');
                               res.send(JSON.stringify(jsonData));
                               
                            
                       }
   
                     });
                    }
   
                  });
                }
   
              });
                    }
   
                  });
                         
  },
listparcel: function(req, res){
                
      res.render('listparcelreact.ejs', {
        title: "Pending Parcel"
        ,message: '',
    });
    },
otherinvoice: function(req, res){
      
  res.render('otherinvoice.ejs', {
    title: "Other Invoice"
    ,message: ''
});
},
issueotherinvoice: function(req, res){         
        
      let token =req.body.token;
      let amount = req.body.income_amount;
       let issuename = req.body.issue_name;
       let payername = req.body.payer_name;
      let details = req.body.details;
     
      let villageid = req.body.village_id;
      var today = new Date();
      var c_date = today.getDate();
      var c_month = ("0" + (today.getMonth() + 1)).slice(-2);
      //console.log(houseno);
      var c_year = today.getFullYear();
     // var c_year1 = today.getFullYear()+543;
      var invoiceno = "INV" +c_year.toString() + c_month.toString() + c_date.toString() + today.getSeconds().toString();
      var monthcode = "RE" +c_year.toString() + c_month.toString();
//console.log(invid);
    var receiptno;
    let periodid = 0;
    let getlastrcvno = " SELECT COUNT(DISTINCT receipt_no) AS count FROM (SELECT receipt_no FROM invoice_info WHERE receipt_no LIKE '" + monthcode +"%' UNION SELECT receipt_no FROM void_info WHERE receipt_no LIKE '"+monthcode +"%') AS TABLE1" 
    var createinvoice;
      //console.log(c_month);
    //console.log(getlastrcvno);
    db.query(getlastrcvno, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        let no = ("00" + (Number(result[0].count)+1)).slice(-3);;
        receiptno = "RE" +c_year.toString() + c_month.toString()+ no;
        //console.log(receiptno);
        createinvoice= "INSERT INTO `invoice_info` (`village_id`,`invoice_no`, house_no,invoice_type,invoice_period,amount,invoice_month,receiver_name,remark) VALUES (" + 
    +villageid + ",'"+invoiceno +"','"+ "104/XX" +"' , '"+ "รายได้อื่นๆ" +"','"+ 0 + "',"+ amount + ",'" + payername + "','" +  issuename + "','"+ details + "')";
    console.log(createinvoice);
    db.query(createinvoice, (err, result) => {
              if (err) {
                return res.status(500).send(err);
             } else {
              res.redirect('/getinvoicelist1/Bearer ' + token);
             }
      });
    }
    });

    
    //let saveincome1 = "INSERT INTO `income_info` ( income_date,income_amount,payer_name,receiver_name,details,receipt_type) VALUES ('" + incomedate + "' , " + amount + ", '" + payername + "' ,'" + rcvname + "','" + detail + "','" + receipttype + "')" ;
   //console.log(saveexpense1);
  //     db.query(saveincome1, (err, result) => {
  //         if (err) {
  //           return res.status(500).send(err);
  //         } else {
  //           receiptno = "RE" +c_year.toString() + c_month.toString();
  //           res.redirect('/getincomelist');
  // }
  //   });
    },
  getinvoicelist1: function(req, res){
    
      let getinvoicelist = "SELECT invoice_info.invoice_no,invoice_info.house_no,invoice_info.id,ROUND(SUM(invoice_info.amount),2) AS t_amount,invoice_info.invoice_month AS remark,invoice_info.payment_type,house_info.owner_name " +  
      "FROM `invoice_info` " +
      "LEFT JOIN `house_info` " + 
      "ON invoice_info.house_no = house_info.house_no " +
      "WHERE payment_type = '' OR payment_type IS NULL AND invoice_info.invoice_period = 0 " +
      "GROUP BY house_no" +
    " ORDER BY invoice_info.id DESC";
      //console.log(getinvoicelist);
          var today = new Date();
          //var c_month = today.getMonth()+1;
          var c_year = today.getFullYear()+543;
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
        
          var n = month[today.getMonth()] + "-" + c_year.toString() ;
       db.query(getinvoicelist, (err, result) => {
         if (err) {
             return res.status(500).send(err);
         } else {
           //console.log(result);
          res.render('invoicelist1.ejs', {
              title: "Main Page"
              ,message: 'ออกใบแจ้งหนี้เดือนนี้ไปแล้ว ออกซ้ำ',invoicelist:result, monthyear:n
          });
  
         }
  
      });
    },
}
