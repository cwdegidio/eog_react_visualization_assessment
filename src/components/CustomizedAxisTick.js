import React, { Component } from 'react';

class CustomizedAxisTick extends Component {
  render() {
    const {
      x, y, stroke, payload,
    } = this.props;
    const rawDate = new Date(payload.value);
    const hours = rawDate.getHours().toString();
    let minutes = rawDate.getMinutes().toString();

    if (minutes.length === 1) {
      minutes = `0${minutes}`;
    }

    const newValue = `${hours}:${minutes}`;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(0)">{newValue}</text>
      </g>
    );
  }
}

export default CustomizedAxisTick;
