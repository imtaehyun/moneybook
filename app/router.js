module.exports = (function() {

    'use strict';

    const express = require('express');
    const router = express.Router();

    const TransactionsController = require('./controllers/transactions_controller');
    const UsersController = require('./controllers/users_controller');
    const LoginController = require('./controllers/login_controller');
    const FrontController = require('./controllers/front_controller');

    router.use(TransactionsController);
    router.use(UsersController);
    router.use(LoginController);
    router.use(FrontController);

    return router;

})();
