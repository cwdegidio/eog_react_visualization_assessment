import * as actions from '../actions';

const initialState = [];

const initialMetricsReceived = (state, action) => {
  console.log(action);
  const { getMetrics } = action;
  return getMetrics;
};

const handlers = {
  [actions.INITIAL_METRICS_RECEIVED]: initialMetricsReceived,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === 'undefined') return state;
  return handler(state, action);
};
