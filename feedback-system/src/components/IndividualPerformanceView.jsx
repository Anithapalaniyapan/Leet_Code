// /src/components/IndividualPerformanceView.jsx

import React, { useEffect, useState } from 'react';
import { getIndividualPerformance } from '../services/api';

const IndividualPerformanceView = () => {
  const [individualPerformance, setIndividualPerformance] = useState([]);

  useEffect(() => {
    const fetchPerformance = async () => {
      const data = await getIndividualPerformance();
      setIndividualPerformance(data);
    };

    fetchPerformance();
  }, []);

  return (
    <div>
      <h2>Individual Performance</h2>
      <ul>
        {individualPerformance.map((item, index) => (
          <li key={index}>
            {item.name} ({item.course}): Rating - {item.rating}, Message - {item.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndividualPerformanceView;
