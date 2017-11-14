import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../components/Spinner';
import styles from './CurrentPricePanel.css';

const CurrentPricePanel = ({ currency, description, price,
  priceYesterday, priceUSD, isFetching }) => {
  // calculate percentage change
  const percentage = parseFloat(Number(((price - priceYesterday) / priceYesterday) * 100)
    .toFixed(2));
  // css class for up/down icon
  let percentageClass = styles.same;
  if (percentage > 0) percentageClass = styles.up;
  if (percentage < 0) percentageClass = styles.down;
  return (
    <div className={styles.wrapper}>
      { isFetching && <Spinner /> }
      { !isFetching &&
        <div>
          <div>{description} <span className={percentageClass}>{percentage}%</span></div>
          <div className={styles.current}>{currency} {price.toFixed(2)}</div>
          {currency !== 'USD' && <div className={styles.usd}>USD ${priceUSD.toFixed(2)}</div>}
        </div>
      }
    </div>
  );
};

CurrentPricePanel.propTypes = {
  currency: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  priceYesterday: PropTypes.number,
  priceUSD: PropTypes.number,
  isFetching: PropTypes.bool,
};

CurrentPricePanel.defaultProps = {
  isFetching: true,
};

export default CurrentPricePanel;
