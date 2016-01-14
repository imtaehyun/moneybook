import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';

module.exports = (function() {

    'use strict';

    const express = require('express');
    const router = express.Router();

    const IndexComponent = require('../components/index');
    const ListComponent = require('../components/list');

    const routes = [
        {
            path: '/',
            component: IndexComponent,
        },
        {
            path: '/list',
            component: ListComponent,
        }
    ];

    router.get('*', (req, res) => {

        match({ routes, location: req.url }, (err, redirectLocation, props) => {
            if (err) {
                res.status(500).send(error.message);
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            } else if (props) {
                const markup = renderToString(<RoutingContext {...props} />);
                res.render('index', { markup });
                //res.status(200).send()
            } else {
                res.status(404).send('Not found');
            }
        });

    });

    return router;

})();