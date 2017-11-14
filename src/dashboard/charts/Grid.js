import React from 'react';
import PropTypes from 'prop-types';
import Axis, { orientations } from './Axis';
import styles from './Grid.css';

const Grid = ({ xScale, yScale, height, width, xTicks, yTicks }) => (
  <g>
    {xTicks &&
      <g key="xGrid" transform={`translate(0, ${height})`}>
        <Axis
          scale={xScale}
          orientation={orientations.BOTTOM}
          ticks={xTicks}
          tickSize={-height}
          className={styles.grid}
        />
      </g>
    }
    {yTicks &&
      <g key="yGrid">
        <Axis
          scale={yScale}
          orientation={orientations.LEFT}
          ticks={yTicks}
          tickSize={-width}
          className={styles.grid}
        />
      </g>
    }
  </g>
);

Grid.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  xScale: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  yScale: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  xTicks: PropTypes.number,
  yTicks: PropTypes.number,
};

Grid.defaultProps = {
  xTicks: 5,
  yTicks: 5,
};

export default Grid;
