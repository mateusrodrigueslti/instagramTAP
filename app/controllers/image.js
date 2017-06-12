/**
 * @description GET picture
 * 
 * @param {Object} application
 * @param {Object} request
 * @param {Object} response
 */
module.exports.getPicture = function(application, req, res) {
    let image_name = req.params.image;
    let pathUtil = new application.app.util.pathUtil();
    let image = pathUtil.readImage(req, res, image_name);
    if (image) {
        res.status(400).json(image);
        return;
    }
}

/**
 * @description GET profile picture
 * 
 * @param {Object} application
 * @param {Object} request
 * @param {Object} response
 */
module.exports.getProfilePicture = function(application, req, res) {
    let image_name = req.params.image;
    let pathUtil = new application.app.util.pathUtil();
    let image = pathUtil.readProfilePicture(req, res, image_name);
    if (image) {
        res.status(400).json(image);
        return;
    }
}