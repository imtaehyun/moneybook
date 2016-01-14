module.exports = (function() {

    'use strict';

    const db = require('./database');

    class Transaction {

        constructor() {

        }

        static find(transaction, cb) {
            db.select('*')
                .from('transactions')
                .where(transaction)
                .then(function(result) {
                    cb(result);
                });
        }

        static create(transaction, cb) {
            db.insert(transaction, 'id')
                .into('transactions')
                .then(function(id) {
                    cb(null, id);
                })
                .catch(function(err) {
                    cb(err);
                });
        }

        static update(id, transaction, cb) {
            db('transactions')
                .where('id', id)
                .update(transaction, 'id')
                .then(function(id) {
                    cb(id);
                });
        }

        static del(id, cb) {
            db('transactions')
                .where('id', id)
                .del()
                .then(function(affected_row_cnt) {
                    cb(affected_row_cnt);
                });
        }
    }

    return Transaction;
})();