var path = require('path');

module.exports = {
    database: {
        connections: {
            localDiskDb: {
                adapter: 'disk'
            }
        },
        adapters: {
            disk: require('sails-disk')
        },
        models: require('./database_models/all')
    },
    server: {
        hapi: {
            port: 8000
        },
        browserSync: {
            port: 3000
        }
    },
    nunjucks: {
        templatePath: path.join(__dirname, 'html_templates/')
    },
    app: {
        name: "Node.js Base",
        version: "1.0",
        creatorName: "Yozdude",
        creatorUrl: "https://github.com/Yozdude"
    },
    security: {
        cookie: {
            secret: 'superseekrit',
            name: 'nodejs_base_cookie',
            isSecure: false, // Change to true if you're using SSL
            ttl: 7 * 24 * 60 * 60 * 1000 // Time-to-live of 7 days
        }
    },
    thirdParty: {
        js: [
            'bower_components/sweetalert/lib/sweet-alert.js'
        ],
        css: [
            'bower_components/sweetalert/lib/sweet-alert.css'
        ]
    }
};