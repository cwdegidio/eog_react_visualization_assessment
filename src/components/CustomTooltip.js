import React, { Component } from 'react';

class CustomTooltip extends Component {
  render() {
    const { active } = this.props;

    if (active && this.props.payload) {
      const { payload } = this.props;
      const label = payload[0].payload.at;

      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ];
      const rawDate = new Date(label);
      const month = monthNames[rawDate.getMonth()];
      const date = rawDate.getDate();
      const year = rawDate.getFullYear().toString();
      const hour = rawDate.getHours().toString();
      let minutes = rawDate.getMinutes().toString();
      let seconds = rawDate.getSeconds().toString();

      if (minutes.length === 1) {
        minutes = `0${minutes}`;
      }

      if (seconds.length === 1) {
        seconds = `0${seconds}`;
      }

      const finalDate = `${month} ${date}, ${year}`;
      const finalTime = `${hour}:${minutes}:${seconds} Central`;

      return (
        <div style={{ backgroundColor: 'white', padding: '5px', outline: '1px solid darkgrey' }}>
          <p style={{ fontWeight: 'bold', marginBottom: 0, paddingBottom: 0 }}>{`${finalDate}`}</p>
          <p style={{ marginTop: 0, paddingTop: 0 }}>{`${finalTime}`}</p>
          <p className="value">{`${payload[0].payload.value} ${payload[0].payload.unit}`}</p>
        </div>
      );
    }

    return null;
  }
}

export default CustomTooltip;
