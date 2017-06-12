const jwt = require('jsonwebtoken');

/**
 * @description GET all posts
 * 
 * @param {Object} application
 * @param {Object} request
 * @param {Object} response
 */
module.exports.getPostFromUser = function(application, req, res) {
    let token_req = req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token_req, application.get('superSecret'), function(err, decoded) {
        if (err) {
            res.status(400).json({ success: false });
            return;
        } else {
            let PostModel = new application.app.models.PostModel(application);
            PostModel.getPostFromUser(res, decoded._id);
        }
    });
}

/**
 * @description GET post by ID
 * 
 * @param {Object} application
 * @param {Object} request
 * @param {Object} response
 */
module.exports.getPostById = function(application, req, res) {
    let PostModel = new application.app.models.PostModel(application);
    PostModel.getPostById(application, req, res);
}

/**
 * @description Save a post
 * 
 * @param {Object} application
 * @param {Object} request
 * @param {Object} response
 * @param {Object} data
 */
module.exports.savePost = function(application, req, res) {
    let token_req = req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token_req, application.get('superSecret'), function(err, decoded) {
        if (err) {
            res.status(400).json({ success: false });
            return;
        } else {
            let PostModel = new application.app.models.PostModel(application);
            let user = decoded._id;
            let dataToSend = {
                post_picture: req.body.post_picture,
                status: req.body.status
            };
            PostModel.savePost(dataToSend, user, req, res);
        }
    });
}

/**
 * @description Delete post
 * 
 * @param {Object} application
 * @param {Object} request
 * @param {Object} response
 */
module.exports.deletePost = function(application, req, res) {
    let token_req = req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token_req, application.get('superSecret'), function(err, decoded) {
        if (err) {
            res.status(400).json({ success: false });
            return;
        } else {
            let PostModel = new application.app.models.PostModel(application);
            let data = req.params.id;
            PostModel.deletePost(data, decoded._id, req, res);
        }
    });
}