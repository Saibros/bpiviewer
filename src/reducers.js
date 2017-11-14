import { combineReducers } from 'redux';
import { createForms } from 'react-redux-form';

// ducks
import errorMessage from './ducks/error';
import bpi, { defaultQuery } from './dashboard/bpi';

const rootReducer = combineReducers({
  errorMessage,
  bpi,
  ...createForms({
    query: defaultQuery,
  }),
});

export default rootReducer;
