import React, { useEffect } from 'react';
import { Provider, createClient, useQuery } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../store/actions";

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

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

export default (props) => (
  <Provider value={client}>
    <MetricCard metricName={props.metricName}/>
  </Provider>
);


const MetricCard = ({ metricName }) => {
  const thirtyMinutes = (30 * 60 * 1000);
  const dispatch = useDispatch();

  const [heartBeat] = useQuery({
    query: heartBeatQuery,
  });

  let before = 0;

  if (heartBeat.data) {
    before = heartBeat.data.heartBeat;
  }

  const after = before - thirtyMinutes;

  console.log(`BEFORE: ${before}`);
  console.log(`AFTER: ${after}`);
  console.log(`METRIC NAME: ${metricName}`);

  const [result] = useQuery({
    query: initialMeasurementsQuery,
    variables: {
      metricName,
      after,
      before,
    },
  });

  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }

    if (!data) return;

    const initialValues = data.getMultipleMeasurements[0];
    dispatch({ type: actions.SET_INITIAL_METRIC_VALUE, initialValues });
  }, [dispatch, error, data]);

  if (fetching) {
    return (
      <div>
        <h4>Metric Card</h4>
        <p>{metricName}</p>
        <h2>Loading...</h2>
      </div>
    );
  }

   let value = null;
  // if(data.getMultipleMeasurements[0].measurements[data.getMultipleMeasurements[0].measurements.length - 1].value) {
  //   value = data.getMultipleMeasurements[0].measurements[data.getMultipleMeasurements[0].measurements.length - 1].value;
  // }

  return (
    <div>
      <h4>Metric Card</h4>
      <p>{metricName}</p>
      <h2>{value ? value : 'Initializing...'}</h2>
    </div>
  );
};
