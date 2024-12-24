const express = require('express');
const { createUser, getUserDetails } = require('../controllers/userController');

const router = express.Router();

// Route to create a new user (student or staff)
router.post('/create', createUser);

// Route to get user details
router.get('/:userId', getUserDetails);

module.exports = router;
