/**
  v * Created by Joey on 9/22/2016.
 */


import { take, actionChannel, put, fork, call, select } from 'redux-saga/effects';
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

  placesSuccess,
  placesError,
} from './actions';

import {
  selectUserLocation,
} from './selectors';

const autoCompleteUrl = 'http://localhost:8080/api/autocomplete';
const placesUrl = 'http://localhost:8080/api/places';
const placeDetailsUrl = 'http://localhost:8080/api/place';
const geocodeUrl = 'http://localhost:8080/api/geocode';
const no_cors_options = {
  method: 'GET',
  mode: 'no-cors',
};

export function* homePageSaga() {
  while (true) {
    yield take(USER_LOCATION_REQUEST);
    yield put(userLocationPending());
    const {location, err } = yield call(fetchUserLocationGeo);

    if (location) {
      yield put(userLocationSuccess(location));
      yield call(fetchNoodlePlaces);
    } else {
      yield put(userLocationError(err));
      yield call(throttleAutocomplete);
    }

  }
}

function* fetchNoodlePlaces() {
  const { latitude, longitude } = yield select(selectUserLocation);

  if (latitude && longitude) {
    let url = placesUrl + '?' + 'lat=' + latitude + '&lng=' + longitude;

    const places = yield call(request, url, no_cors_options);

    if (places.data) {
      yield put(placesSuccess(places.data));
    } else {
      console.log(places.err);
      yield put(placesError(places.err));
    }
  }
}

function* fetchAutocomplete(action) {
  var url = autoCompleteUrl + '?input=' + action.payload;

  const predictions = yield call(request, url, no_cors_options);
  
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