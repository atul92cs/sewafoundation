var express=require('express');
var bodyParser=require('body-parser');
var session=require('express-session');
var cookieParser=require('cookie-parser');
var port=process.env.PORT||8080;
var app=express();
app.listen(port,()=>{
    console.log('server started on' + ' ' +port);
});