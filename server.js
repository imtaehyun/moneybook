var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');

var db = massive.connectSync({connectionString: process.env.PG_CONNECTION_STRING});
var app = express();

var isProd = process.env.NODE_ENV === 'production';
var port = isProd ? process.env.PORT : 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/transaction', function(req, res) {
    console.log(req.body);
    db.transactions.save(req.body, function(err, inserted) {
        if (err) console.error(err);
        else console.log(inserted);
    });
    res.sendStatus(200);
});

app.get('/api/transactions', function(req, res) {

});

app.get('*', function(req, res) {
    res.render('index');
});

app.listen(port, function() {
    console.log('Server running on port ' + port);
});

db.transactions.find({}, function(err, list) {
    console.log(list);
})