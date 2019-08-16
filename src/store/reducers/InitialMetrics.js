import * as actions from '../actions';

const initialState = [];

const initialMetricsReceived = (state, action) => {
  const { initMetrics } = action;
  const newState = [...state];
  initMetrics.map((metric) => {
    const initializedMetric = {
      metric,
    };
    newState.push(initializedMetric);
    return null;
  });
  return newState;
};

const handlers = {
  [actions.INITIAL_METRICS_RECEIVED]: initialMetricsReceived,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === 'undefined') return state;
  return handler(state, action);
};
