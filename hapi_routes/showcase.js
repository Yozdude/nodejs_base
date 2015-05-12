var RouteAuthentication = require('../tools/route_authentication'),
    Config = require('../config');

var showcaseRoute = {
    method: 'GET',
    path: '/showcase',
    config: {
        handler: function(request, reply) {
            reply.view('showcase.html', {
                app: Config.app,
                user: request.auth.credentials,
                navShowcase: true
            });
        }
    }
}

var successMessageRoute = {
    method: 'POST',
    path: '/showcase/message/success',
    config: {
        handler: function(request, reply) {
            reply({ success: "Testing the success message" });
        }
    }
};

var infoMessageRoute = {
    method: 'POST',
    path: '/showcase/message/info',
    config: {
        handler: function(request, reply) {
            reply({ info: "Testing the info message" });
        }
    }
};

var warningMessageRoute = {
    method: 'POST',
    path: '/showcase/message/warning',
    config: {
        handler: function(request, reply) {
            reply({ warning: "Testing the warning message" });
        }
    }
};

var errorMessageRoute = {
    method: 'POST',
    path: '/showcase/message/error',
    config: {
        handler: function(request, reply) {
            reply({ error: "Testing the error message" });
        }
    }
};

var redirectRoute = {
    method: 'POST',
    path: '/showcase/redirect',
    config: {
        handler: function(request, reply) {
            reply({ redirect: "/" });
        }
    }
};

var genericPopupRoute = {
    method: 'POST',
    path: '/showcase/popup/generic',
    config: {
        handler: function(request, reply) {
            reply({
                popup: {
                    title: "Test Popup",
                    text: "Testing the generic popup"
                }
            });
        }
    }
};

var successPopupRoute = {
    method: 'POST',
    path: '/showcase/popup/success',
    config: {
        handler: function(request, reply) {
            reply({
                popup: {
                    title: "Test Success Popup",
                    text: "Testing the success popup",
                    type: "success"
                }
            });
        }
    }
};

var warningPopupRoute = {
    method: 'POST',
    path: '/showcase/popup/warning',
    config: {
        handler: function(request, reply) {
            reply({
                popup: {
                    title: "Test Warning Popup",
                    text: "Testing the warning popup",
                    type: "warning"
                }
            });
        }
    }
};

var errorPopupRoute = {
    method: 'POST',
    path: '/showcase/popup/error',
    config: {
        handler: function(request, reply) {
            reply({
                popup: {
                    title: "Test Error Popup",
                    text: "Testing the error popup",
                    type: "error"
                }
            });
        }
    }
};

RouteAuthentication.requireLogin(showcaseRoute);
RouteAuthentication.noLogin(successMessageRoute);
RouteAuthentication.noLogin(infoMessageRoute);
RouteAuthentication.noLogin(warningMessageRoute);
RouteAuthentication.noLogin(errorMessageRoute);
RouteAuthentication.noLogin(redirectRoute);
RouteAuthentication.noLogin(genericPopupRoute);
RouteAuthentication.noLogin(successPopupRoute);
RouteAuthentication.noLogin(warningPopupRoute);
RouteAuthentication.noLogin(errorPopupRoute);

module.exports = [showcaseRoute, successMessageRoute, infoMessageRoute, warningMessageRoute, errorMessageRoute, redirectRoute, genericPopupRoute, successPopupRoute, errorPopupRoute, warningPopupRoute]