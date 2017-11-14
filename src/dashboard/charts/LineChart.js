import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import Axis, { orientations } from './Axis';
import Grid from './Grid';
import styles from './LineChart.css';

class LineChart extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    rows: PropTypes.array.isRequired,
    xKey: PropTypes.string.isRequired,
    yKey: PropTypes.string.isRequired,
    xLabel: PropTypes.string.isRequired,
    yLabel: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    aspectRatio: PropTypes.number,
  };

  static defaultProps = {
    width: 600,
    height: 400,
    aspectRatio: 1.5,
  };

  render() {
    const { rows, xKey, yKey, xLabel, yLabel, width, height, aspectRatio } = this.props;
    const margin = { top: 20, right: 20, bottom: 80, left: 40 };
    const svgHeight = height || Math.floor(width / aspectRatio);
    const finalWidth = width - margin.left - margin.right;
    const finalHeight = svgHeight - margin.top - margin.bottom;
    // skale x i y
    const x = d3.scaleTime().rangeRound([0, finalWidth]);
    const y = d3.scaleLinear().rangeRound([finalHeight, 0]);
    x.domain(d3.extent(rows, d => d[xKey]));
    y.domain([0, d3.max(rows, d => d[yKey])]);
    // linia wykresu
    const line = d3.line()
      .x(d => x(d[xKey]))
      .y(d => y(d[yKey]));
    // obszar pod wykresem
    const area = d3.area()
      .x(d => x(d[xKey]))
      .y1(d => y(d[yKey]));
    area.y0(y(0));
    return (
      <div className={styles.wrapper}>
        <svg
          className={styles.svg}
          width={width}
          height={svgHeight}
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <Axis
              scale={x}
              transform={`translate(0,${finalHeight})`}
              label={xLabel}
              labelAlign="middle"
            />
            <Axis
              scale={y}
              orientation={orientations.LEFT}
              label={yLabel}
            />
            <Grid xScale={x} yScale={y} width={finalWidth} height={finalHeight} xTicks={0} />
            <g>
              <linearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0" className={styles.stop1} />
                <stop offset="1" className={styles.stop2} />
              </linearGradient>
              <path
                className={styles.line}
                d={line(rows)}
                stroke="#4a97ff"
              />
              <path className={styles.area} d={area(rows)} />
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

export default LineChart;
