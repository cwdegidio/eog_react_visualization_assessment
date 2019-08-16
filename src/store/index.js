import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import initialMetricsReducer from './reducers/InitialMetrics';
import selectedMetricsReducer from './reducers/SelectedMetrics';
import initialMetricValues from './reducers/InitialMetricValues';

export default () => {
  const rootReducer = combineReducers({
    metrics: initialMetricsReducer,
    selectedMetrics: selectedMetricsReducer,
    metricValues: initialMetricValues,
  });

  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = applyMiddleware(sagaMiddleware);
  const store = createStore(rootReducer, composeEnhancers(middlewares));

  sagas.forEach(sagaMiddleware.run);

  return store;
};
