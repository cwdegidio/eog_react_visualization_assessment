import * as actions from '../actions';

const initialState = [''];

const setSelectedMetrics = (state, action) => {
  const { metric } = action;
  const newState = [...state];

  newState.splice(0, 1);
  newState.push(metric);

  return newState;
};

const handlers = {
  [actions.SET_SELECTED_METRICS]: setSelectedMetrics,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === 'undefined') return state;
  return handler(state, action);
};
