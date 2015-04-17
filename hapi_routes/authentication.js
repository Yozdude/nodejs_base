var Joi = require('joi'),
    RouteAuthentication = require('../tools/route_authentication'),
    Config = require('../config');

// The login page
var loginPageRoute = {
    method: 'GET',
    path: '/login',
    config: {
        handler: function(request, reply) {
            if (request.auth.isAuthenticated) {
                return reply.redirect('/');
            }

            reply.view("login.html", { app: Config.app });
        }
    }
};

// Attempts to log the user in with the given credentials
var loginPostRoute = {
    method: 'POST',
    path: '/login',
    config: {
        validate: {
            payload: {
                email: Joi.string().email().required(),
                password: Joi.string().required()
            }
        },
        handler: function(request, reply) {
            if (request.auth.isAuthenticated) {
                reply({ redirect: "/" });
            }

            var User = request.model.user;

            User.findOne({ email: request.payload.email })
            .then(function (user) {
                if (user) {
                    user.verifyPassword(request.payload.password, function(err, isMatch) {
                        if (err) throw err;

                        if (isMatch) {
                            request.auth.session.set(user.toJSON());
                            reply({ redirect: "/" });
                        } else {
                            reply({ error: "Invalid credentials" });
                        }
                    });
                } else {
                    User.create({
                        email: request.payload.email,
                        password: request.payload.password
                    }, function (err, newUser) {
                        if (err) throw err;

                        request.auth.session.set(newUser.toJSON());
                        reply({ redirect: "/" });
                    });
                }
            })
            .catch(function (e) {
                throw e;
            });
        }
    },
};

// Logging out
var logoutPostRoute = {
    method: ['GET', 'POST'],
    path: '/logout',
    config: {
        handler: function(request, reply) {
            request.auth.session.clear();
            return reply.redirect("/");
        }
    }
}

RouteAuthentication.tryLogin(loginPageRoute);
RouteAuthentication.tryLogin(loginPostRoute);
RouteAuthentication.requireLogin(logoutPostRoute);

module.exports = [loginPageRoute, loginPostRoute, logoutPostRoute]