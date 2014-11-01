static_routes = require('./static_routes').routes,
	all_routes = [];

Array.prototype.push.apply(all_routes, static_routes);
module.exports.routes = all_routes;