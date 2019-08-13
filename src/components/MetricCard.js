import React from 'react';

const MetricCard = ({ metricName }) => {
  return (
    <div>
      <h4>Metric Card</h4>
      <p>{metricName}</p>
    </div>
  );
};

export default MetricCard;