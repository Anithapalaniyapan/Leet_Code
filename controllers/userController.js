const { queryDatabase } = require('../config/db');

// Create a new user (student or staff)
const createUser = async (req, res, next) => {
  const { name, role, course, year } = req.body;

  if (!name || !role || !course || (role === 'student' && !year)) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await queryDatabase(
      'INSERT INTO users (name, role, course, year) VALUES (?, ?, ?, ?)',
      [name, role, course, year || null]
    );
    res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  } catch (error) {
    next(error);
  }
};

// Get user details
const getUserDetails = async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const user = await queryDatabase(
      'SELECT * FROM users WHERE user_id = ?',
      [userId]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, getUserDetails };

