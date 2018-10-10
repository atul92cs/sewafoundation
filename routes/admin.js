var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Enquiry = require('../models/enquiry');
var Event = require('../models/event');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

router.post('/register', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var conPassword = req.body.password2;
    User.getUserbyEmail(email, (err, user) => {
        if (err) {
            res.status(500).send('some error occured');
        } else {
            if (user) {
                res.status(500).send('user already exists');
            } else {
                var user = new User({
                    email: email,
                    password: password
                });
                User.hashPassword(user, (err, user) => {
                    if (err) throw err;
                    res.send('user registered');
                });

            }
        }
    });
});
passport.use(new localStrategy((email, password, done) => {
    User.getUserbyEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            return done(null, false);
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                return done(null, user);

            } else {
                return done(null, false);
            }
        });
    });
}));
passport.serializeUser((user, done) => {
    done(null, user._id);
    console.log(user);
});
passport.deserializeUser((id, done) => {
    User.getUserbyId(id, (err, user) => {
        done(err, user);
    });
});
router.post('/login', passport.authenticate('local', {
    sucessRedirect: '/panel',
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/panel');

});
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
router.post('/update/enquiry', (req, res) => {
    let record={};
    record.name=req.body.name;
    record.phone=req.body.phone;
    record.email=req.body.email;
    record.query=req.body.query;
    record.status=req.body.status;
    let query={_id:req.body._id};
    Enquiry.updateOne(query,record,(err)=>{
        if(err)
            {
                res.send(err);
            }
        else
            {
                res.send('Enquiry status update');
            }
    });
});
router.delete('/enquiry/:id',(req,res)=>{
    var id =req.params.id;
    let query={_id:id};
    Enquiry.findById(id,(err,Enquiries)=>{
        if(err)
            {
                res.send(err);
            }
        else
            {
                Enquiry.deleteOne(query,(err)=>{
                    if(err)
                        {
                            res.send(err);
                        }
                    else
                        {
                            res.send('Enquiry deleted');
                        }
                });
            }
    });
});
router.post('/event/add', (req, res) => {
    var name = req.body.name;
    var date = req.body.date;
    var content = req.body.content;
    const event = new Event({
        name: name,
        date: date,
        content: content
    });
    event.save().
    then(result => {
        res.send('event created');
    }).catch(err => {
        res.send(err);
    });
});

router.delete('/event/:id', (req, res) => {
     var id=req.body._id;
    let query={_id:id};
    Event.findById(id,(err,Events)=>{
        if(err)
            {
              res.send(err);   
            }
        else
            {
                Event.deleteOne(query,(err)=>{
                    if(err)
                        {
                            res.send(err);
                        }
                    else
                        {
                            res.send('Success');
                        }
                });
            }
    });
    
});
router.post('/event/update', (req, res) => {
      let record={};
    record.name=req.body.name;
    record.date=req.body.date;
    record.content=req.body.content;
    let query={_id:req.body._id};
    Event.updateOne(query,record,(err)=>{
        if(err)
            {
                res.send(err);
            }
        else
            {
                res.send('event update');
            }
    });
      
});
module.exports = router;
