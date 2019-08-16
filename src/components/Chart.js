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

    if (this.props.metricValues.metricValues[0]) {
      measurements = this.props.metricValues.metricValues[0].measurements;
      unit = measurements[0].unit;
    }

    return (
      <div style={{ width: '100%', height: '50vh' }}>
        <ResponsiveContainer>
          <LineChart width={500} height={400} data={measurements}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
            <XAxis dataKey="at" tick={<CustomizedAxisTick />} />
            <YAxis label={{ value: unit, angle: -90, position: 'insideLeft' }} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Chart);
