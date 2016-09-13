var _ = require('lodash');

var users = [];

exports.add = function (username, password) {
    var user = {username: username, password: password};
    users.push(user);
    return user;
}

exports.get = function (username, password) {
    return _.find(users, {username: username, password: password});
}

exports.isRegistered = function (username, password) {
    return !!_.find(users, {username: username, password: password});
}