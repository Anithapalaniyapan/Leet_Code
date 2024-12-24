// /src/components/QuestionForm.jsx

import React, { useState } from 'react';
import { submitFeedbackQuestion } from '../services/api';

const QuestionForm = () => {
  const [questionText, setQuestionText] = useState('');
  const [course, setCourse] = useState('');
  const [staffName, setStaffName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const questionData = {
      questionText,
      course,
      staffName,
    };
    
    const response = await submitFeedbackQuestion(questionData);
    alert(response.message);
  };

  return (
    <div>
      <h2>Add Feedback Question</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} />
        </label>
        <label>
          Course:
          <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} />
        </label>
        <label>
          Staff Name:
          <input type="text" value={staffName} onChange={(e) => setStaffName(e.target.value)} />
        </label>
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
};

export default QuestionForm;
