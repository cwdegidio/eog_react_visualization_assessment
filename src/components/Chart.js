import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import {connect} from "react-redux";


// const getValues = state => state.metricValues;
//
// const Chart = () => {
//   const values = useSelector(getValues);
//   let measurements;
//
//   if(values.metricValues[0]) {
//     measurements = values.metricValues[0].measurements;
//   }
//
//
//
//
//
//   return (
//     <LineChart key={Math.random()} width={1200} height={400} data={measurements}>
//       <Line type="monotone" dataKey="value" stroke="#8884d8" />
//     </LineChart>
//   );
// };
//
// export default Chart;


class Chart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let measurements = {};

    if(this.props.metricValues.metricValues[0]) {
      measurements = this.props.metricValues.metricValues[0].measurements;
    }

    return (
          <LineChart width={1200} height={400} data={measurements}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false}/>
           </LineChart>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state
});

export default connect(mapStateToProps)(Chart);

