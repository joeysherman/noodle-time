/**
  v * Created by Joey on 9/22/2016.
 */


import { take, actionChannel, put, fork, call } from 'redux-saga/effects';
import { delay, buffers } from 'redux-saga';
import request from '../../utils/request';


import {

  USER_LOCATION_REQUEST,
  USER_LOCATION_ERROR,

  AUTOCOMPLETE_REQUEST,
  AUTOCOMPLETE_ERROR,

} from './constants';

import {

  userLocationRequest,
  userLocationError,
  userLocationSuccess,
  userLocationPending,
  fetchUserLocationGeo,

  autoCompleteRequest,
  autoCompleteError,
  autoCompleteSuccess,

} from './actions';

const autoCompleteUrl = 'http://localhost:8080/api/autocomplete';

export function* homePageSaga() {
  while (true) {
    yield take(USER_LOCATION_REQUEST);
    yield put(userLocationPending());
    const {location, error} = yield call(fetchUserLocationGeo);

    if (location) {
      yield put(userLocationSuccess(location));
    } else {
      yield put(userLocationError(error));
      yield call(throttleAutocomplete);
    }
  }
}

function* fetchAutocomplete(action) {
  var url = autoCompleteUrl + '?input=' + action.payload,
      options = {
        method: 'GET',
        mode: 'no-cors',
        cache: 'default'
      };

  const predictions = yield call(request, url, options);
  
  if (predictions.data) {
    yield put(autoCompleteSuccess(predictions.data));
  } else {
    yield put(autoCompleteError(predictions.err));
  }
};

function* throttleAutocomplete() {
  yield throttle(750, AUTOCOMPLETE_REQUEST, fetchAutocomplete);
};

/* From the redux docs */
function* throttle(ms, pattern, task, ...args) {
  const throttleChannel = yield actionChannel(pattern, buffers.sliding(1));

  while (true) {
    const action = yield take(throttleChannel);
    yield fork(task, ...args, action);
    yield call(delay, ms);
  };
};

export default [
  homePageSaga,
];