import React, { useEffect } from 'react';
import { Provider, createClient, useQuery } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import * as actions from '../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
  query{ getMetrics }
`;

const getMetricNames = (state) => state.metrics;

export default () => (
  <Provider value={client}>
    <Selector />
  </Provider>
);

const Selector = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [result] = useQuery({
    query,
  });
  const metrics = useSelector(getMetricNames);
  const [selectedMetricNames, setMetricNames] = React.useState([]);
  const { fetching, data, error } = result;

  function handleChange(event) {
    setMetricNames(event.target.value);
  }

  // Get Initial Metrics
  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }

    if (!data) return;

    const { getMetrics } = data;
    dispatch({ type: actions.INITIAL_METRICS_RECEIVED, getMetrics });
  }, [dispatch, data, error]);

  useEffect(() => {
    dispatch({ type: actions.SET_SELECTED_METRICS, selectedMetricNames });
  }, [dispatch, selectedMetricNames]);

  if (fetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-checkbox">
          Metric Selector
        </InputLabel>
        <Select
          multiple
          value={selectedMetricNames}
          onChange={handleChange}
          input={<Input id="select-multiple-checkbox" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {metrics.map((metric) => (
            <MenuItem key={metric} value={metric}>
              <Checkbox checked={selectedMetricNames.indexOf(metric) > -1} />
              <ListItemText primary={metric} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
