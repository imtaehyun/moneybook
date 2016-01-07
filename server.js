var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var api = require('./routers/api');
var login = require('./routers/login')

var app = express();

var isProd = process.env.NODE_ENV === 'production';
var port = isProd ? process.env.PORT : 3000;

app.use(express.static('public'));
app.use(session({
    secret: 'moneybook session',
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use('/api', api);
app.use('/', login);

app.get('/session', function(req, res) {
    if (req.isAuthenticated()) { res.send(req.session); }
    else res.redirect('/');
});

app.get('*', function(req, res) {
    console.log(req.session);
    res.render('index');
});

app.listen(port, function() {
    console.log('Server running on port ' + port);
});