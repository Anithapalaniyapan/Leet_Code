// /src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import FeedbackForm from './components/FeedbackForm';
import StaffFeedbackForm from './components/StaffFeedbackForm';
import PerformanceView from './components/PerformanceView';
import IndividualPerformanceView from './components/IndividualPerformanceView';
import QuestionForm from './components/QuestionForm';

const App = () => {
  const [userRole, setUserRole] = useState('student'); // change the role as needed

  return (
    <Router>
      <Header userRole={userRole} />
      <Routes>
        <Route path="/" element={<h1>Welcome to Feedback System</h1>} />
        <Route path="/submit-feedback" element={<FeedbackForm />} />
        <Route path="/staff-submit-feedback" element={<StaffFeedbackForm />} />
        <Route path="/performance-overview" element={<PerformanceView />} />
        <Route path="/individual-performance" element={<IndividualPerformanceView />} />
        <Route path="/add-question" element={<QuestionForm />} />
      </Routes>
    </Router>
  );
};

export default App;
