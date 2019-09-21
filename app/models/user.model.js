const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    profile: String,
    firstName: String,
    lastName: String,
    dob: String,
    city: String,
    centerName: String,
    centerSDate: String
}, {
    timestemp: true,
});

module.exports = mongoose.model('User', UserSchema);