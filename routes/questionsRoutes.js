const express = require('express');
const { addQuestion, getQuestions } = require('../controllers/questionsController');

const router = express.Router();

// Add a new feedback question
router.post('/add', addQuestion);

// Get all feedback questions
router.get('/', getQuestions);

module.exports = router;
