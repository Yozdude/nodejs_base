var Hapi = require('hapi'),
    NunjucksHapi = require('nunjucks-hapi'),
    Config = require('./config');


var server = new Hapi.Server();

server.connection({ port: Config.server.port });

// Register Hapi plugins
server.register([{
    register: require('hapi-auth-cookie'),
    options: {},
},{
    register: require('dogwater'),
    options: Config.database
}], function (err) {
    if (err) throw(err);

    // Define the auth strategy
    server.auth.strategy('session', 'cookie', {
        password: Config.security.cookie.secret,
        cookie: Config.security.cookie.name,
        redirectTo: '/login',
        isSecure: Config.security.cookie.isSecure,
        ttl: Config.security.cookie.ttl
    });

    // Create the routes
    server.route(require('./hapi_routes/all'));

    // Setup Nunjucks as the templating engine
    var env = NunjucksHapi.configure(Config.nunjucks.templatePath);
    server.views({
        engines: {
            html: NunjucksHapi
        },
        path: Config.nunjucks.templatePath
    });

    // Start the Hapi server
    server.start(function (err) {
        if (err) throw(err);
        
        console.log("Hapi server running at: " + server.info.uri);
    });
});