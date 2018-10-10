var Enquiries=require('../models/enquiry');
var Events=require('../models/event');
exports.home=(req,res)=>{
    res.send('hello from home');
};
exports.panel=(req,res)=>{
   
  res.send('hello from panel');  
};

exports.login=(req,res)=>{
    res.send('hello from login');
};
exports.enquiriesboard=(req,res)=>{
   Enquiries.find({},(err,docs)=>{
        if(err)throw err;
        var cursor=docs;
       res.send(cursor); 
    });  
};
exports.eventboard=(req,res)=>{
    Events.find({},(err,docs)=>{
        if(err)throw err;
        var cursor=docs;
        res.send(cursor);
    });
};