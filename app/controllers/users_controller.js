module.exports = (function() {

    'use strict';

    const express = require('express');
    const router = express.Router();
    const User = require('../models/user');

    router.get('/', (req, res) => {

    });

    router.get('/:id', (req, res) => {

    });

    router.post('/', (req, res) => {
        User.create({
            email: req.body.email,
            pwd: req.body.pwd
        }, function(err, id) {
            if (err) res.send(err);
            else res.send(id);
        });
    });

    router.put('/:id', (req, res) => {

    });

    router.delete('/:id', (req, res) => {

    });

    return router;
})();
