var Waterline = require('waterline'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var User = {
    tableName: 'user',
    schema: false,
    connection: 'localDiskDb',

    attributes: {
        email: {
            type: 'string',
            required: true,
            unique: true,
            index: true
        },
        password: {
            type: 'string',
            required: true,
            minLength: 4,
            maxLength: 256
        },

        verifyPassword: function(candidatePassword, cb) {
            bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
                if (err) return cb(err);
                cb(null, isMatch);
            });
        },

        changePassword: function(newPassword, cb) {
            this.newPassword = newPassword;
            this.save(function(err, u) {
                return cb(err, u);
            });
        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },

    beforeCreate: function(values, cb) {
        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return cb(err);

            // hash the password along with our new salt
            bcrypt.hash(values.password, salt, function(err, hash) {
                if (err) return cb(err);

                // override the cleartext password with the hashed one
                values.password = hash;
                return cb();
            });
        });
    },

    beforeUpdate: function(values, cb) {
        if (attrs.newPassword) {
            // generate a salt
            bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
                if (err) return cb(err);

                // hash the password along with our new salt
                bcrypt.hash(values.newPassword, salt, function(err, hash) {
                    if (err) return cb(err);

                    // override the cleartext password with the hashed one
                    delete values.newPassword;
                    values.password = hash;
                    return cb();
                });
            });
        } else {
            return cb();
        }
    }
};

module.exports = User;