const express = require('express');
//ทำการสร้าง Instance ของ express และสร้างตัวแปร app ขึ้นมาเพื่อรับค่า

const app = express();
const mysql = require('mysql');

const bodyParser = require('body-parser');
const http = require('http').createServer(app);

const db = mysql.createConnection ({
    host: 'pfw0ltdr46khxib3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      user: 'h0fh806wbn807e8o',
      password: 'ghhpbwghaavxilm1',
      database: 'bjmh3rwe5d0ncn4f'
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
const PORT = process.env.PORT || 8080
//สร้าง route ขึ้นมา 1 ตัว โดยกำหนดให้ path คือ / หรือ index ของ host นั่นเอง
//จากนั้นให้กำหนด response แสดงคำว่า Hello World
// app.get('/', home);
//app.get('/', index);
const {index,issuereceipt,getreceiptlist,receiptform,getrcpowner,advanceinvoice,getownername,getinvoicelist,invoiceform,getsliplist,updateslipstatus,getinvoicesform} = require("./")
const {getallreceiptlist,oldcommonfee,income,getreceiptlist1,receiptform1,expense,getexpenselist,incomeexpense,todaysummary,pendingpayment,gethouselist,gethouseinfo} = require("./")
const {loadincome,loadexpense,loadpending,loadhouseinfo} = require("./")

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


//const PORT1 = process.env.PORT || 3000;
//http.listen(app.get('port'));
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`)
   });
//ทำการ export app ที่เราสร้างขึ้น เพื่อให้สามารถนำไปใช้งานใน project อื่นๆ 
//เปรียบเสมือนเป็น module ตัวนึง
module.exports = app

