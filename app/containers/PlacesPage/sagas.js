import { take, call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import request from '../../utils/request';
import { push } from 'react-router-redux';

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
  const { latitude, longitude } = location;

  if (latitude && longitude) {
    let url = placesUrl + '?' + 'lat=' + latitude + '&lng=' + longitude;

    const { data, err } = yield call(request, url);

    if (data) {
      if (data.statusCode) {
        yield put(placesError(data.data));
      } else {
        yield put(placesSuccess(data.businesses));
      }
    } else {
      yield put(placesError(err));
    }
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
