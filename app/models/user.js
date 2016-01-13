module.exports = (function() {

    'use strict';

    const db = require('./database');

    class User {
        static findOrCreate(user, callback) {
            var newUser = user;
            this.find(user, function(err, user) {
                if (err) { callback(err); }
                if (user !== null) {
                    console.log('user found: ' + user.id);
                    callback(null, user.id);
                } else {
                    console.log('user: ' + newUser);
                    this.create(newUser, function(err, id) {
                        if (err) { callback (err); }
                        console.log('user created: ' + id);
                        callback(null, id);
                    });
                }
            });
        }

        static find(user, callback) {
            db.select('*')
                .from('users')
                .where(user)
                .then(function(user) {
                    if (user.length === 0) {
                        callback(null, null);
                    } else {
                        callback(null, user[0]);
                    }

                })
                .catch(function(err) {
                    callback(err);
                });
        }

        static create(user, callback) {
            db.insert({
                    email: user.email,
                    pwd: user.pwd
                }, 'id')
                .into('users')
                .then(function(id) {
                    callback(null, id);
                })
                .catch(function (err) {
                    callback(err);
                });
        }
    }

    return User;
})();
