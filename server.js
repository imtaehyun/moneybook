var express = require('express');
var bodyParser = require('body-parser');
var api = require('./routers/api');

var app = express();

var isProd = process.env.NODE_ENV === 'production';
var port = isProd ? process.env.PORT : 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api', api);

app.get('*', function(req, res) {
    res.render('index');
});

app.listen(port, function() {
    console.log('Server running on port ' + port);
});