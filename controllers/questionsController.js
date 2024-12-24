const { queryDatabase } = require('../config/db');

// Add a new feedback question
const addQuestion = async (req, res, next) => {
  const { questionText, course, staffName } = req.body;

  if (!questionText || !course || !staffName) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await queryDatabase(
      'INSERT INTO feedback_questions (question_text, course, staff_name) VALUES (?, ?, ?)',
      [questionText, course, staffName]
    );
    res.status(201).json({ message: 'Question added successfully', questionId: result.insertId });
  } catch (error) {
    next(error);
  }
};

// Get all feedback questions
const getQuestions = async (req, res, next) => {
  try {
    const questions = await queryDatabase('SELECT * FROM feedback_questions');
    res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
};

module.exports = { addQuestion, getQuestions };
