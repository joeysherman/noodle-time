import{ take, call, put, select } from 'redux-saga/effects';

import { AUTOCOMPLETE_ERROR, AUTOCOMPLETE_ITEM_SELECTED, AUTOCOMPLETE_REQUEST, AUTOCOMPLETE_SUCCESS } from './constants';
import request from '../../utils/request';
let baseURL = "/api/autocomplete";

// Individual exports for testing
export function* defaultSaga() {
  while(true) {
    const { payload } = yield take(AUTOCOMPLETE_REQUEST);
    let url = baseURL + "?input=" + payload.input;

    const { data, err } = yield call(request, url);
    console.log('inside')
    if (data) {
      if (data.json.status == "OK") {
        console.log('were good to go');
        console.log(data);
      }
    }

  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
