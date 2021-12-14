const express = require('express');
//ทำการสร้าง Instance ของ express และสร้างตัวแปร app ขึ้นมาเพื่อรับค่า

const app = express();
const mysql = require('mysql');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const jwt = require('jsonwebtoken');

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
   app.use(bodyParser());
   app.use(bodyParser.urlencoded({extended: true}));

   app.use(bodyParser.json()); // parse form data client
 
  app.use(fileUpload()); // configure fileupload

   //สร้างตัวแปร PORT ขึ้นมารับค่า port ในกรณีที่เราได้กำหนดไว้ใน environment ของเครื่อง
//แต่ถ้าไม่ได้กำหนดไว้ เราจะใช้ค่า 8080 แทน
const PORT = process.env.PORT || 7000

const {index,issuereceipt,getreceiptlist,receiptform,getrcpowner,advanceinvoice,getownername,getinvoicelist,getinvoicelist1,invoiceform,invoiceform1,getsliplist,updateslipstatus,getinvoicesform} = require("./");
const {getallreceiptlist,oldcommonfee,income,getreceiptlist1,receiptform1,receiptform2,expense,getexpenselist,incomeexpense,todaysummary,pendingpayment,gethouselist,gethouseinfo} = require("./");
const {loadincome,loadexpense,loadpending,loadhouseinfo,updatehouseinfo,createadvanceinvoice,saveexpense,saveincome,saveSlip,checkadmin,receiptpayment,createinvoice1month,getrcpowner1} = require("./");
const {receiptoldpayment,contact,contact1,memberpage,loginadmin,login,checkusr,news,uploadslip,getmyreceiptlist,incomeexpense1,getvotelist} = require("./");
const {getcontactlist,addcontact,updatecontact,deletecontact,getnewslist,addnews,updatenews,deletenews,getalert,getcarlist,updatecar,cancelreceipt,getvoidreceipt,changepwd,newpassword} = require("./")
const {comment,getcommentlist,getparcellist,sendcomment,clearadvanceinv,getnewslist1,addpettycash,createletter,updatecommentstatus,getmycommentlist,loadparkingfeeinfo,getinfoletter,getmycommentlist1,changeadminpassword} = require("./")
const {updateparcelstatus,pendingparcel,newparcel,addparcel,getpendingparcel,updatepickup,getuseralert,listparcel,getpendingbyhouse,otherinvoice,issueotherinvoice,receiptform4} = require("./")


const authenticateJWT = (req, res, next) => {
  const authHeader = req.params.token;
  const accessTokenSecret = "IDESIGN2020";
  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, accessTokenSecret, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }
//onsole.log (user);
          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
      
  }
};
const authenticateJWT1 = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const accessTokenSecret = "IDESIGN2020";
//console.log(authHeader);
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
        res.writeHead(404, {'Content-Type': 'text/plain'});                    // <- redirect
res.write("Looked everywhere, but couldn't find that page at all!\n"); // <- content!
res.end(); 
        
    }
};

app.get('/admin/:token',authenticateJWT,index);
app.get('/getreceiptlist3/:token',authenticateJWT, getreceiptlist);
app.get('/getreceiptlist2/', getreceiptlist);
app.get('/issuereceipt', issuereceipt);
app.get('/receiptform3/104/:house_no/:receiptno/:token',authenticateJWT, receiptform);
app.get('/getrcpowner/104/:house_no',getrcpowner);
app.get('/advanceinvoice', advanceinvoice);
app.get('/getownername/:village_id/104/:house_no', getownername);
app.get('/getinvoicelist/:token',authenticateJWT, getinvoicelist);
app.get('/invoiceform/104/:house_no', invoiceform);
app.get('/invoiceform1/104/:house_no/:token',authenticateJWT, invoiceform1);
app.get('/getsliplist/:condition/:token',authenticateJWT, getsliplist);
app.post('/updateslipstatus',updateslipstatus);
app.get('/getallinvoice/:token',authenticateJWT, getinvoicesform);
app.get('/getallreceiptlist1/:token',authenticateJWT, getallreceiptlist);
app.get('/oldcommonfee/:token',authenticateJWT, oldcommonfee);
app.get('/income/:token', authenticateJWT,income);
app.get('/getreceiptlist1/:token',authenticateJWT, getreceiptlist1);
app.get('/receiptfor3/104/:house_no/:receiptno', receiptform1);
app.get('/receiptform2/104/:house_no/:receiptno', receiptform2);
app.get('/receiptform4/104/:house_no/:receiptno', receiptform4);
app.get('/expense/:token',authenticateJWT ,expense);
app.get('/getexpenselist/:period/:token',authenticateJWT, getexpenselist);
app.get('/incomeexpense', incomeexpense);
app.get('/todaysummary', todaysummary);
app.get('/pendingpayment', pendingpayment);
app.get('/gethouselist/:token',authenticateJWT, gethouselist);
app.get('/gethouseinfo/104/:house_no', gethouseinfo);
app.post('/loadexpense',loadexpense);
app.post('/loadincome/:token',authenticateJWT,loadincome);
app.get('/loadpending',loadpending);
app.get('/loadhouseinfo/:token',authenticateJWT,loadhouseinfo);
app.post('/updatehouseinfo',updatehouseinfo);
app.post('/createadvinv',createadvanceinvoice);
app.post('/saveexpense',saveexpense);
app.post('/saveincome',saveincome); 
app.post('/saveslip',saveSlip);
app.post('/checkadmin',checkadmin);
app.post('/receiptpayment',receiptpayment); 
app.post('/create1moinv', createinvoice1month);
app.get('/getrcp1/104/:house_no',getrcpowner1);
app.post('/receiptoldpayment',receiptoldpayment);
app.get('/contact', contact);
app.get('/contact1', contact1);
app.get('/member', memberpage);
app.get('/:village_name/loginadmin', loginadmin);
// For User
app.get('/:village_name/login', login);
app.post('/checkuser',checkusr);
app.get('/post', news);
app.get('/uploadslip', uploadslip);
app.get('/getmyreceiptlist/104/:house_no/:mytoken', getmyreceiptlist);
app.get('/incomeexpense1', incomeexpense1);
app.get('/getvotelist', getvotelist);
app.get('/getcontactlist', getcontactlist);
app.post('/addcontact',addcontact);
app.post('/updatecontact',updatecontact);
app.post('/deletecontact',deletecontact);
app.get('/getnewslist', getnewslist);
app.post('/addnews',addnews);
app.post('/updatenews',updatenews);
app.post('/deletenews',deletenews);
app.get('/getalert',authenticateJWT1, getalert);
app.get('/getcarlist', getcarlist);
app.post('/updatecar',updatecar);
app.post('/cancelreceipt',cancelreceipt);
app.get('/getvoidreceipt', getvoidreceipt);
app.get('/changepwd/104/:house_no', changepwd);
app.post('/newpassword',newpassword); 

app.get('/comment', comment);
app.post('/sendcomment',sendcomment); 
app.get('/getcommentlist', getcommentlist);
app.post('/clearadvanceinv',clearadvanceinv); 
app.get('/getnewslist1', getnewslist1);
app.post('/addpettycash',addpettycash);
app.get('/createletter',createletter );
app.post('/updatecommentstatus',updatecommentstatus);
 app.post('/getinfoletter',getinfoletter);  
app.get('/parkingfeeinfo',loadparkingfeeinfo);changeadminpassword
app.post('/changeadminpassword',changeadminpassword);
app.get('/getmycommentlist/:cust_id', getmycommentlist);
app.get('/getmycommentlist1/:cust_id', getmycommentlist1);
app.get('/getparcellist/:status', getparcellist);
app.post('/updateparcelstatus',updateparcelstatus);
app.get('/:villagename/pendingparcel', pendingparcel);
app.get('/:villagename/newparcel', newparcel);
app.post('/addparcel',addparcel);updatepickup
app.get('/getpendingparcel/:villagename', getpendingparcel);
app.get('/getpendingbyhouse/:villagename/:houseno/:houseno1', getpendingbyhouse);
app.post('/updatepickup',updatepickup);
app.get('/getuseralert/:village_id/:cust_id/104/:house_no', getuseralert);
app.get('/listparcel',listparcel);
app.get('/otherinvoice', otherinvoice);
app.post('/issueotherinvoice',issueotherinvoice); 
app.get('/getinvoicelist1/:token',authenticateJWT, getinvoicelist1);

app.get('/robots.txt', function (req, res, next) {
    res.type('text/plain')
    res.send("User-agent: * \n Disallow: / \n Disallow: /receiptform \n Disallow: /getallreceiptlist\n Disallow: /invoicelist \nSitemap: https://www.dosmartvill.com/sitemap.xml");
});
app.get('/googledf2b6534621fe73a.html', function (req, res, next) {
    res.type('text/plain')
    res.send("google-site-verification: googledf2b6534621fe73a.html");
});

//const PORT1 = process.env.PORT || 3000;

//http.listen(app.get('port'));
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`)
   });
//ทำการ export app ที่เราสร้างขึ้น เพื่อให้สามารถนำไปใช้งานใน project อื่นๆ 
//เปรียบเสมือนเป็น module ตัวนึง
module.exports = app
