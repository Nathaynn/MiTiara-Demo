const mongoose = require('mongoose');

// Helper function for validating userTypes
function checkUserTypes(arr) {
    const validTypes = ['customer', 'vendor', 'admin'];
    for (let i = 0; i < arr.length; i++) {
        if (validTypes.indexOf(arr[i]) === -1) {
            return false;
        }
    }
    return true;
}

// User schema keeping track of username, email, full fame, password, DOB, and usertypes.
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
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
        required: true,
        validate: arr => checkUserTypes(arr)
    }
});

module.exports = mongoose.model('User', userSchema);