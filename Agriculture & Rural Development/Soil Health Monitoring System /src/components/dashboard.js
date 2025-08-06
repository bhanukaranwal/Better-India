// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
function Dashboard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('/api/soil-history')
      .then(r => r.json())
      .then(d => setData(d.history));
  }, []);
  return (
    <div>
      <h2>Soil Health Dashboard</h2>
      {data.map(d => (
        <div key={d.id}>
          <p>Moisture: {d.moisture}</p>
          {/* ...other metrics... */}
          <p>Recommendation: {d.recommendation}</p>
        </div>
      ))}
    </div>
  );
}
export default Dashboard;
