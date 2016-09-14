var jwt = require('jsonwebtoken');
var usersStore = require('../store/users-store');
var isAuth = require('../tools/is-auth').default;
var conf = require('../conf');

exports.default = function (app) {

    app.post('/register', function (req, res) {
        if (!req.body.username || !req.body.password) {
            res.status(400).json({error: 'The request had bad syntax or was inherently impossible to be satisfied.'});
        } else {
            usersStore.add(req.body.username, req.body.password);
            res.status(200).json({message: 'Registration is successful.'});
        }
    });

    app.post('/login', function (req, res) {
        if (req.body.username && req.body.password) {
            if (usersStore.isRegistered(req.body.username, req.body.password)) {
                var user = usersStore.get(req.body.username, req.body.password);
                var token = jwt.sign(user, conf.secret, {
                    expiresIn: conf.tokenExpiresIn
                });

                res.status(200).json({
                    user: user,
                    token: token
                });
            } else {
                res.status(403).json({error: 'You are not registered! Please, register.'});
            }
        } else {
            res.status(400).json({error: 'The request had bad syntax or was inherently impossible to be satisfied.'});
        }
    });

    app.get('/logout', function (req, res) {
        req.session.destroy();
        res.status(200).json({message: 'Logout is successful.'});
    });

    app.get('/online', isAuth, function (req, res) {
        res.status(200).json({message: 'Token is valid.'});
    });
}