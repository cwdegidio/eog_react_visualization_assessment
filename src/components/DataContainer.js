import React, { useEffect } from 'react';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import {
  createClient, Provider, defaultExchanges, subscriptionExchange, useSubscription,
} from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import uuidv4 from 'uuid/v4';
import { makeStyles } from '@material-ui/core/styles';
import DataCard from './DataCard';
import * as actions from '../store/actions';

const useStyles = makeStyles({
  dataContainer: {
    width: '100%',
    display: 'flex',
  },
});


const subscriptionClient = new SubscriptionClient(
  'ws://react.eogresources.com/graphql',
  {},
);

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [...defaultExchanges, subscriptionExchange({
    forwardSubscription: (operation) => subscriptionClient.request(operation),
  })],
});

const subQuery = `
  subscription {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;

export default () => (
  <Provider value={client}>
    <DataContainer />
  </Provider>
);

const getValues = (state) => state.metricValues;

const DataContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const values = useSelector(getValues);

  // Subscription side effect
  const [subResult] = useSubscription({
    query: subQuery,
    variables: {},
  });

  const { data, error } = subResult;

  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }

    if (!data) return;
    dispatch({ type: actions.METRIC_VALUE_SUBSCRIPTION_RECEIVED, data });
  }, [dispatch, data]);


  return (
    <div className={classes.dataContainer}>
      {values.metricValues.map((metricValue) => {
        const { metric } = metricValue;
        const latestMeasurement = metricValue.measurements[metricValue.measurements.length - 1] || null;
        if (latestMeasurement) {
          return (
            <DataCard
              key={uuidv4()}
              metric={metric}
              value={latestMeasurement.value}
              unit={latestMeasurement.unit}
            />
          );
        }
        return null;
      })}
    </div>
  );
};
