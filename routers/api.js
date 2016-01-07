var express = require('express');
var router = express.Router();
var Transaction = require('../models/transaction');

router.get('/transactions', function(req, res) {
    Transaction.selectTransactions(function(result) {
        res.send(result);
    });
});

router.get('/transactions/:id', function(req, res) {

});

router.post('/transactions', function(req, res) {

});

router.put('/transactions/:id', function(req, res) {

});

router.delete('/transactions/:id', function(req, res) {

});

module.exports = router;