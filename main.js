var hapi = require('hapi'),
	mongoose = require('mongoose'),
	User = require('./user-model'),
	routes = require('./routes/all_routes').routes;

// Variables that need to be configured
var databaseName = 'mydatabase',
	cookiePassword = "REPLACE THIS WITH A REAL PASSWORD",
	serverPort = 8000;

// Setup and connect to the database
mongoose.connect('mongodb://localhost/' + databaseName);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("connected to database " + databaseName);
});

// Setup the server options
var serverOptions = {
	views: {
		path: 'html_templates',
		engines: {
			html: 'handlebars'
		}
	}
};

// Configure the server
var server = new hapi.Server('localhost', serverPort, serverOptions);

// Setup the session tracking
// Change 'isSecure' to true if using SSL
var yarOptions = {
	ttl: 3 * 24 * 60 * 60 * 1000, // 3 days
	cookieOptions: {
		password: cookiePassword,
		isSecure: false
	}
};

// Setup the Hapi plugins being used. In this case it's only Yar
server.pack.require({ yar: yarOptions }, function (err) {
    if (err) {
        console.log('Failed loading plugins');
    }
});

// Setup the routes
server.route(routes);

// Redirect request to missing resources to '404.html'
server.ext('onPreResponse', function (request, next) {
	if (typeof(request.response.output) !== 'undefined' && request.response.output.statusCode === 404) {
		next.view('404.html', {});
	} else {
		next();
	}
});

// Start the server
server.start();