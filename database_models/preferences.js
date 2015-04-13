var Waterline = require('waterline');

var Preferences = {
    tableName: 'preferences',
    schema: false,
    connection: 'localDiskDb',

    attributes: {
        userSignupAllowed: {
            type: 'boolean',
            defaultsTo: true
        },

        toJSON: function() {
            var obj = this.toObject()
            return obj;
        }
    }
};

module.exports = Preferences;