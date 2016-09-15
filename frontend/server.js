// var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
// var config = require('./webpack.config');
//
//
// new WebpackDevServer(webpack(config), {
//     publicPath: config.output.publicPath,
//     hot: true,
//     historyApiFallback: true
// }).listen(3000, 'localhost', function (err, result) {
//     if (err) {
//         return console.log(err);
//     }
//
//     console.log('Listening at http://localhost:3000/');
// });

const path = require('path');
const express = require('express');
const webpack = require('webpack');

const app = express();
const config = require(`./webpack.config.js`);
const compiler = webpack(config);

const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({
    changeOrigin: true
});

const apiHost = 'http://localhost:3030';
const host = 'localhost';
const port = 3000;

const serverOptions = {
    hot: true,
    noInfo: false,
    publicPath: config.output.publicPath,
    stats: {
        assets      : false,
        colors      : true,
        version     : false,
        hash        : false,
        timings     : true,
        chunks      : false,
        chunkModules: false,
    },
};

proxy.on('error', (err, req, res) => {
    if (!res.headersSent) {
        res.writeHead(500, { 'content-type': 'application/json' });
    }
    res.end(JSON.stringify({ error: 'proxy_error', reason: err.message }));
});

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.get(`/`, (req, res) => {
    res.sendFile(path.join(__dirname, `./index.html`));
});

app.all(`/login`, (req, res) => {
    proxy.web(req, res, {
        target: apiHost
    });
});

app.all(`/register`, (req, res) => {
    proxy.web(req, res, {
        target: apiHost
    });
});

app.listen(port, host, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://' + host + ':' + port);
});
