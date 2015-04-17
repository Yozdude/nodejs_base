var Hapi = require('hapi'),
    NunjucksHapi = require('nunjucks-hapi'),
    Winston = require('winston'),
    Config = require('./config');

var server = new Hapi.Server(),
    logger = new (Winston.Logger)({
    transports: [
      new (Winston.transports.Console)(),
      new (Winston.transports.File)({ filename: 'logfile.log' })
    ]
  });
server.connection({ port: Config.server.port });

server.register([
    {
        register: require('hapi-auth-cookie'),
        options: {},
    },{
        register: require('dogwater'),
        options: Config.database
    }
], function (err) {
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

    // Load the preferences
    var Preferences = server.plugins.dogwater.preferences;
    Preferences.findOrCreate().then(function (prefs) {
        logger.info("Preferences loaded");
    }).then(function () {
        // Start the Hapi server
        server.start(function (err) {
            if (err) throw(err);

            logger.info("Hapi server running at: " + server.info.uri);
        });
    }).catch(function (e) {
        throw e;
    });
});