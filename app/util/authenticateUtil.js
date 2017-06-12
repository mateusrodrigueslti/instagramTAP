var fs = require('fs');

const jwt = require('jsonwebtoken');

function authenticateUtil(application) {
    this._application = application;
}

authenticateUtil.prototype.generateToken = function(user) {
    let token = jwt.sign(user, this._application.get('superSecret'), {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
    return token;
}

authenticateUtil.prototype.verify = function(req, res, token) {
    jwt.verify(token, this._application.get('superSecret'), function(err, decoded) {
        if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Credentials", true);
        }
    });
}

module.exports = function() {
    return authenticateUtil;
}