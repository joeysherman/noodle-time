/**
 * Created by Joey on 12/12/2016.
 */

import { take, put, fork, call, cancel } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import request from '../../utils/request';

import {
  USER_LOCATION_REQUEST,
  USER_LOCATION_ERROR,
  USER_LOCATION_SUCCESS,
  USER_ADDRESS_REQUEST,
  GEOCODE_REQUEST,
} from './constants';

import {
  userLocationError,
  userLocationSuccess,
  fetchUserLocationGeo,
  userAddressRequest,
  geocodeRequest,
} from './actions';

let geocodeUrl        = '/api/geocode';

export function* appSaga() {

  while (yield take(USER_LOCATION_REQUEST)){
    const { location, error } = yield call(fetchUserLocationGeo);
    
    if (location) {
      yield put(geocodeRequest(location));
    } else {
      console.log('replacing to autocomplete')
      yield put(replace({
        pathname: '/',
        state: {
          mode: 'autocomplete',
        }
      }));
    }
  }
}

function* geocodeSaga() {
  const action = yield take(GEOCODE_REQUEST);
  let { coords, place_id } = action.payload;

  let url = place_id ?
    geocodeUrl + '?id=' + place_id :
    geocodeUrl + '?lat=' + coords.latitude + '&lng=' + coords.longitude;

  const { data, error } = yield call(request, url);
  if (data) {
    if (data.json.status == "OK"){
      let location = data.json.results[0];
      yield put(userLocationSuccess(location));
    }
  }
  
}

export default [
  appSaga,
  geocodeSaga,
];