import configureStore from 'redux-mock-store';
import nock from 'nock';
import api from '../middleware/api';
import reducer, { types, actions } from './bpi';
import currencies from './currencies';

const middlewares = [api];
const mockStore = configureStore(middlewares);

const currency = 'USD';

describe('actions', () => {
  it('should create an action to set currency', () => {
    const expectedAction = {
      type: types.SET_CURRENCY,
      currency,
    };
    expect(actions.setCurrency(currency)).toEqual(expectedAction);
  });
});

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates GET_CURRENT_SUCCESS when fetching current rate has been done', () => {
    nock('https://api.coindesk.com/')
      .get(`/v1/bpi/currentprice/${currency}.json`)
      .reply(200, { time: {} });

    const expectedActions = [
      { type: types.GET_CURRENT_REQUEST },
      { type: types.GET_CURRENT_SUCCESS, response: { time: {} }, payload: { currency } },
    ];
    const store = mockStore({});

    expect.assertions(1);
    return store.dispatch(actions.getCurrentPrice(currency)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('bpi reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      currency: 'USD',
      current: { USD: { description: 'United States Dollar', rate_float: 0 } },
      yesterday: 0,
      historical: [],
      currencies: currencies.map(c => ({
        code: c.currency,
        label: `${c.country} (${c.currency})`,
      })),
      isCurrentFetching: false,
      isYesterdayFetching: false,
      isHistoryFetching: false,
    });
  });

  it('should handle SET_CURRENCY', () => {
    expect(
      reducer([], {
        type: types.SET_CURRENCY,
        currency,
      }),
    ).toEqual({ currency });
  });
});
