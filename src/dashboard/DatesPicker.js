import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DateRangePicker, isInclusivelyAfterDay } from 'react-dates';
import styles from './DatesPicker.css';

class DatesPicker extends Component {
  static propTypes = {
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
    moment.locale('en');
    this.tomorrow = moment().add(1, 'days');
    this.state = {
      focusedInput: null,
    };
  }

  handleChange = ({ startDate, endDate }) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange({
        start: startDate ? startDate.toDate() : this.props.startDate,
        end: endDate ? endDate.toDate() : this.props.endDate,
      });
    }
  };

  render() {
    const { startDate, endDate } = this.props;
    return (
      <div className={styles.wrapper}>
        <DateRangePicker
          startDate={startDate ? moment(startDate) : moment(new Date())}
          endDate={endDate ? moment(endDate) : moment(new Date())}
          onDatesChange={this.handleChange}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
          isOutsideRange={day => isInclusivelyAfterDay(day, this.tomorrow)}
        />
      </div>
    );
  }
}

export default DatesPicker;
