import 'isomorphic-fetch';
import { NotAuthenticatedError, HttpError } from './errors';

const API_ROOT = 'https://api.coindesk.com/v1/bpi/';

// wywolanie requesta do serwera z API
const callApi = (store, endpoint, authenticated, method, jsonBody) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  // token JWT z localStorage
  // let token = localStorage.getItem('jwt') || null;
  // let token = sessionStorage.getItem('jwt') || null;
  // token ze store'a
  const token = authenticated ? store.getState().auth.token : '';

  // opcje requesta dla fetch-a
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'application/json',
    },
    mode: 'cors',
  };

  // dodanie naglowka z tokenem JWT
  if (authenticated) {
    if (token) {
      Object.assign(options.headers, { Authorization: `Bearer ${token}` });
    } else {
      return Promise.reject(new NotAuthenticatedError('No token saved!'));
    }
  }

  // przeslanie danych (body w formacie JSON)
  if (jsonBody) {
    const body = JSON.stringify(jsonBody);
    Object.assign(options, { body });
  }

  // wywolanie (zwraca Promise'a z jsonem)
  return fetch(fullUrl, options)
    .then(response =>
      response.json().then(json => ({ json, response })),
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(new HttpError('Http error.', response.status, json));
      }

      return json;
    });
};

// dynamicznie generowany klucz,
// w ramach ktorego przechowywana jest konfiguracja wywolania API
export const CALL_API = Symbol('Call API');

// middleware interpretujacy informacje przekazane w [CALL_API],
// wykonuje wywolania api i obsluguje promise'y
export default store => next => (action) => {
  const callAPI = action[CALL_API];
  // przy braku [CALL_API] przejscie do nastepnego middleware'a
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  // pobranie parametrow z [CALL_API]
  let { endpoint } = callAPI;
  const { types, authenticated = false, method = 'GET', json,
    successHandler, payload } = callAPI;

  // wykonanie funkcji dla endpointa (jesli endpoint jest funkcja)
  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  // walidacja typow akcji i endpointa
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  // funkcja usuwajaca [CALL_API] z akcji dla wywolan w nastepnych middleware'ach
  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  // akcje dla requesta
  const [requestType, successType, failureType] = types;
  // dispatch akcji rozpoczecia wywolania
  next(actionWith({ type: requestType }));

  // wywolanie i obsluga
  return callApi(store, endpoint, authenticated, method, json).then(
    (response) => {
      // wywolanie dodatkowej obslugi pomyslnego pobrania wynikow z serwera
      // (np. zapisanie tokena w localStorage)
      if (typeof successHandler === 'function') {
        successHandler(response);
      }
      // dispatch pomyslnego zakonczenia
      let result;
      if (payload) {
        result = next(actionWith({
          response,
          type: successType,
          payload,
        }));
      } else {
        result = next(actionWith({
          response,
          type: successType,
        }));
      }
      return result;
    },
    error => (
      next(actionWith({
        type: failureType,
        error: error.message || 'API call error',
      }))
    ),
  );
};
