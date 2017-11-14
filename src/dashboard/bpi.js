import { CALL_API } from '../middleware/api';
import currencies from './currencies';

const startDate = new Date();
startDate.setDate(startDate.getDate() - 30);

export const defaultQuery = {
  currency: 'USD',
  dates: {
    start: startDate,
    end: new Date(),
  },
};

export const types = {
  SET_CURRENCY: 'BPI/SET_CURRENCY',
  GET_CURRENT_REQUEST: 'BPI/GET_CURRENT_REQUEST',
  GET_CURRENT_SUCCESS: 'BPI/GET_CURRENT_SUCCESS',
  GET_CURRENT_FAILURE: 'BPI/GET_CURRENT_FAILURE',
  GET_YESTERDAY_REQUEST: 'BPI/GET_YESTERDAY_REQUEST',
  GET_YESTERDAY_SUCCESS: 'BPI/GET_YESTERDAY_SUCCESS',
  GET_YESTERDAY_FAILURE: 'BPI/GET_YESTERDAY_FAILURE',
  GET_HISTORICAL_REQUEST: 'BPI/GET_HISTORICAL_REQUEST',
  GET_HISTORICAL_SUCCESS: 'BPI/GET_HISTORICAL_SUCCESS',
  GET_HISTORICAL_FAILURE: 'BPI/GET_HISTORICAL_FAILURE',
};

export const initial = {
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
};

export default (state = initial, action) => {
  switch (action.type) {
    case types.SET_CURRENCY:
      return {
        ...state,
        currency: action.currency,
      };
    case types.GET_CURRENT_REQUEST:
      return {
        ...state,
        isCurrentFetching: true,
      };
    case types.GET_CURRENT_SUCCESS:
      return {
        ...state,
        current: action.response.bpi,
        isCurrentFetching: false,
      };
    case types.GET_CURRENT_FAILURE:
      return {
        ...state,
        current: {},
        isCurrentFetching: false,
        errorMessage: action.error,
      };
    case types.GET_YESTERDAY_REQUEST:
      return {
        ...state,
        isYesterdayFetching: true,
      };
    case types.GET_YESTERDAY_SUCCESS:
      return {
        ...state,
        yesterday: action.response.bpi[Object.keys(action.response.bpi)[0]],
        isYesterdayFetching: false,
      };
    case types.GET_YESTERDAY_FAILURE:
      return {
        ...state,
        yesterday: 0,
        isYesterdayFetching: false,
        errorMessage: action.error,
      };
    case types.GET_HISTORICAL_REQUEST:
      return {
        ...state,
        isHistoryFetching: true,
      };
    case types.GET_HISTORICAL_SUCCESS:
      return {
        ...state,
        historical: Object.keys(action.response.bpi).map(k => ({
          x: new Date(k),
          y: action.response.bpi[k],
        })),
        isHistoryFetching: false,
      };
    case types.GET_HISTORICAL_FAILURE:
      return {
        ...state,
        historical: [],
        isHistoryFetching: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};

const setCurrency = currency => ({
  type: types.SET_CURRENCY,
  currency,
});

const getCurrentPrice = (currency, onSuccess) => ({
  [CALL_API]: {
    types: [
      types.GET_CURRENT_REQUEST,
      types.GET_CURRENT_SUCCESS,
      types.GET_CURRENT_FAILURE,
    ],
    endpoint: `currentprice/${currency}.json`,
    successHandler: onSuccess,
    payload: { currency },
  },
});

const getYesterdayPrice = (currency, onSuccess) => ({
  [CALL_API]: {
    types: [
      types.GET_YESTERDAY_REQUEST,
      types.GET_YESTERDAY_SUCCESS,
      types.GET_YESTERDAY_FAILURE,
    ],
    endpoint: `historical/close.json?for=yesterday&currency=${currency}`,
    successHandler: onSuccess,
  },
});

const format = d => d.toISOString().substr(0, 10);

const getHistoricalPrices = (currency, start, end, onSuccess) => ({
  [CALL_API]: {
    types: [
      types.GET_HISTORICAL_REQUEST,
      types.GET_HISTORICAL_SUCCESS,
      types.GET_HISTORICAL_FAILURE,
    ],
    endpoint: `historical/close.json?start=${format(start)}&end=${format(end)}&currency=${currency}`,
    successHandler: onSuccess,
  },
});

export const actions = {
  setCurrency,
  getCurrentPrice,
  getYesterdayPrice,
  getHistoricalPrices,
};
