const ObjectID = require('mongoose').Types.ObjectId;

/**
 * @description Constructor
 * 
 * @param DB connection
 */
function CommentModel(application) {
    this.connection = application.config.dbConnection();
    this._model = {
        Post: this.connection.model('Post', application.app.schemas.post),
        User: this.connection.model('User', application.app.schemas.user)
    };
}

/**
 * @description Comment post
 * 
 * @returns {Object} 1 if success or 0 if error
 */
CommentModel.prototype.addComment = function(post, data, req, res) {
    let Post = this._model.Post;
    data.user = ObjectID(data.user);
    console.log(data);
    Post.update({
        _id: ObjectID(post)
    }, {
        $push: {
            comments: {
                user: data.user,
                comment: data.comment
            }
        }
    }, function(err, success) {
        if (err) res.status(400).json({ success: false });
        else res.status(200).json({ success: true });
    });
}

module.exports = function(application) {
    return CommentModel;
}