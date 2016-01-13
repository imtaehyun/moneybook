module.exports = (function() {

    'use strict';

    const express = require('express');
    const router = express.Router();
    const Transaction = require('../models/transaction');

    router.get('/', (req, res) => {
        Transaction.selectTransactions((result) => {
            res.send(result);
        });
    });

    router.get('/:id', (req, res) => {

    });

    router.post('/', (req, res) => {

    });

    router.put('/:id', (req, res) => {

    });

    router.delete('/:id', (req, res) => {

    });

    return router;
})();
