var all_routes = [];

Array.prototype.push.apply(all_routes, require('./static'));
Array.prototype.push.apply(all_routes, require('./authentication'));
Array.prototype.push.apply(all_routes, require('./showcase'));
Array.prototype.push.apply(all_routes, require('./profile'));
module.exports = all_routes;