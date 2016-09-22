/**
  v * Created by Joey on 9/22/2016.
 */


import { take, put, fork, call } from 'redux-saga/effects';
import { FETCH_USER_LOCATION } from './constants';
import {
  getUserLocation,
  userLocationError,
  userLocationFound,
} from './actions';

export function* homePageSaga() {
  yield take(FETCH_USER_LOCATION);
  
  try {
    const location = yield call(getUserLocation);
    yield put(userLocationFound(location));
  } catch (error) {
    yield put(userLocationError(error));
  }
}

export default [
  homePageSaga,
];