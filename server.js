var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var isAuth = require('./backend/tools/is-auth').default;
var authApi = require('./backend/api/auth').default;

var app = express();

var expiryDate = new Date(Date.now() + 60 * 60 * 1000);
app.use(session({
        name: 'session',
        secret: 'secret_key',
        resave: true,
        saveUninitialized: true,
        cookie: {
            expires: expiryDate
        }
    })
);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

authApi(app);

app.get('/content', isAuth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});

app.listen(3000, function () {
    console.log('Listening: http://localhost:3000');
});