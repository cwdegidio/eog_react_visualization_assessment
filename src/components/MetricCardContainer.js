import React from 'react';
import { useSelector } from 'react-redux';
import MetricCard from './MetricCard';

const getSelectedMetrics = (state) => state.selectedMetrics;

const MetricCardContainer = () => {
  const selectedMetrics = useSelector(getSelectedMetrics);

  return (
    <div>
      {selectedMetrics.map((selectedMetric) => (
        <MetricCard metricName={selectedMetric} />
      ))}
    </div>
  );
};

export default MetricCardContainer;
