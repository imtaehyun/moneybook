module.exports = (function() {

    'use strict';

    const express = require('express');
    const router = express.Router();
    const User = require('../models/user');

    router.get('/users/', (req, res) => {

    });

    router.get('/users/:id', (req, res) => {

    });

    router.post('/users/', (req, res) => {
        User.create({
            email: req.body.email,
            pwd: req.body.pwd
        }, function(err, id) {
            if (err) res.send(err);
            else res.send(id);
        });
    });

    router.put('/users/:id', (req, res) => {

    });

    router.delete('/users/:id', (req, res) => {

    });

    return router;
})();
