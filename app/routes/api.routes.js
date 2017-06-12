module.exports = function(application) {

    /**
     * @description GET all posts
     * require x-access-token
     * @method GET @host /api/post
     * 
     * @return [Array] posts
     */
    application.get('/api/post', function(req, res) {
        application.app.controllers.post.getPostFromUser(application, req, res);
    });

    /**
     * @description GET an especific post
     * require x-access-token
     * @method GET @host /api/post/:id
     * 
     * @return [Array] post
     */
    application.get('/api/post/:id', function(req, res) {
        application.app.controllers.post.getPostById(application, req, res);
    });



    /**
     * @description POST a post
     *  require x-access-token
     * @method POST @host /api/post
     * 
     * @param {string} Title
     * @param {string} img_url
     * 
     * @returns {Object} status = 1 on success and status = 0 on error
     */
    application.post('/api/post', function(req, res) {
        application.app.controllers.post.savePost(application, req, res);
    });

    /**
     * @description DELETE a post
     *  require x-access-token
     * @method DELETE @host /api/post/:id
     * 
     * @param {string} id     
     * 
     * @returns {Object} status = 1 on success and status = 0 on error
     */
    application.delete('/api/post/:id', function(req, res) {
        application.app.controllers.post.deletePost(application, req, res);
    });

    /**
     * @description ADD comment to picture
     *  require x-access-token
     * @method POST @host /api/post/:id/comment
     * 
     * @param {string} Comment
     * 
     * @returns {Object} status = 1 on success and status = 0 on error
     */
    application.post('/api/post/:id/comment', function(req, res) {
        application.app.controllers.comment.addComment(application, req, res)
    });

    /**
     * @description ADD Like to picture
     *  require x-access-token
     * @method POST @host /api/post/:id/comment
     * @returns {Object} status = 1 on success and status = 0 on error
     */
    application.post('/api/post/:id/like', function(req, res) {
        application.app.controllers.like.addLike(application, req, res)
    });

    /**
     * @description DELETE an especific comment
     *  require x-access-token
     * @method DELETE @host /api/post/:id/comment/:id_comment
     * 
     * @returns {Object} status = 1 on success and status = 0 on error
     */
    application.delete('/api/post/:id/comment/:id_comment', function(req, res) {
        application.app.controllers.comment.removeComment(application, req, res);
    });
}