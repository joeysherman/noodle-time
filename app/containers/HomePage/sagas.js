/**
  v * Created by Joey on 9/22/2016.
 */


import { take, actionChannel, put, fork, call, select } from 'redux-saga/effects';
import { delay, buffers } from 'redux-saga';
import request from '../../utils/request';
import { push } from 'react-router-redux';

import {
  USER_LOCATION_REQUEST,

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
  distanceMatrixSuccess
} from './actions';

import {
  selectUserLocation,
  selectPlaces,
} from './selectors';

const autoCompleteUrl = 'http://localhost:8080/api/autocomplete';
const placesUrl = 'http://localhost:8080/api/places';
const placeDetailsUrl = 'http://localhost:8080/api/place';
const geocodeUrl = 'http://localhost:8080/api/geocode';
const distanceMatrixUrl = 'http://localhost:8080/api/distance';

export function* homePageSaga() {
  while (true) {
    yield take(USER_LOCATION_REQUEST);
    yield put()
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

function* fetchDistancesFromUserToPlaces() {
  const { latitude, longitude } = yield select(selectUserLocation);
  const places = yield select(selectPlaces);

  const places_locations = places.map((place) => {
    return place.geometry.location;
  });

  const places_query = places_locations.map((item) => '&destlat=' + item.lat + '&destlng=' + item.lng ).join('');

  const query = distanceMatrixUrl + '?lat=' + latitude
    + '&lng=' + longitude + places_query;

  const distances = yield call(request, query);

  if (distances.data) {
    yield put(distanceMatrixSuccess(distances.data));
    yield put(push('/map'));
  } else {
    yield put(distances.error);
  }
}

function* fetchNoodlePlaces() {
  const { latitude, longitude } = yield select(selectUserLocation);

  if (latitude && longitude) {
    let url = placesUrl + '?' + 'lat=' + latitude + '&lng=' + longitude;

    const places = yield call(request, url);

    if (places.data) {
      yield put(placesSuccess(places.data));
      yield call(fetchDistancesFromUserToPlaces);
    } else {
      yield put(placesError(places.err));
    }
  }
}

function* fetchAutocomplete(action) {
  var url = autoCompleteUrl + '?input=' + action.payload;

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