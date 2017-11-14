import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styles from './CurrencySelect.css';

class CurrencySelect extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    options: PropTypes.array.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };

  handleChange = (option) => {
    const { onChange } = this.props;
    if (onChange) {
      // pass currency code in callback
      onChange(option.code);
    }
  };

  render() {
    const { options, value } = this.props;
    return (
      <div className={styles.wrapper}>
        <Select
          value={value}
          options={options}
          onChange={this.handleChange}
          placeholder="currency..."
          autosize
          clearable={false}
          searchable
          valueKey="code"
          labelKey="label"
        />
      </div>
    );
  }
}

export default CurrencySelect;
