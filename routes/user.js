var express=require('express');
var router=express.Router();
var passport=require('passport');
var Enquiry=require('../models/enquiry');
var localStrategy=require('passport-local').Strategy;

router.post('/sendEnquiry',(req,res)=>{
    var name=req.body.name;
    var phone=req.body.phone;
    var email=req.body.email;
    var query=req.body.query;
    const enquiry=new Enquiry({
        name:name,
        phone:phone,
        email:email,
        query:query,
        status:'Enquried'
    });
    enquiry.save()
       .then(result=>{
        res.send('Enquiry sent')
    })
      .catch(err=>{
        res.send(err);
    });
});

module.exports=router;