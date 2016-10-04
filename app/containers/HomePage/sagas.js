/**
  v * Created by Joey on 9/22/2016.
 */


import { take, put, fork, call } from 'redux-saga/effects';
import { FETCH_USER_LOCATION } from './constants';
import {
  getUserLocation,
  userLocationError,
  userLocationFound,
  userLocationPending,
} from './actions';

export function* homePageSaga() {
  yield take(FETCH_USER_LOCATION);

  yield put(userLocationPending());
  const location = yield call(getUserLocation);

  if (!location.error) {
    yield put(userLocationFound(location.data));
  } else {
    yield put(userLocationError(location.error));
  }
}

export default [
  homePageSaga,
];