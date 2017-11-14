import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Control, Form, Errors } from 'react-redux-form';
import CurrencySelect from './CurrencySelect';
import DatesPicker from './DatesPicker';
import styles from './QueryForm.css';

class QueryForm extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    currencies: PropTypes.array,
    onSubmit: PropTypes.func,
  };

  handleSubmit = (values) => {
    const { onSubmit } = this.props;
    if (onSubmit) {
      onSubmit(values);
    }
  }

  render() {
    const { currencies } = this.props;
    return (
      <div className={styles.wrapper}>
        <Form model="query" onSubmit={this.handleSubmit}>
          <div>
            <Control
              model=".currency"
              component={CurrencySelect}
              mapProps={{
                value: props => props.modelValue,
                onChange: props => props.onChange,
              }}
              options={currencies}
              multi={false}
            />
          </div>
          <div>
            <Control
              model=".dates"
              component={DatesPicker}
              mapProps={{
                startDate: props => props.modelValue.start,
                endDate: props => props.modelValue.end,
                onChange: props => props.onChange,
              }}
            />
          </div>
          <Errors model="query" className={styles.error} />
          <div className={styles.buttonsWrapper}>
            <button className={styles.button} type="submit">Update</button>
          </div>
        </Form>
      </div>
    );
  }
}

export default QueryForm;
