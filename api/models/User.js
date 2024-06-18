const mongoose = require('mongoose');

// User schema keeping track of username, email, full fame, password, DOB, and usertypes.

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    userType: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);