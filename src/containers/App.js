import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions as errorActions } from '../ducks/error';
import Navbar from '../components/Navbar';
import Main from './Main';

class App extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
  };

  handleDismissClick = (e) => {
    this.props.resetErrorMessage();
    e.preventDefault();
  };

  renderErrorMessage() {
    const { errorMessage } = this.props;
    if (!errorMessage) {
      return null;
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#a" onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    );
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.renderErrorMessage()}
        <Main />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.errorMessage,
});

export default withRouter(connect(mapStateToProps, {
  resetErrorMessage: errorActions.resetErrorMessage,
})(App));
