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

});
router.post('/event/update', (req, res) => {

});
module.exports = router;
