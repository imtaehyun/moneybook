module.exports = (function() {

    const express = require('express');
    const router = express.Router();

    const User = require('../models/user');

    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'pwd'
    }, (username, password, done) => {
        User.find({email: username, pwd: password}, (err, user) => {
            if (err) {
                console.log('err: ' + err);
                return done(err);
            }

            if (!user) {
                console.log('no_user');
                return done(null, false, { message: 'no user' });
            }

            console.log('user: ' + JSON.stringify(user));
            return done(null, user.id);
        });
    }));

    passport.serializeUser(function(id, done) {
        done(null, id);
    });

    passport.deserializeUser(function(id, done) {
        done(null, id);
    });

    router.post('/login', passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureRedirect: '/auth/login',
        failureFlash: false
    }));

    router.get('/profile', (req, res) => {
        if (!req.isAuthenticated()) res.sendStatus(401);
        else {
            console.log(req.session.passport.user);
            User.find({id: req.session.passport.user }, (err, user) => {
                if (err) res.send(err);
                res.send(user);
            });
        }
    });

    return router;
})();