var fs = require('fs');

function pathUtil() {}

pathUtil.prototype.changePathImage = function(req, res) {
    let date = new Date();
    try {
        let img_name = date.getTime() + "_" + req.files.archive.originalFilename;
        let sourcePath = req.files.archive.path;
        let targetPath = "./uploads/" + img_name;
        let response = {
            status: 1,
            file_name: img_name,
            url_img_server: 'http://' + req.get('host') + "/uploads/" + img_name
        };
        fs.rename(sourcePath, targetPath, function(err) {
            if (err) {
                return { status: 0 };
            }
        });
    } catch (e) {
        return { status: 0 }
    }
    return response;
}

pathUtil.prototype.saveProfilePicture = function(req, res) {
    let date = new Date();
    try {
        let img_name = 'profile_' + date.getTime() + "_" + req.files.profile_picture.originalFilename;
        let sourcePath = req.files.profile_picture.path;
        let targetPath = "./uploads/profile_folder/" + img_name;
        var response = {
            status: 1,
            file_name: img_name,
            url_img_server: 'http://' + req.get('host') + "/uploads/profile/" + img_name
        };
        fs.rename(sourcePath, targetPath, function(err) {
            if (err) {
                return { status: 0 };
            }
        });
    } catch (e) {
        return { status: 0 }
    }
    return response;
}

pathUtil.prototype.readImage = function(req, res, img_name) {
    try {
        fs.readFile('./uploads/' + img_name,
            function(err, content) {
                if (err) {
                    return { status: 0 }
                }
                res.writeHead(200, { 'content-type': 'image/jpg' })
                res.end(content);
            });
    } catch (e) {
        res.status(500).json({ err: "Can't find image" })
    }
}

pathUtil.prototype.readProfilePicture = function(req, res, img_name) {
    try {
        fs.readFile('./uploads/profile_folder/' + img_name,
            function(err, content) {
                if (err) {
                    return { status: 0 }
                }
                res.writeHead(200, { 'content-type': 'image/jpg' })
                res.end(content);
            });
    } catch (e) {
        res.status(500).json({ err: "Can't find image" })
    }
}

pathUtil.prototype.removeProfilePicture = function(img_name) {
    try {
        let filePath = './uploads/profile_folder/' + img_name;
        let response = { status: 1 };
        fs.unlinkSync(filePath, function(err) {
            if (err) response.status = 0;
        });
        return response;
    } catch (e) {
        return { err: "Can't find image" }
    }
}

module.exports = function() {
    return pathUtil;
}