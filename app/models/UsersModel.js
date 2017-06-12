const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const secret = 'I6nStO4gr4m';
const ObjectID = require('mongoose').Types.ObjectId;

function UsersModel(application) {
    this.connection = application.config.dbConnection();
    this._model = this.connection.model('User', application.app.schemas.user);
}

UsersModel.prototype.addUser = function(req, res, user) {
    let encryptedPassword = crypto.createHmac('sha256', secret).update(user.password).digest('hex');
    user.password = encryptedPassword;
    let userToSave = new this._model(user);
    userToSave.save(function(err, userToSave) {
        if (err) res.status(400).json({ msg: ['User already exists'] });
        else res.status(201).json({ msg: ['Done'] });
    });
}

UsersModel.prototype.authenticate = function(application, res, user) {
    let encryptedPassword = crypto.createHmac('sha256', secret).update(user.password).digest('hex');
    user.password = encryptedPassword;
    let Person = this._model;
    Person.findOne(user, '_id username name profile_image', function(err, person) {
        if (err) return res.status(400).json({ success: false });
        if (person) {
            let authenticateUtil = new application.app.util.authenticateUtil(application);
            let userToToken = {
                username: person.username,
                _id: person._id
            }
            let token = authenticateUtil.generateToken(userToToken);
            let userResponse = {
                success: true,
                _id: person._id,
                username: person.username,
                name: person.name,
                profile_picture: person.profile_image,
                token: token
            }
            res.status(200).json(userResponse);
        } else {
            res.status(401).json({ msg: 'Usuário e/ou senha inválido(s)' });
        }
    });
}

UsersModel.prototype.getAllDataFromUser = function(req, res, userReq) {
    let User = this._model;
    User.findOne({
            _id: userReq._id
        }, '_id username name email profile_image following followers')
        .populate('following', 'username _id name profile_image')
        .populate("followers", 'username _id name profile_image')
        .exec(function(err, users) {
            if (err) res.status(400).json({ success: false });
            else res.status(200).json(users);
        });
}

UsersModel.prototype.follow = function(req, res, userReq, userTofollow) {
    let User = this._model;
    console.log(userReq);
    User.findOne({ _id: ObjectID(userTofollow) }, function(err, user) {
        if (user.followers.indexOf("" + userReq._id + "") != -1) {
            res.status(400).json({ success: false });
            return;
        }
        user.followers.push(userReq._id);
        var followedUser = userTofollow;
        user.save(function(err) {
            if (err) {
                res.status(400).json({ success: false })
                return;
            } else {
                User.findOne({ username: userReq.username }, function(err, user) {
                    user.following.push(followedUser);
                    user.save(function(err) {
                        if (err) {
                            res.status(400).json({ success: false })
                            return;
                        } else {
                            res.status(200).json({ success: true })
                        }
                    });
                });
            }
        });
    });
}

module.exports = function(application) {
    return UsersModel;
}