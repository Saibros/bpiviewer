import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import QueryForm from './QueryForm';
import BPIChart from './BPIChart';
import CurrentPricePanel from './CurrentPricePanel';
import { actions } from './bpi';
import styles from './Dashboard.css';

class Dashboard extends React.Component {
  static propTypes = {
    setCurrency: PropTypes.func.isRequired,
    getCurrentPrice: PropTypes.func.isRequired,
    getYesterdayPrice: PropTypes.func.isRequired,
    getHistoricalPrices: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    query: PropTypes.object,
    currency: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    current: PropTypes.object,
    yesterday: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    historical: PropTypes.array,
    isCurrentFetching: PropTypes.bool,
    isYesterdayFetching: PropTypes.bool,
    isHistoryFetching: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    currencies: PropTypes.array,
  };

  componentDidMount() {
    // load all prices
    this.loadData();
  }

  loadData = () => {
    const { getCurrentPrice, getYesterdayPrice,
      getHistoricalPrices, query } = this.props;
    getCurrentPrice(query.currency);
    getYesterdayPrice(query.currency);
    getHistoricalPrices(query.currency, query.dates.start, query.dates.end);
  }

  handleQuerySubmit = (values) => {
    const { setCurrency } = this.props;
    // change currency and refresh data
    setCurrency(values.currency);
    this.loadData();
  };

  render() {
    const { query, currency, current, yesterday, historical,
      isCurrentFetching, isYesterdayFetching, isHistoryFetching,
      currencies } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={styles.colLeft}>
          <CurrentPricePanel
            currency={currency}
            description={current[currency].description}
            price={current[currency].rate_float}
            priceYesterday={yesterday}
            priceUSD={current.USD.rate_float}
            isFetching={isCurrentFetching && isYesterdayFetching}
          />
          <QueryForm currencies={currencies} onSubmit={this.handleQuerySubmit} />
        </div>
        <div className={styles.colRight}>
          <BPIChart
            rows={historical}
            isFetching={isHistoryFetching}
            yAxisTitle={`Price (${query.currency})`}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  query: state.query,
  currency: state.bpi.currency,
  current: state.bpi.current,
  yesterday: state.bpi.yesterday,
  historical: state.bpi.historical,
  isCurrentFetching: state.bpi.isCurrentFetching,
  isYesterdayFetching: state.bpi.isYesterdayFetching,
  isHistoryFetching: state.bpi.isHistoryFetching,
  currencies: state.bpi.currencies,
});

export default withRouter(connect(mapStateToProps, {
  setCurrency: actions.setCurrency,
  getCurrentPrice: actions.getCurrentPrice,
  getYesterdayPrice: actions.getYesterdayPrice,
  getHistoricalPrices: actions.getHistoricalPrices,
})(Dashboard));
