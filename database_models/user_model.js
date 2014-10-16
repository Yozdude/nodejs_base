var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// An example MongoDB model for a User object. Much less complex than it really would be.

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    email: { type: String, required: true },
    authenticated: { type: Boolean, required: true, default: false }
});
UserSchema.index({ username: 1, email: 1 }, { unique: true });

UserSchema.virtual('isAuthenticated').get(function() {
    return this.authenticated;
});

module.exports = mongoose.model('User', UserSchema);