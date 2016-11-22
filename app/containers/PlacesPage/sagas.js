import { take, call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import request from '../../utils/request';
import {
  placesSuccess,
  placesError,
} from './actions';

import {
  PLACES_REQUEST,
} from './constants';

let placesUrl         = '/api/noodles';

// Individual exports for testing
export function* defaultSaga() {
  const action = yield take(PLACES_REQUEST);
  yield call(fetchNoodlePlaces, action.payload);
}

function* fetchNoodlePlaces(location) {
  const { lat, lng } = location;

  if (lat && lng) {
    let url = placesUrl + '?' + 'lat=' + lat + '&lng=' + lng;

    const places = yield call(request, url);

    if (places.data) {
      yield call(delay, 1000);
      yield put(placesSuccess(places.data.businesses));
    } else {
      yield put(placesError(places.err));
    }
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
