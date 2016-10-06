/**
  v * Created by Joey on 9/22/2016.
 */


import { take, put, fork, call } from 'redux-saga/effects';
import { FETCH_USER_LOCATION, USER_LOCATION_ERROR } from './constants';
import {
  getUserLocation,
  userLocationError,
  userLocationFound,
  userLocationPending,
} from './actions';

export function* homePageSaga() {
  while (yield take(FETCH_USER_LOCATION)) {

    yield put(userLocationPending());
    const {location, error} = yield call(getUserLocation);

    if (location) {
      yield put(userLocationFound(location));
    } else if (error) {

      yield put(userLocationError(error));
    }
  }
}

export default [
  homePageSaga,
];