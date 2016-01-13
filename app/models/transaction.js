module.exports = (function() {

    'use strict';

    const db = require('./database');

    class Transaction {

        constructor() {
            console.log('transaction contructed');
        }

        static selectTransactions(cb) {
            db.select('*')
                .from('transactions')
                .limit(10)
                .then(function(result) {
                    cb(result);
                });
        }

        static selectTransaction(id, cb) {
            db.select('*')
                .from('transactions')
                .where('id', id)
                .then(function(result) {
                    cb(result[0]);
                });
        }

        static insertTransaction(transaction, cb) {
            db.insert(transaction, 'id')
                .into('transactions')
                .then(function(id) {
                    cb(id);
                })
                .catch(function(err) {

                });
        }

        static updateTransaction(transaction, cb) {
            db('transactions')
                .where('id', transaction.id)
                .update(transaction, 'id')
                .then(function(id) {
                    cb(id);
                });
        }

        static deleteTransaction(id, cb) {
            db('transactions')
                .where('id', id)
                .del()
                .then(function(affected_row_cnt) {
                    console.log(affected_row_cnt);
                });
        }
    }

    return Transaction;
})();