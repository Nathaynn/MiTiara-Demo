const express = require('express');
const {getUser, getAllUsers} = require('../controllers/user.controller');

router = express.Router;

router.get('/:id', getUser);
router.get('/', getAllUsers);

module.exports = router;