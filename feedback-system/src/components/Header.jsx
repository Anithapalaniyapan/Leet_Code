// /src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ userRole }) => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {userRole === 'student' && <li><Link to="/submit-feedback">Submit Feedback</Link></li>}
          {userRole === 'staff' && <li><Link to="/staff-submit-feedback">Submit Feedback</Link></li>}
          {userRole === 'academic_director' && <li><Link to="/performance-overview">View Performance</Link></li>}
          {userRole === 'executive_director' && <li><Link to="/individual-performance">View Individual Performance</Link></li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
