import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// import 'babel-polyfill';
import configureStore from './store/configureStore';
import App from './containers/App';

// SCSS
import './assets/css/index.scss';
// import global CSS (no CSS modules)
import './assets/css/index.global.css';
// CSS modules
import './assets/css/index.css';

const store = configureStore();

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>,
      document.getElementById('root'),
    );
  });
}
