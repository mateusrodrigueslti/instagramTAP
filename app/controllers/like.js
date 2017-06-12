const jwt = require('jsonwebtoken');


/**
 * @description add comment to picture
 * 
 * @param {Object} application
 * @param {Object} request
 * @param {Object} response
 */
module.exports.addLike = function(application, req, res) {
    let token_req = req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token_req, application.get('superSecret'), function(err, decoded) {
        if (err) {
            res.status(400).json({ success: false });
            return;
        } else {
            let LikeModel = new application.models.LikeModel(application);
            let post = req.params.id;
            let user = {
                user: decoded._id
            }
            LikeModel.addLike(post, user, req, res);
        }
    });

}