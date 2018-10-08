var express=require('express');
var router=express.Router();
var User=require('../models/user');
var Enquiry=require('../models/enquiry');
var passport=require('passport');
var localStrategy=require('passport-local').Strategy;

router.post('/register',(req,res)=>{
    var email=req.body.email;
    var password=req.body.password;
    var conPassword=req.body.password2;
    User.findOne(email,(err,user)=>{
        if(err)
            {
                res.send(500).send('some error occured');
            }
        else
            {
                res.send(500).send('user already exists');
            }
        else
            {
                var user =new User({
                    email:email,
                    password:password
                });
                user.hashPassword(user,(err,user)=>{
                    if(err) throw err;
                    res.send('user registered');
                });

            }
    });
});
passport.use(new localStrategy((email,password,done)=>{
    User.getUserByEmail(email,(err,user)=>{
        if(err)throw err;
        if(!user)
            {
                return done(null,false,{message:'user does not exist'})
            }
          User.comparePassword(password,user.password,(err,isMatch)=>{
              if(err) throw err;
              if(isMatch){
                  return(done,user);
              }else{
                  return(null,false,{message:'Invalid password'});
              }
          });
    });
}));
passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>{
    User.getUserById(id,(err,use)=>{
        done(err,user);
    });
});
router.post('/login',passport.authenticate('local',{failureRedirect:'/login',sucessRedirect:'/panel'}),(req,res)=>{
    res.send('welcome user');
});
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});

module.exports=router;