import React, { Component } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { connect } from 'react-redux';
import CustomTooltip from './CustomTooltip';
import CustomizedAxisTick from './CustomizedAxisTick';

class Chart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let measurements = {};
    let unit = '';
    let metric = '';
    const classes = {
      welcomeContainer: {
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      welcomeMessage: {
        fontSize: 36,
        color: 'white',
        fontWeight: 'bold',
      },
    };

    const metricIndex = this.props.metricValues.metricValues.findIndex((element) => element.metric === this.props.selectedMetrics[0]);

    if (this.props.metricValues.metricValues[metricIndex]) {
      measurements = this.props.metricValues.metricValues[metricIndex].measurements;
      unit = measurements[metricIndex].unit;
      metric = this.props.metricValues.metricValues[metricIndex].metric;
    }

    const colors = ['#b52b52', '#870b00', '#c62c0d', '#c44431', '#750500', '#6f0a00'];

    if (metricIndex !== -1) {
      return (
        <div style={{ width: '100%', height: '50vh', marginTop: '150px' }}>
          <h1 style={{ textAlign: 'center' }}>{metric}</h1>
          <ResponsiveContainer>
            <LineChart width={500} height={400} data={measurements}>
              <Line type="monotone" dataKey="value" stroke={colors[metricIndex]} dot={false} />
              <XAxis dataKey="at" tick={<CustomizedAxisTick />} />
              <YAxis label={{ value: unit, angle: -90, position: 'insideLeft' }} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Tooltip content={<CustomTooltip />} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }

    return <div style={classes.welcomeContainer}><div style={classes.welcomeMessage}>Please select a metric from above...</div></div>;
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Chart);
