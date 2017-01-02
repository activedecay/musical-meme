/*
 *
 * D3
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectD3 from './selectors';
import {
  // main component
  Chart,
  // graphs
  Bars, Dots, Lines, Transform, Cloud,
  //  Labels, Pies, RadialLines, Ticks, Title,
  // wrappers
  // Layer, Animate, Handlers,
  // helpers
  // helpers, DropShadow, Gradient,
} from 'rumble-charts';

const barLineDotChart = [{
  data: [1, 2, 3],
}, {
  data: [5, 7, 11],
}, {
  data: [13, 17, 19],
}];

const series = [{
  data: [
    { label: 'Highcharts', y: 30 },
    { label: 'amCharts', y: 13 },
    { label: 'Google Charts', y: 31 },
    { label: 'ChartJS', y: 15 },
    { label: 'TauCharts', y: 8 },
    { label: 'FusionCharts', y: 2 },
    { label: 'ZingChart', y: 2 },
    { label: 'uvCharts', y: 1 },
    { label: 'jQuery Sparklines', y: 1 },
    { label: 'Ember Charts', y: 2 },
    { label: 'Canvas.js', y: 16 },
    { label: 'Flot', y: 1 },
    { label: 'D3.js', y: 27 },
    { label: 'n3-charts', y: 3 },
    { label: 'NVD3', y: 3 },
    { label: 'Chartist.js', y: 3 },
    { label: 'C3.js', y: 14 },
    { label: 'Cubism.js', y: 1 },
    { label: 'Rickshaw', y: 2 },
  ],
}];


export class D3 extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Chart width={500} height={200} series={series} minY={0}>
          <Transform method="transpose">
            <Cloud
              font="sans-serif"
              minFontSize={12}
              maxFontSize={32}
              padding={2}
              rotate={() => (~~(Math.random() * 360))} // eslint-disable-line no-bitwise
            />
            {/* spiral={'archimedean'} */}
            {/* spiral={'rectangular'} */}
            {/* rotate={() => ((Math.random() * 12) - 6) * 15} */}
          </Transform>
        </Chart>
        <Chart width={500} height={200} series={barLineDotChart} minY={0}>
          <Bars />
          <Lines />
          <Dots />
        </Chart>
      </div>
    );
  }
}

const mapStateToProps = selectD3();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(D3);
