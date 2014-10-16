var hapi = require('hapi')

// Serve all files in the 'public' folder as static resources.
// Used to provide css, js, and image files.
var staticRoute = {
	method: 'GET',
    path: '/{path*}',
    handler: {
        directory: { path: './public', listing: false, index: true }
    }
};

module.exports.routes = [staticRoute]