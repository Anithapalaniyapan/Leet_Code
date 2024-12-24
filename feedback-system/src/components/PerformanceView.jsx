// /src/components/PerformanceView.jsx

import React, { useEffect, useState } from 'react';
import { getPerformanceData } from '../services/api';

const PerformanceView = () => {
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    const fetchPerformance = async () => {
      const data = await getPerformanceData();
      setPerformanceData(data);
    };
    
    fetchPerformance();
  }, []);

  return (
    <div>
      <h2>Overall Performance</h2>
      <ul>
        {performanceData.map((item, index) => (
          <li key={index}>
            Category: {item.category} - Average Rating: {item.average_rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PerformanceView;
