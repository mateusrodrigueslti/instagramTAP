const jwt = require('jsonwebtoken');
/**
 * @description Call for user addition
 * 
 * @param {Object} application
 * @param {Object} request
 * @param {Object} response
 */
module.exports.addUser = function(application, req, res) {
    let user = req.body;
    let UsersModel = new application.app.models.UsersModel(application);
    let dataToSend = {
        password: user.password,
        username: user.username,
        email: user.email,
        name: user.name,
        profile_image: user.profile_image
    }
    UsersModel.addUser(req, res, dataToSend);
}

/**
 * @description Method to authenticate
 * 
 * @param {Object} application
 * @param {Object} request
 * @param {Object} response
 */
module.exports.authenticate = function(application, req, res) {
    let user = req.body;
    let UsersModel = new application.app.models.UsersModel(application);
    UsersModel.authenticate(application, res, user);
}


/**
 * @description Method to follow use
 * 
 * @param {Object} application
 * @param {Object} request
 * @param {Object} response
 */
module.exports.follow = function(application, req, res) {
    let UsersModel = new application.app.models.UsersModel(application);
    let token_req = req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token_req, application.get('superSecret'), function(err, decoded) {
        if (err) {
            res.status(400).json({ success: false });
            return;
        } else {
            var userTofollow = req.params.id;
            UsersModel.follow(application, res, decoded, userTofollow);
        }
    });
}

/**
 * @description Method to get all data from user logged
 * 
 * @param {Object} application
 * @param {Object} request
 * @param {Object} response
 */
module.exports.getAllDataFromUser = function(application, req, res) {
    let UsersModel = new application.app.models.UsersModel(application);
    let token_req = req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token_req, application.get('superSecret'), function(err, decoded) {
        if (err) {
            res.status(400).json({ success: false });
            return;
        } else {
            UsersModel.getAllDataFromUser(application, res, decoded);
        }
    });
}