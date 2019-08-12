import React, { useEffect } from 'react';
import { Provider, createClient, useQuery } from 'urql';
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
  query{ getMetrics }
`;

export default () => (
  <Provider value={client}>
    <Dashboard />
  </Provider>
);

const Dashboard = () => {
  const dispatch = useDispatch();

  const [result] = useQuery({
    query,
  });

  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }

    if (!data) return;

    const { getMetrics } = data;
    console.log(getMetrics);
    dispatch({ type: actions.INITIAL_METRICS_RECEIVED, getMetrics });
  });

  if (fetching) {
    return <div>Loading...</div>;
  }

  return (
    <div>Completed</div>
  );
};
