var Hapi = require('hapi'),
	Mongoose = require('mongoose'),
	routes = require('./routes/all_routes').routes;

// Variables that need to be configured
var databaseName = 'mydatabase',
	cookiePassword = "REPLACE THIS WITH A REAL PASSWORD",
	serverPort = 8000;

// Setup and connect to the database
Mongoose.connect('mongodb://localhost/' + databaseName);
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("connected to database:", databaseName);
});

// Configure the server
var server = new Hapi.Server(serverPort);

// Setup Handlebars for the server
server.views({
	engines: {
		html: require('handlebars')
	},
	path: './html_templates'
});

// Setup the session/cookie plugin
var yarOptions = {
	cookieOptions: {
		password: cookiePassword,
		isSecure: false // Required if not using https
	}
};

// Register the Yar plugin
server.pack.register({
    plugin: require('yar'),
    options: yarOptions
}, function (err) {
	if (err) {
		console.log("Error loading pack:", err);
	}
	
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
	
	console.log("Server started");
});