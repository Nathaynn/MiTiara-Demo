const User = require('../../models/User.js');
const bcryptjs = require('bcryptjs');
const bp = require('body-parser');
const validator = require('validator');
const jwt = require('jsonwebtoken');

// TODO: Create a private secret key in .env
const createToken = (_id) => {
    return jwt.sign({_id}, 'TEMPORARYSECRETKEY', {expiresIn: '3d'});
};


// Validates an email and password before being implemented into the db
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
        return;
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
        const token = createToken(newUser._id);
        res.status(201).json({email, token});
    } catch (error) {
        res.status(500).json({error: 'User creation failed'});
    }
};

const login = async (req, res) => {
    const {email, password} = req.body;
    const ifValid = validateInput(email, password);

    if (ifValid) {
        res.status(400).json(ifValid);
        return;
    }

    const user = User.findOne({email});
    if (!user) {
        res.status(400).json({error: "Incorrect credentials"});
        return;
    }

    const match = await bcryptjs.match(password, user.password);
    if (!match) {
        res.status(400).json({error: "Incorrect credentials"});
        return;
    }

    const token = jwt.sign(user._id);
    res.status(200).json({email, token});

}

module.exports = signup;
module.exports = login;