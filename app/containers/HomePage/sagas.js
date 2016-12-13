/**
  v * Created by Joey on 9/22/2016.
 */


import { take, actionChannel, put, fork, call, cancel } from 'redux-saga/effects';
import { delay, buffers } from 'redux-saga';
import request from '../../utils/request';

import {
  AUTOCOMPLETE_REQUEST,
  AUTOCOMPLETE_ITEM_SELECTED,
} from './constants';

import {
  autoCompleteSuccess,
  autoCompleteError,
} from './actions';

import {
  userLocationError,
  userLocationSuccess,
} from '../App/actions';

  let autoCompleteUrl   = '/api/autocomplete';
  let geocodeUrl        = '/api/geocode';

export function* homePageSaga() {

 while (yield take(AUTOCOMPLETE_REQUEST)){
   const autocompleteTask = yield fork(throttleAutocomplete);

   while(true) {
     const {payload} = yield take(AUTOCOMPLETE_ITEM_SELECTED);
     // find coords for location via reverse geo-code
     // put userlocationsuccess
     const { data, error } = yield call(request, geocodeUrl + '?id=' + payload);

     if (data) {
       let { lat, lng } = data.json.results[0].geometry.location;
       console.log(data);
       let payload = {
         timestamp: Date.now(),
         coords: {
           latitude: lat,
           longitude: lng,
         }
       };
       yield cancel(autocompleteTask);
       yield put(userLocationSuccess(payload));
     } else {
       yield put(userLocationError(error));
     }
   }
 }
}

function* fetchAutocomplete(action) {
  let url = autoCompleteUrl + '?input=' + action.payload.input;

  const { data, err } = yield call(request, url);
  
  if (data) {
    yield put(autoCompleteSuccess(data));
  } else {
    yield put(autoCompleteError(err));
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