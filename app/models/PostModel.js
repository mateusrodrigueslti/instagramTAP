const ObjectID = require('mongoose').Types.ObjectId;

/**
 * @description Constructor
 * 
 * @param DB connection
 */
function PostModel(application) {
    this.connection = application.config.dbConnection();
    this._model = {
        Post: this.connection.model('Post', application.app.schemas.post),
        User: this.connection.model('User', application.app.schemas.user)
    };
}

/**
 * @description Get all posts from user
 * 
 * @param {Object} response 
 * @returns [Array] All posts on MongoDB
 */
PostModel.prototype.getPostFromUser = function(res, user) {
    let Post = this._model.Post;
    Post.find({
            user: ObjectID(user)
        })
        .populate('user', 'username _id name profile_image')
        .populate('comments.user', 'username _id name profile_image')
        .exec(function(err, users) {
            if (err) res.status(400).json({ success: false });
            else res.status(200).json(users);
        });
}

/**
 * @description Get post by Id
 * 
 * @param {Object} response 
 * @returns [Array] All posts on MongoDB
 */
PostModel.prototype.getPostById = function(application, req, res) {
    let post = ObjectID(req.params.id);
    let Post = this._model.Post;
    Post.findOne({
            _id: post
        })
        .populate('user', 'username _id name profile_image')
        .populate('comments.user', 'username _id name profile_image')
        .exec(function(err, post) {
            if (err) res.status(400).json({ success: false });
            else res.status(200).json(post);
        });
}


/**
 * @description Save post
 * 
 * @returns {Object} success
 */
PostModel.prototype.savePost = function(data, user, req, res) {
    data.user = ObjectID(user);
    let Post = new this._model.Post(data);
    Post.save(function(err, post) {
        if (err) {
            res.status(400).json({ success: false })
            console.log(err);
        } else { res.status(201).json({ success: true }); }
    });
}

/**
 * @description Delete post
 * 
 * @returns {Object} success true or false
 */
PostModel.prototype.deletePost = function(data, user, req, res) {
    let Post = this._model.Post;
    Post.remove({ _id: ObjectID(data), user: ObjectID(user) }, function(err, success) {
        console.log(success);
        if (err) {
            res.status(400).json({ success: false });
        } else {
            if (success.result.n > 0) {
                res.status(200).json({ success: true })
            } else {
                res.status(400).json({ success: false });
            }
        }
    });
}

module.exports = function(application) {
    return PostModel;
}