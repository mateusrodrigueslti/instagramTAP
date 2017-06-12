const jwt = require('jsonwebtoken');

/**
 * @description add comment to picture
 * 
 * @param {Object} application
 * @param {Object} request
 * @param {Object} response
 */
module.exports.addComment = function(application, req, res) {
    let token_req = req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token_req, application.get('superSecret'), function(err, decoded) {
        if (err) {
            res.status(400).json({ success: false });
            return;
        } else {
            let CommentModel = new application.app.models.CommentModel(application);
            let post = req.params.id;
            let comment = {
                user: decoded._id,
                comment: req.body.comment
            }
            CommentModel.addComment(post, comment, req, res);
        }
    });

}

/**
 * @description remove comment from picture
 * 
 * @param {Object} application
 * @param {Object} request
 * @param {Object} response
 */
module.exports.removeComment = function(application, req, res) {
    let connection = application.config.dbConnection;
    let PostModel = new application.app.models.PostModel(connection);
    PostModel.removeComment(req, res);
}