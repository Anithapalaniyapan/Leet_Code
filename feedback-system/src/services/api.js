// /src/services/api.js

const API_URL = 'http://localhost:5000/api'; // Replace with your actual backend URL

// Get User Data (for any role)
export const getUserData = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}`);
  return response.json();
};

// Submit Feedback
export const submitFeedback = async (feedbackData) => {
  const response = await fetch(`${API_URL}/feedback/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feedbackData),
  });
  return response.json();
};

// Submit Feedback Question (for staff)
export const submitFeedbackQuestion = async (questionData) => {
  const response = await fetch(`${API_URL}/questions/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(questionData),
  });
  return response.json();
};

// Get Overall Performance (for academic director and executive director)
export const getPerformanceData = async () => {
  const response = await fetch(`${API_URL}/feedback/performance`);
  return response.json();
};

// Get Individual Performance (for executive director)
export const getIndividualPerformance = async () => {
  const response = await fetch(`${API_URL}/feedback/student`);
  return response.json();
};
