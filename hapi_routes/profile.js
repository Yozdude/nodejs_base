var Joi = require('joi'),
    RouteAuthentication = require('../tools/route_authentication'),
    Config = require('../config');

var profileRoute = {
    method: 'GET',
    path: '/profile',
    config: {
        handler: function(request, reply) {
            console.log(request.auth.credentials);
            reply.view('profile.html', {
                app: Config.app,
                user: request.auth.credentials,
                navProfile: true
            });
        }
    }
}

var changePasswordRoute = {
    method: 'POST',
    path: '/profile/password/change',
    config: {
        validate: {
            payload: {
                oldPassword: Joi.string().required(),
                newPassword: Joi.string().min(4, 'utf8').max(256, 'utf8').required()
            }
        },
        handler: function(request, reply) {
            var User = request.model.user;
            User.findOne({ email: request.auth.credentials.email })
            .then(function (user) {
                if (user) {
                    user.verifyPassword(request.payload.oldPassword, function (err, isMatch) {
                        if (err) throw err;

                        if (isMatch) {
                            user.changePassword(request.payload.newPassword, function (err, u) {
                                if (err) throw err;

                                reply({ success: "Password Saved" });
                            });
                        } else {
                            reply({ error: "Incorrect password" });
                        }
                    });
                } else {
                    reply({ error: "Database error: user not found" });
                }
            })
            .catch(function (e) {
                throw e;
            });
        }
    }
}

RouteAuthentication.requireLogin(profileRoute);
RouteAuthentication.requireLogin(changePasswordRoute);

module.exports = [profileRoute, changePasswordRoute];