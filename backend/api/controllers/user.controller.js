const User = require('../../models/User.js');
const mongoose = require('mongoose');

const getUser = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error: 'User doesnt exist'});
        return;
    }

    const user = await User.findById(id);
    
    if (!user) {
        res.status(404).json({error: 'User doesnt exist'});
        return;
    }

    res.status(200).json(user);
};

const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
};

module.exports = getUser;