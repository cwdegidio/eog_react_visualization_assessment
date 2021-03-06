import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';


const useStyles = makeStyles({
  card: {
    width: '16.67%',
    cursor: 'pointer',
    backgroundColor: '#c8e6e8',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pos: {
    marginBottom: 12,
  },
  isSelected: {
    backgroundColor: '#4db7b3',
  },
  valueText: {
    fontWeight: 'bold',
  },
});

const getCurrentSelection = (state) => state.selectedMetrics[0];

const DataCard = ({ metric, value, unit }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selected = useSelector(getCurrentSelection);

  const isSelected = metric === selected ? `${classes.card} ${classes.isSelected}` : `${classes.card}`;

  function handleClick() {
    dispatch({ type: actions.SET_SELECTED_METRICS, metric });
  }

  return (
    <Card className={isSelected} onClick={handleClick}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {metric}
        </Typography>
        <Typography variant="h5" component="h2">
          <span className={classes.valueText}>{value}</span>
          {' '}
          {unit}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DataCard;
