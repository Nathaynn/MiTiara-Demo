const User = require('../../models/User.js');
const bcryptjs = require('bcryptjs');
const bp = require('body-parser');
const signup = async (req, res) => {
    console.log(req.body);
    const {username, email, firstName, lastName, 
        middleName, password, dateOfBirth, userType} = req.body;
    const hashedPassword = bcryptjs.hashsync(password, 10);
    const newUser = new User({username, email, firstName, lastName, 
        middleName, password: hashedPassword, dateOfBirth: Date(dateOfBirth), userType});
    try {
        await newUser.save();
        res.status(201).json('User created successfully');
    } catch (error) {
        res.status(550).json('Error creating failed');
    }
};

module.exports = signup;