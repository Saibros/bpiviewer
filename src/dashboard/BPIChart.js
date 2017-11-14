import React from 'react';
import PropTypes from 'prop-types';
import ChartViewer from './charts/ChartViewer';
import LineChart from './charts/LineChart';

const BPIChart = ({ rows, isFetching, yAxisTitle }) => (
  <ChartViewer title="Bitcoin Price Index" isFetching={isFetching}>
    <LineChart rows={rows} xKey="x" yKey="y" xLabel="Time" yLabel={yAxisTitle} />
  </ChartViewer>
);

BPIChart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  rows: PropTypes.array.isRequired,
  isFetching: PropTypes.bool,
  yAxisTitle: PropTypes.string,
};

BPIChart.defaultProps = {
  isFetching: false,
  yAxisTitle: 'Price',
};

export default BPIChart;
