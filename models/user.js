var db = require('./database');
var User = {
    findOrCreate: function (user, callback) {
        var newUser = user;
        User.find(user, function(err, user) {
            if (err) { callback(err); }
            if (user !== null) {
                console.log('user found: ' + user.id);
                callback(null, user.id);
            } else {
                console.log('user: ' + newUser);
                User.create(newUser, function(err, id) {
                    if (err) { callback (err); }
                    console.log('user created: ' + id);
                    callback(null, id);
                });
            }
        });
    },
    find: function (user, callback) {
        db.select('id')
            .from('users')
            .where('auth_id', user.id)
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
    },
    create: function (user, callback) {
        db.insert({
                email: user.email,
                auth_type: 'facebook',
                auth_id: user.id
            }, 'id')
            .into('users')
            .then(function(id) {
                callback(null, id);
            })
            .catch(function (err) {
                callback(err);
            });
    }
};

module.exports = User;