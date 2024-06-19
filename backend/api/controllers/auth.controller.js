const User = require('../../models/User.js');
const bcryptjs = require('bcryptjs');
const bp = require('body-parser');
const validator = require('validator');

const validateInput = (email, password) => {

    if (!email || !password) {
        return { error: 'All fields not filled' };
    }
    if (!validator.isEmail(email)) {
        return { error: 'Invalid email' };
    }
    if (!validator.isStrongPassword(password)) {
        return { error: 'Invalid password' };
    }

    // No errors
    return null; 
};

const signup = async (req, res) => {
    const {username, email, firstName, lastName, 
        middleName, password, dateOfBirth, userType} = req.body;
    
    // Validate email and password
    const ifValid = validateInput(email, password);

    if (ifValid) {
        res.status(400).json(ifValid);
    }
    // Check if email exists
    const exists = await User.findOne(email);
    if (!exists) {
        res.status(400).json({error: "Email already in use"});
        return;
    }

    // Hash password and create new user
    const hashedPassword = bcryptjs.hashsync(password, 10);
    const newUser = new User({username, email, firstName, lastName, 
        middleName, password: hashedPassword, dateOfBirth: Date(dateOfBirth), userType});

    // Save data into database
    try {
        await newUser.save();
        res.status(201).json('User created successfully');
    } catch (error) {
        res.status(500).json('Error creating failed');
    }
};

module.exports = signup;