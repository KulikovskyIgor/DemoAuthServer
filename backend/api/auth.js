var usersStore = require('../store/users-store');
var isAuth = require('../tools/is-auth').default;

exports.default = function (app) {

    app.post('/register', function (req, res) {
        if (!req.body.username || !req.body.password) {
            res.sendStatus(400);
        } else {
            var user = usersStore.add(req.body.username, req.body.password);
            req.session.user = user;
            res.sendStatus(200);
        }
    });

    app.post('/login', function (req, res) {
        if (req.body.username && req.body.password) {
            if (usersStore.isRegistered(req.body.username, req.body.password)) {
                req.session.regenerate(function() {
                    var user = usersStore.get(req.body.username, req.body.password);
                    req.session.user = user;
                    res.sendStatus(200);
                })
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(400);
        }
    });

    app.get('/logout', function (req, res) {
        req.session.destroy();
        res.sendStatus(200);
    });

    app.get('/online', isAuth, function (req, res) {
        res.sendStatus(200);
    });
}