module.exports = (function() {

    'use strict';

    const pg = require('knex')({
        client: 'pg',
        connection: process.env.PG_CONNECTION_STRING,
        debug: true
    });

    return pg;

})();
