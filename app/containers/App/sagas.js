/**
 * Created by Joey on 12/12/2016.
 */

import { take, put, fork, call, cancel } from 'redux-saga/effects';
import request from '../../utils/request';

import {
  USER_LOCATION_REQUEST,
  USER_LOCATION_ERROR,
  USER_LOCATION_SUCCESS,
} from './constants';

import {
  userLocationError,
  userLocationSuccess,
  fetchUserLocationGeo,
} from './actions';

export function* appSaga() {

  while (yield take(USER_LOCATION_REQUEST)){
    const fetchUserTask = yield fork(fetchUserLocation);

    const action = yield take([USER_LOCATION_ERROR, USER_LOCATION_SUCCESS]);

    console.log(action);
    
    yield cancel(fetchUserTask);
  }
}

function* fetchUserLocation() {
  const { location, err } = yield call(fetchUserLocationGeo);

  if (location) {
    yield put(userLocationSuccess(location));
  } else {
    yield put(userLocationError(err));
  }
}

export default [
  appSaga,
];