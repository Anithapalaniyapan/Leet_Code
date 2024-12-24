const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const feedbackRoutes = require('./routes/feedbackRoutes');
const questionsRoutes = require('./routes/questionsRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Allow CORS
app.use(bodyParser.json({ limit: '10kb' })); // Limit JSON payload

// Routes
app.use('/api/feedback', feedbackRoutes);
app.use('/api/questions', questionsRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
