var pg = require('knex')({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    debug: true
});

module.exports = {
    selectTransactions: function(cb) {
        pg.select('*')
            .from('transactions')
            .limit(10)
            .then(function(result) {
                cb(result);
            });
    },
    selectTransaction: function(id, cb) {
        pg.select('*')
            .from('transactions')
            .where('id', id)
            .then(function(result) {
                cb(result[0]);
            });
    },
    insertTransaction: function(transaction, cb) {
        pg.insert(transaction, 'id')
            .into('transactions')
            .then(function(id) {
                cb(id);
            })
            .catch(function(err) {

            });
    },
    updateTransaction: function(transaction, cb) {
        pg('transactions')
            .where('id', transaction.id)
            .update(transaction, 'id')
            .then(function(id) {
                cb(id);
            });
    },
    deleteTransaction: function(id, cb) {
        pg('transactions')
            .where('id', id)
            .del()
            .then(function(affected_row_cnt) {
                console.log(affected_row_cnt);
            });
    }
};