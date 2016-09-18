var users = {};

exports.add = function (username, password) {
    var user = {username: username, password: password};
    users[username] = user;
    return user;
}

exports.get = function (username) {
    return users[username];
}

exports.isRegistered = function (username, password) {
    return users.hasOwnProperty(username) && users[username].password === password;
}