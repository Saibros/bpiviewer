import React from 'react';
import PropTypes from 'prop-types';
import styles from './Axis.css';

const translateX = (scale0, scale1, d) => {
  const x = scale0(d);
  return `translate(${isFinite(x) ? x : scale1(d)},0)`;
};

const translateY = (scale0, scale1, d) => {
  const y = scale0(d);
  return `translate(0,${isFinite(y) ? y : scale1(d)})`;
};

const center = (scale) => {
  let offset = scale.bandwidth() / 2;
  if (scale.round()) offset = Math.round(offset);
  return function c(d) {
    return scale(d) + offset;
  };
};

const identity = d => d;

export const orientations = {
  TOP: 'TOP',
  RIGHT: 'RIGHT',
  BOTTOM: 'BOTTOM',
  LEFT: 'LEFT',
};

const Axis = ({ scale, orientation, values, ticks, tickSize, format, transform,
  textTransform, label, labelAlign, className }) => {
  let tickSizeInner = 6;
  let tickSizeOuter = 6;
  if (tickSize) {
    tickSizeInner = tickSize;
    tickSizeOuter = tickSize;
  }
  const tickPadding = 3;
  const strokeWidth = 1;
  // const strokeColor = 'black';
  // const tickFont = 'sans-serif';
  // const tickFontSize = 10;

  const tickTransform = orientation === orientations.TOP || orientation === orientations.BOTTOM
    ? translateX
    : translateY;
  const position = (scale.bandwidth ? center : identity)(scale.copy());
  const tickTransformer = d => tickTransform(position, position, d);

  const k = orientation === orientations.TOP || orientation === orientations.LEFT ? -1 : 1;
  const isRight = orientation === orientations.RIGHT;
  const isLeft = orientation === orientations.LEFT;
  const isTop = orientation === orientations.TOP;
  const isBottom = orientation === orientations.BOTTOM;
  const isVertical = isRight || isLeft;
  const x = isVertical ? 'x' : 'y';
  const y = isVertical ? 'y' : 'x';

  const halfWidth = strokeWidth / 2;
  const range = scale.range();
  const range0 = range[0] + halfWidth;
  const range1 = range[range.length - 1] + halfWidth;

  const spacing = Math.max(tickSizeInner, 0) + tickPadding;
  // let textAnchor = 'middle';
  let textAnchor = 'end';
  if (isRight) {
    textAnchor = 'start';
  } else if (isLeft) {
    textAnchor = 'end';
  }
  textAnchor = labelAlign || textAnchor;

  let tickValues = values;
  if (tickValues == null) {
    tickValues = scale.ticks ? scale.ticks.apply(scale, [ticks]) : scale.domain();
  }
  let tickFormat = format;
  if (tickFormat == null) {
    tickFormat = scale.tickFormat ? scale.tickFormat.apply(scale, [ticks]) : identity;
  }

  const gProps = {};
  if (transform) {
    gProps.transform = transform;
  }

  return (
    <g
      className={className || styles.axis}
      textAnchor={textAnchor}
      strokeWidth={strokeWidth}
      {...gProps}
    >
      <path
        d={
          isVertical
            ? `M${k * tickSizeOuter},${range0}H${halfWidth}V${range1}H${k *
              tickSizeOuter}`
            : `M${range0},${k * tickSizeOuter}V${halfWidth}H${range1}V${k *
              tickSizeOuter}`
        }
      />
      {tickValues.map((v, idx) => {
        const lineProps = {};
        lineProps[`${x}2`] = k * tickSizeInner;
        lineProps[`${y}1`] = halfWidth;
        lineProps[`${y}2`] = halfWidth;
        let dy = '0.32em';
        if (isTop) {
          dy = '0em';
        } else if (isBottom) {
          dy = '0.71em';
        }

        const textProps = {
          dy,
        };
        textProps[`${x}`] = k * spacing;
        textProps[`${y}`] = halfWidth;
        if (textTransform) {
          textProps.transform = textTransform();
        }

        return (
          <g key={`tick-${idx}`} transform={tickTransformer(v)}>
            <line {...lineProps} />
            <text {...textProps}>{tickFormat(v)}</text>
          </g>
        );
      })}
      {isVertical && label && <text y="-15" dy="0.71em" textAnchor="start">{label}</text>}
      {!isVertical && label && <text y="24" dy="0.71em" x={range1}>{label}</text>}
    </g>
  );
};

Axis.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  scale: PropTypes.func.isRequired,
  orientation: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.array,
  ticks: PropTypes.number,
  tickSize: PropTypes.number,
  format: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  transform: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  textTransform: PropTypes.func,
  label: PropTypes.string,
  labelAlign: PropTypes.string,
  className: PropTypes.string,
};

Axis.defaultProps = {
  orientation: orientations.BOTTOM,
  ticks: 5,
};

export default Axis;
