import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import request from '../../utils/request';

import { placesSuccess, placesError, detailSuccess } from './actions';

import {
  PLACES_REQUEST,
  SET_SELECTED_INDEX,
  DETAIL_REQUEST,
} from './constants';

import { selectPlaceByIndex } from './selectors';

let placesUrl = '/api/noodles';
let detailUrl = '/api/details';

// Individual exports for testing
export function* defaultSaga() {
  yield takeLatest(PLACES_REQUEST, fetchNoodlePlaces);
  yield takeLatest(DETAIL_REQUEST, fetchPlaceDetail);
}

function* fetchNoodlePlaces(action) {
  const { latitude, longitude } = action.payload;

  if (latitude && longitude) {
    let url = placesUrl + '?' + 'lat=' + latitude + '&lng=' + longitude;

    const { data, err } = yield call(request, url);

    if (err) {
      yield put(placesError(data.data));
    } else if (data) {
      console.log(data);
      yield put(placesSuccess(data.jsonBody.businesses));
    }
  }
}

function* fetchPlaceDetail(action) {
  let { id }= action.payload
  let url = detailUrl + '?id=' + id;
  let { data, err } = yield call(request, url);

  if (err) {
    console.log('error in detail saga - ' + JSON.stringify(err));
  } else if (data) {
    yield put(detailSuccess(id, data));
  }
}

// All sagas to be loaded
export default defaultSaga;
