import React, { useEffect } from 'react';
import { Provider, createClient, useQuery } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import MetricCard from './MetricCard';

// eslint-disable-line react-hooks/rules-of-hooks

const getSelectedMetrics = (state) => state.selectedMetrics;

export default () => {
  const selectedMetrics = useSelector(getSelectedMetrics);
  console.log(selectedMetrics);

  return (
    <div>
      {selectedMetrics.map((selectedMetric) => (
        <MetricCard key={selectedMetric} metricName={selectedMetric} />
      ))}
    </div>
  );
};
