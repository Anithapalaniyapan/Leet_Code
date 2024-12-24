const { queryDatabase } = require('../config/db');
const { validationResult } = require('express-validator');

// Submit Feedback
const submitFeedback = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, role, category, message, rating } = req.body;

  try {
    const result = await queryDatabase(
      'INSERT INTO feedback (user_id, role, category, message, rating, submitted_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [userId, role, category, message, rating]
    );
    res.status(201).json({ message: 'Feedback submitted successfully', feedbackId: result.insertId });
  } catch (error) {
    next(error);
  }
};

// View Performance Scores
const viewPerformanceScores = async (req, res, next) => {
  try {
    const scores = await queryDatabase(
      'SELECT category, AVG(rating) AS average_rating FROM feedback GROUP BY category'
    );
    res.status(200).json(scores);
  } catch (error) {
    next(error);
  }
};

// View Individual Student Ratings
const viewStudentRatings = async (req, res, next) => {
  const { userId } = req.params; // Extract userId from route params

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Query to fetch student details along with their feedback
    const ratings = await queryDatabase(
      `SELECT 
        users.name, 
        users.course, 
        users.year, 
        feedback.category, 
        feedback.rating, 
        feedback.message, 
        feedback.submitted_at
      FROM feedback 
      JOIN users ON feedback.user_id = users.user_id 
      WHERE feedback.user_id = ?`,
      [userId]
    );

    if (ratings.length === 0) {
      return res.status(404).json({ message: 'No feedback found for this student' });
    }

    res.status(200).json(ratings);
  } catch (error) {
    next(error);
  }
};

module.exports = { submitFeedback, viewPerformanceScores, viewStudentRatings };
