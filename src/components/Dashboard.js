import React, { useEffect } from 'react';
import {
  Provider, createClient, useQuery, Query,
} from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import uuidv4 from 'uuid/v4';
import * as actions from '../store/actions';
import DataContainer from './DataContainer';
import Chart from './Chart';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const getMetricNames = `
  query{
    getMetrics
  }
`;

const heartBeatQuery = `
  query{
    heartBeat
  }
`;

const initialMeasurementsQuery = `
  query($metricName: String!, $after: Timestamp!, $before: Timestamp!){
    getMultipleMeasurements(input: {
    metricName: $metricName,
    after: $after,
    before: $before
  }) {
    metric
    measurements {
      at
      value
      unit
    }
  }
  }
`;


const getMetricsFromState = (state) => state.metrics;


export default () => (
  <Provider value={client}>
    <Dashboard />
  </Provider>
);

const Dashboard = () => {
  const dispatch = useDispatch();


  // Initial metric names
  const [metrics] = useQuery({
    query: getMetricNames,
  });

  // This will create an object with the initial metric list and their visibility state
  useEffect(() => {
    if (metrics.error) {
      return;
    }

    if (!metrics.data) return;

    const initMetrics = metrics.data.getMetrics;
    dispatch({ type: actions.INITIAL_METRICS_RECEIVED, initMetrics });
  }, [dispatch, metrics.error, metrics.data, metrics]);

  // Initial Metric Values
  const [heartBeat] = useQuery({
    query: heartBeatQuery,
  });

  // Dispatch for initial metric names
  const metricsArray = useSelector(getMetricsFromState);

  let before = 0;
  if (heartBeat.data) {
    before = heartBeat.data.heartBeat;
  }
  const thirtyMinutes = (30 * 60 * 1000);
  const after = before - thirtyMinutes;

  return (
    <div>
      {metricsArray.map((metricObj) => {
        const metricName = metricObj.metric;
        return (
          <Query
            query={initialMeasurementsQuery}
            variables={{ metricName, after, before }}
            key={uuidv4()}
          >
            {({ fetching, data, error }) => {
              if (fetching) {
                return 'Loading...';
              } if (error) {
                return 'Oh no!';
              }
              const initMetricValue = data.getMultipleMeasurements[0];
              dispatch({ type: actions.SET_INITIAL_METRIC_VALUE, initMetricValue });
              return null;
            }}
          </Query>
        );
      })}
      <DataContainer />
      <Chart />
    </div>
  );
};
