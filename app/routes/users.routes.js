module.exports = function(application) {

    /**
     * @description POST Call for user addition
     * @method POST @host /user 
     * 
     * @param  {string} name
     * @param  {string} email
     * @param  {string} username
     * @param  {string} password
     * @param  {Object} profile_picture
     */
    application.post('/user', function(req, res) {
        application.app.controllers.user.addUser(application, req, res);
    });

    /**
     * @description POST Follower a user
     * @method POST @host /api/user/:id/follow 
     * require x-access-token
     */
    application.post('/api/user/:id/follow', function(req, res) {
        application.app.controllers.user.follow(application, req, res);
    });

    /**
     * @description POST Login route
     * 
     * @method POST @host /user
     * @param  {string} username
     * @param  {string} password
     */
    application.post('/authenticate', function(req, res) {
        application.app.controllers.user.authenticate(application, req, res);
    });

    /**
     * @description GET all data from logged user
     * 
     * @method GET @host /user
     */
    application.get('/api/user', function(req, res) {
        application.app.controllers.user.getAllDataFromUser(application, req, res);
    });

}