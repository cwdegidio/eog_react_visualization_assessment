import * as actions from '../actions';

const initialState = [];

const setSelectedMetrics = (state, action) => {
  const { selectedMetricNames } = action;
  // TODO Fix selected logic, clear the array of the final item.
  return selectedMetricNames || [];
};

const handlers = {
  [actions.SET_SELECTED_METRICS]: setSelectedMetrics,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === 'undefined') return state;
  return handler(state, action);
};