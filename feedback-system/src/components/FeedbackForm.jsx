// /src/components/FeedbackForm.jsx

import React, { useState } from 'react';
import { submitFeedback } from '../services/api';

const FeedbackForm = () => {
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const feedbackData = {
      userId: 1,  // Assume logged-in user's ID is 1
      role: 'student',
      category,
      message,
      rating,
    };
    
    const response = await submitFeedback(feedbackData);
    alert(response.message);
  };
  
  return (
    <div>
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <label>
          Message:
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <label>
          Rating:
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
