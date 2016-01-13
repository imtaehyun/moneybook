module.exports = (function() {

    'use strict';

    const express = require('express');
    const router = express.Router();

    const TransactionsController = require('./controllers/transactions_controller');
    const UsersController = require('./controllers/users_controller');
    const LoginController = require('./controllers/login_controller');

    router.use('/transactions', TransactionsController);
    router.use('/users', UsersController);
    router.use('/auth', LoginController);

    return router;

})();
