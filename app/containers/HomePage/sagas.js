/**
  v * Created by Joey on 9/22/2016.
 */


import { take, actionChannel, put, fork, call, select } from 'redux-saga/effects';
import { delay, buffers } from 'redux-saga';
import { push } from 'react-router-redux';
import request from '../../utils/request';

import {
  USER_LOCATION_REQUEST,
  GOOGLE_MAPS_LOAD_REQUEST,
  AUTOCOMPLETE_REQUEST,
} from './constants';

import {
  userLocationRequest,
  userLocationError,
  userLocationSuccess,
  fetchUserLocationGeo,

  autoCompleteRequest,
  autoCompleteError,
  autoCompleteSuccess,

  placesSuccess,
  placesError,

  distanceMatrixError,
  distanceMatrixSuccess,

  loadGoogleMapsPromise,
  googleMapsLoadError,
  googleMapsLoadSuccess,

  setStatusMessage,
} from './actions';

  var autoCompleteUrl   = '/api/autocomplete';
  var placesUrl         = '/api/noodles';
  var placeDetailsUrl   = '/api/place';
  var geocodeUrl        = '/api/geocode';
  var distanceMatrixUrl = '/api/distance';

export function* homePageSaga() {
  while (true) {

    yield take(USER_LOCATION_REQUEST);
    yield put(setStatusMessage('Hold tight...grabbing your location...'));
    yield call(delay, 220);
    const {location, err } = yield call(fetchUserLocationGeo);

    if (location) {
      let { latitude, longitude } = location.coords;
      yield put(setStatusMessage('Location found! Finding Ramen near you...'));
      yield call(delay, 150);
      yield put(push({
        pathname: '/near',
        query: {
          lat: latitude,
          lng: longitude,
        }
      }));

    } else {
      yield put(userLocationError(err));
      yield call(throttleAutocomplete);
    }
  }
}

function* fetchNoodlePlaces(location) {
  const { latitude, longitude } = location.coords;

  if (latitude && longitude) {
    let url = placesUrl + '?' + 'lat=' + latitude + '&lng=' + longitude;

    const places = yield call(request, url);

    if (places.data) {
      let numberOfPlaces = places.data.total;
      yield put(setStatusMessage('Found ' + numberOfPlaces + ' Ramen places near you!'));
      yield call(delay, 1000);
      yield put(placesSuccess(places.data.businesses));
    } else {
      yield put(placesError(places.err));
    }
  }
}

function* fetchAutocomplete(action) {
  var url = autoCompleteUrl + '?input=' + action.payload.input;

  const predictions = yield call(request, url);
  
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