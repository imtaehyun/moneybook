module.exports = (function() {

    'use strict';

    const express = require('express');
    const router = express.Router();
    const Transaction = require('../models/transaction');

    router.get('/transactions/', (req, res) => {
        Transaction.find({}, (result) => {
            res.send(result);
        });
    });

    router.get('/transactions/:id', (req, res) => {
        Transaction.find(req.params, (result) => {
            res.send(result);
        });
    });

    router.post('/transactions/', (req, res) => {
        Transaction.create(req.body, (err, result) => {
            if (err) res.send(err);
            res.send(result);
        });
    });

    router.put('/transactions/:id', (req, res) => {
        Transaction.update(req.params.id, req.body, (result) => {
            res.send(result);
        });
    });

    router.delete('/transactions/:id', (req, res) => {
        Transaction.del(req.params.id, (result) => {
            res.send(result+'');
        });
    });

    return router;
})();
