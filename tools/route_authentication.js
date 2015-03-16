var requireLogin = function (route) {
    route.config.auth = 'session';
}

var tryLogin = function (route) {
    route.config.auth = {
        mode: 'try',
        strategy: 'session'
    };
    noLogin(route);
}

var noLogin = function (route) {
    if (route.config.plugins) {
        route.config.plugins['hapi-auth-cookie'] = {
            redirectTo: false
        }
    } else {
        route.config.plugins = {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        }
    }
}

module.exports = {
    requireLogin: requireLogin,
    tryLogin: tryLogin,
    noLogin: noLogin
}