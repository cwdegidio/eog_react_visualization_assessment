import * as actions from '../actions';

const initialState = [];

const setInitialMetrics = (state, action) => {

  // TODO: Fix action to remove previous values.
  const { initialValues } = action;
  let newState = [...state];
  const index = newState.findIndex(i => i.metric === initialValues.metric);
  if (index === -1) {
    newState.push(initialValues);
  } else {
    newState = newState.slice(index, 1);
    newState.push(initialValues);
  }

  return newState;
};

const handlers = {
  [actions.SET_INITIAL_METRIC_VALUE]: setInitialMetrics,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === 'undefined') return state;
  return handler(state, action);
};
