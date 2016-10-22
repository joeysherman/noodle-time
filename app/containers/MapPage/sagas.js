/**
 * Created by Joey on 10/22/2016.
 */

import { put, call } from 'redux-saga/effects';

import {
  mapLoadPending
} from './actions';

export function* mapPageSaga() {
  yield put(mapLoadPending());

}


export default [
  mapPageSaga,
];