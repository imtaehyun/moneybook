var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://mb.nezz.pe.kr:3000/auth/facebook/callback',
    enableProof: false,
    profileFields: ['id', 'displayName', 'email']
}, function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    User.findOrCreate(profile._json, function(err, user) {
        if (err) { return done(err); }
        return done(null, user);
    });
}));

passport.serializeUser(function(id, done) {
    done(null, id);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email']}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

module.exports = router;