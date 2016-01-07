var pg = require('knex')({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    debug: true
});

module.exports = pg;