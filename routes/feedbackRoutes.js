const express = require('express');
const { body } = require('express-validator');
const { submitFeedback, viewPerformanceScores, viewStudentRatings } = require('../controllers/feedbackController');

const router = express.Router();

router.post(
  '/submit',
  [
    body('userId').notEmpty().withMessage('User ID is required'),
    body('role').isIn(['student', 'faculty']).withMessage('Invalid role'),
    body('category').notEmpty().withMessage('Category is required'),
    body('message').notEmpty().withMessage('Message is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  ],
  submitFeedback
);

router.get('/performance', viewPerformanceScores);

// New Route to View Individual Student Ratings
router.get('/student/:userId', viewStudentRatings);

module.exports = router;
