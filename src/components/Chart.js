import React, { Component } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { connect } from 'react-redux';
import CustomTooltip from './CustomTooltip';


class Chart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let measurements = {};

    if (this.props.metricValues.metricValues[0]) {
      measurements = this.props.metricValues.metricValues[0].measurements;
    }

    return (
      <LineChart width={1200} height={400} data={measurements}>
        <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Chart);
