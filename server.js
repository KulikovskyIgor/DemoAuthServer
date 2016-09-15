var express = require('express');
var bodyParser = require('body-parser');
var isAuth = require('./backend/tools/is-auth').default;
var authApi = require('./backend/api/auth').default;

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

authApi(app);

app.get('/content', isAuth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});

app.listen(3030, function () {
    console.log('Listening: http://localhost:3030');
});