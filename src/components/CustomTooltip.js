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
      const year = rawDate.getFullYear();
      const hour = rawDate.getHours();
      const minutes = rawDate.getMinutes();
      const seconds = rawDate.getSeconds();
      const finalDate = `${month} ${date}, ${year}`;
      const finalTime = `${hour}:${minutes}:${seconds} Central`;

      return (
        <div className="custom-tooltip">
          <p className="title">{`${finalDate}`}</p>
          <p className="title">{`${finalTime}`}</p>
          <p className="value">{`${payload[0].payload.value} ${payload[0].payload.unit}`}</p>
        </div>
      );
    }

    return null;
  }
}

export default CustomTooltip;