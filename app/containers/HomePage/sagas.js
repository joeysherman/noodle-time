/**
  v * Created by Joey on 9/22/2016.
 */


import { take, actionChannel, put, fork, call, cancel } from 'redux-saga/effects';
import { delay, buffers } from 'redux-saga';
import { push } from 'react-router-redux';
import request from '../../utils/request';

import {
  USER_LOCATION_REQUEST,
  USER_LOCATION_ERROR,
  USER_LOCATION_SUCCESS,
  AUTOCOMPLETE_REQUEST,
  AUTOCOMPLETE_ITEM_SELECTED,
} from './constants';

import {
  userLocationError,
  userLocationSuccess,
  fetchUserLocationGeo,
  setStatusMessage,
  autoCompleteSuccess,
  autoCompleteError,
} from './actions';

  let autoCompleteUrl   = '/api/autocomplete';
  let geocodeUrl        = '/api/geocode';

export function* homePageSaga() {
 while (yield take(USER_LOCATION_REQUEST)){
   const fetchUserTask = yield fork(fetchUserLocation);

   const action = yield take([USER_LOCATION_ERROR, USER_LOCATION_SUCCESS]);
   
   yield cancel(fetchUserTask);
   if (action.type === USER_LOCATION_SUCCESS) {
     yield put(push('/list'));
   } else {
     const autocompleteTask = yield fork(throttleAutocomplete);

     while(true) {
       const {payload} = yield take(AUTOCOMPLETE_ITEM_SELECTED);
       // find coords for location via reverse geo-code
       // put userlocationsuccess
       const { data, error } = yield call(request, geocodeUrl + '?id=' + payload);

       if (data) {
         let { lat, lng } = data.json.results[0].geometry.location;
         let payload = {
           timestamp: Date.now(),
           coords: {
             latitude: lat,
             longitude: lng,
           }
         };
         yield cancel(autocompleteTask);
         yield put(userLocationSuccess(payload));
         yield put(push('/list'));
       } else {
         yield put(userLocationError(error));
       }
     }
   }
 }
}

function* fetchUserLocation() {

  yield put(setStatusMessage('Grabbing your location...'));
  yield call(delay, 250);
  const {location, error } = yield call(fetchUserLocationGeo);

  if (location) {
    yield put(setStatusMessage('Location found!'));
    yield call(delay, 250);
    yield put(userLocationSuccess(location));
  } else {
    yield put(userLocationError(error));
  }
}

function* fetchAutocomplete(action) {
  let url = autoCompleteUrl + '?input=' + action.payload.input;

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