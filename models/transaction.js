var db = require('./database');

module.exports = {
    selectTransactions: function(cb) {
        db.select('*')
            .from('transactions')
            .limit(10)
            .then(function(result) {
                cb(result);
            });
    },
    selectTransaction: function(id, cb) {
        db.select('*')
            .from('transactions')
            .where('id', id)
            .then(function(result) {
                cb(result[0]);
            });
    },
    insertTransaction: function(transaction, cb) {
        db.insert(transaction, 'id')
            .into('transactions')
            .then(function(id) {
                cb(id);
            })
            .catch(function(err) {

            });
    },
    updateTransaction: function(transaction, cb) {
        db('transactions')
            .where('id', transaction.id)
            .update(transaction, 'id')
            .then(function(id) {
                cb(id);
            });
    },
    deleteTransaction: function(id, cb) {
        db('transactions')
            .where('id', id)
            .del()
            .then(function(affected_row_cnt) {
                console.log(affected_row_cnt);
            });
    }
};