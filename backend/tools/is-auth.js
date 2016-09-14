var jwt  = require('jsonwebtoken');
var conf = require('../conf');

exports.default = function (req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, conf.secret, function (err, decoded) {
            if (err) {
                return res.status(403).json({error: 'Failed to authenticate token.'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(403).json({error: 'You are not signed in! Please, sign in before use this API.'});
    }
};