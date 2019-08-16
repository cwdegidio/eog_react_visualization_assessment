import * as actions from '../actions';

const initialState = {
  metricValues: [],
  latestValue: {},
};

// Updates the metric in the newState with the derived value
function updateMetricValueWithSubData(metric, currentState, updatedValue) {
  const metricIndex = currentState.metricValues.findIndex((element) => {
    return element.metric === metric;
  });
  if (metricIndex !== -1) {
    currentState.metricValues[metricIndex].measurements.shift();
    currentState.metricValues[metricIndex].measurements.push(updatedValue);
  }
}

const setInitialMetricValue = (state, action) => {
  const { initMetricValue } = action;
  const newState = { ...state };
  newState.metricValues.push(initMetricValue);
  return newState;
};


const subscriptionDataReceived = (state, action) => {
  const { data } = action;
  const newState = { ...state };

  newState.latestValue = data.newMeasurement;

  const valueObj = {
    at: newState.latestValue.at,
    value: newState.latestValue.value,
    unit: newState.latestValue.unit,
  };

  switch (newState.latestValue.metric) {
    case 'oilTemp':
      updateMetricValueWithSubData('oilTemp', newState, valueObj);
      break;
    case 'tubingPressure':
      updateMetricValueWithSubData('tubingPressure', newState, valueObj);
      break;
    case 'casingPressure':
      updateMetricValueWithSubData('casingPressure', newState, valueObj);
      break;
    case 'flareTemp':
      updateMetricValueWithSubData('flareTemp', newState, valueObj);
      break;
    case 'waterTemp':
      updateMetricValueWithSubData('waterTemp', newState, valueObj);
      break;
    case 'injValveOpen':
      updateMetricValueWithSubData('injValveOpen', newState, valueObj);
      break;
    default:
      break;
  }




  return newState;
};


const handlers = {
  [actions.SET_INITIAL_METRIC_VALUE]: setInitialMetricValue,
  [actions.METRIC_VALUE_SUBSCRIPTION_RECEIVED]: subscriptionDataReceived,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === 'undefined') return state;
  return handler(state, action);
};
