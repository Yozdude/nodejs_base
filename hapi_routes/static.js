var RouteAuthentication = require('../tools/route_authentication'),
    Config = require('../config');

// Serve all files in the 'public' folder as static resources.
// Used to provide css, js, and image files.
var staticFileRoute = {
	method: 'GET',
    path: '/public/{param*}',
    handler: {
        directory: {
            path: 'public',
            listing: false,
            index: true
        }
    }
};

// Serve the 404 route
var FileNotFoundRoute = {
    method: '*',
    path: '/{p*}',
    handler: function(request, reply) {
        reply.view("404.html", {
            app: Config.app
        }).code(404);
    }
}

// Serve the root route
var indexRoute = {
    method: 'GET',
    path: '/',
    config: {
        handler: function(request, reply) {
            reply.view('index.html', {
                app: Config.app,
                user: request.auth.credentials
            });
        }
    }
}


RouteAuthentication.requireLogin(indexRoute);
module.exports = [staticFileRoute, FileNotFoundRoute, indexRoute]