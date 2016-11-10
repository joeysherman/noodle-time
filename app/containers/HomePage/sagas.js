/**
  v * Created by Joey on 9/22/2016.
 */


import { take, actionChannel, put, fork, call, select } from 'redux-saga/effects';
import { delay, buffers } from 'redux-saga';
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
    yield take(GOOGLE_MAPS_LOAD_REQUEST);
    try {
      yield call(loadGoogleMapsPromise);
      yield put(googleMapsLoadSuccess());
    } catch (error) {
      yield put(googleMapsLoadError(error));
    }

    yield take(USER_LOCATION_REQUEST);
    yield put(setStatusMessage('Hold tight...grabbing your location...'));
    const {location, err } = yield call(fetchUserLocationGeo);

    if (location) {
      yield put(setStatusMessage('Location found! Finding Ramen near you...'));
      yield put(userLocationSuccess(location));
      yield call(fetchNoodlePlaces, location);
    } else {
      yield put(userLocationError(err));
      yield put(setStatusMessage("Error, where are you?"));
      yield call(throttleAutocomplete);
    }
  }
}

function* fetchDistancesFromUserToPlaces(places, location) {
  const { latitude, longitude } = location.coords;

  const places_locations = places.map((place) => {
    return place.geometry.location;
  });

  const places_query = places_locations.map((item) => '&destlat=' + item.lat + '&destlng=' + item.lng ).join('');

  const query = distanceMatrixUrl + '?lat=' + latitude
    + '&lng=' + longitude + places_query;
  yield put(setStatusMessage('Seeing which Ramen place is closest...'));
  const distances = yield call(request, query);

  if (distances.data) {
    yield [put(setStatusMessage('Lets go!')), put(distanceMatrixSuccess(distances.data))];
  } else {
    yield put(distances.error);
  }
}

function* fetchNoodlePlaces(location) {
  const { latitude, longitude } = location.coords;

  if (latitude && longitude) {
    let url = placesUrl + '?' + 'lat=' + latitude + '&lng=' + longitude;

    const places = yield call(request, url);

    if (places.data) {
      let numberOfPlaces = places.data.total;
      yield put(placesSuccess(places.data.businesses));
      yield put(setStatusMessage('Sweet! Found ' + numberOfPlaces + ' Ramen places near you!'));
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