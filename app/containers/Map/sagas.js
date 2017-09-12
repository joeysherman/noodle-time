import { take, call, put, select } from 'redux-saga/effects';
import {
  loadGoogleMapsPromise,
  mapLoadSuccess,
  mapLoadError,
} from './actions';
import {
  MAP_LOAD_REQUEST,
} from './constants';



// Individual exports for testing
export function* defaultSaga() {
  yield take(MAP_LOAD_REQUEST);
  try {
    yield call(loadGoogleMapsPromise);
    yield put(mapLoadSuccess());
  } catch (error) {
    yield put(mapLoadError(error));
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
