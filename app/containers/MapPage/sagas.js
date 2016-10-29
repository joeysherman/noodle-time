/**
 * Created by Joey on 10/22/2016.
 */

import { put, call, take } from 'redux-saga/effects';

import {
  mapLoadPending,
  mapLoadError,
  maploadSuccess,
  loadMapPromise,
} from './actions';

import {
  MAP_LOAD_REQUEST,
} from './constants';

export function* mapPageSaga() {

  yield take(MAP_LOAD_REQUEST);

  try {

    yield put(mapLoadPending());
    yield call(loadMapPromise);
    yield put(maploadSuccess());

  } catch (error) {
    console.log(error);
    yield put(mapLoadError(error));

  }
}


export default [
  mapPageSaga,
];