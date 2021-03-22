const express = require('express');
//ทำการสร้าง Instance ของ express และสร้างตัวแปร app ขึ้นมาเพื่อรับค่า

const app = express();
const mysql = require('mysql');

const bodyParser = require('body-parser');
const http = require('http').createServer(app);

const db = mysql.createConnection ({
    host: 'ijj1btjwrd3b7932.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      user: 'ghwr2m49z94xqrt3',
      password: 'qp0lr9wyokjzsg7k',
      database: 'me0wpspgmbwzlkyn'
  });
  db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;
app.set('views', __dirname + '/views/'); // set express to look in this folder to render our view
  
  app.set('view engine', 'ejs');
  app.use(express.static('public/'));
  
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(bodyParser.json()); // parse form data client
 

   //สร้างตัวแปร PORT ขึ้นมารับค่า port ในกรณีที่เราได้กำหนดไว้ใน environment ของเครื่อง
//แต่ถ้าไม่ได้กำหนดไว้ เราจะใช้ค่า 8080 แทน
const PORT = process.env.PORT || 7000

const {index,issuereceipt,getreceiptlist,receiptform,getrcpowner,advanceinvoice,getownername,getinvoicelist,invoiceform,getsliplist,updateslipstatus,getinvoicesform} = require("./")
const {getallreceiptlist,oldcommonfee,income,getreceiptlist1,receiptform1,expense,getexpenselist,incomeexpense,todaysummary,pendingpayment,gethouselist,gethouseinfo} = require("./")
const {loadincome,loadexpense,loadpending,loadhouseinfo,updatehouseinfo,createadvanceinvoice,saveexpense,saveincome,saveSlip,checkadmin,receiptpayment,createinvoice1month,getrcpowner1} = require("./")
const {receiptoldpayment,contact,memberpage,loginadmin,login,checkusr,news,uploadslip,getmyreceiptlist,incomeexpense1} = require("./")

app.get('/', index);
app.get('/getreceiptlist', getreceiptlist);
app.get('/issuereceipt', issuereceipt);
app.get('/receiptform/104/:house_no/:receiptno', receiptform);
app.get('/getrcpowner/104/:house_no',getrcpowner);
app.get('/advanceinvoice', advanceinvoice);
app.get('/getownername/104/:house_no', getownername);
app.get('/getinvoicelist', getinvoicelist);
app.get('/invoiceform/104/:house_no', invoiceform);
app.get('/getsliplist', getsliplist);
app.post('/updateslipstatus',updateslipstatus);
app.get('/getallinvoice', getinvoicesform);
app.get('/getallreceiptlist', getallreceiptlist);
app.get('/oldcommonfee', oldcommonfee);
app.get('/income', income);
app.get('/getreceiptlist1', getreceiptlist1);
app.get('/receiptform1/104/:house_no/:receiptno', receiptform1);
app.get('/expense', expense);
app.get('/getexpenselist', getexpenselist);
app.get('/incomeexpense', incomeexpense);
app.get('/todaysummary', todaysummary);
app.get('/pendingpayment', pendingpayment);
app.get('/gethouselist', gethouselist);
app.get('/gethouseinfo/104/:house_no', gethouseinfo);
app.post('/loadexpense',loadexpense);
app.post('/loadincome',loadincome);
app.get('/loadpending',loadpending);
app.get('/loadhouseinfo',loadhouseinfo);
app.post('/updatehouseinfo',updatehouseinfo);
app.post('/createadvinv',createadvanceinvoice);
app.post('/saveexpense',saveexpense);
app.post('/saveincome',saveincome); 
app.post('/saveslip',saveSlip);
app.post('/checkadmin',checkadmin);
app.post('/receiptpayment',receiptpayment); 
app.get('/create1moinv', createinvoice1month);
app.get('/getrcp1/104/:house_no',getrcpowner1);
app.post('/receiptoldpayment',receiptoldpayment);
app.get('/contact', contact);
app.get('/member', memberpage);
app.get('/loginadmin', loginadmin);
// For User
app.get('/login', login);
app.post('/checkuser',checkusr);
app.get('/post', news);
app.get('/uploadslip', uploadslip);
app.get('/getmyreceiptlist/104/:house_no', getmyreceiptlist);
app.get('/incomeexpense1', incomeexpense1);

//const PORT1 = process.env.PORT || 3000;
//http.listen(app.get('port'));
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`)
   });
//ทำการ export app ที่เราสร้างขึ้น เพื่อให้สามารถนำไปใช้งานใน project อื่นๆ 
//เปรียบเสมือนเป็น module ตัวนึง
module.exports = app