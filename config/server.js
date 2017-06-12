var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var multiparty = require('connect-multiparty');
var jwt = require('jsonwebtoken');
var config = require('./config');
var helmet = require('helmet');
var compression = require('compression');


var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(multiparty());
app.use(expressValidator());
app.use(bodyParser.json());
app.use(compression());

app.disable('x-powered-by');

app.set('superSecret', config.secret);

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.url.indexOf('/api/') !== -1 && req.method !== "OPTIONS") {
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            let authenticateUtil = new app.app.util.authenticateUtil(app);
            authenticateUtil.verify(req, res, token);
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    }
    next();
});

consign({ cwd: process.cwd() + "/app" })
    .include('/routes')
    .then('/schemas')
    .then('/models')
    .then('/util')
    .then('/controllers')
    .into(app);

consign().include('/config/dbConnection.js').into(app);

module.exports = app;