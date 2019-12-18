/**
 * Created by Joey on 12/12/2016.
 */

import { take, put, call } from 'redux-saga/effects';
import request from '../../utils/request';

import { USER_LOCATION_REQUEST, GEOCODE_REQUEST } from './constants';

import {
  userLocationError,
  userLocationSuccess,
  fetchUserLocationGeo,
} from './actions';

const geocodeUrl = '/api/geocode';

export function* appSaga() {
  while (yield take(USER_LOCATION_REQUEST)) {
    const { location, err } = yield call(fetchUserLocationGeo);

    if (err) {
      yield put(userLocationError(err));
    } else {
      yield put(
        userLocationSuccess({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          timestamp: location.timestamp,
        }),
      );
    }
  }
}

function* geocodeSaga() {
  while (true) {
    const action = yield take(GEOCODE_REQUEST);

    console.log(`inside action${JSON.stringify(action)}`);

    const { coords } = action.payload;

    const url = coords
      ? `${geocodeUrl}?lat=${coords.latitude}&lng=${coords.longitude}`
      : `${geocodeUrl}?id=${action.payload}`;

    console.log(`url - ${url}`);

    const { data, error } = yield call(request, url);
    if (data) {
      if (data.json.status == 'OK') {
        const suggestion = data.json.results[0];
        const location = {
          latitude: suggestion.geometry.location.lat,
          longitude: suggestion.geometry.location.lng,
        };
        console.log('successfull geocode');
        console.log(suggestion);
        yield put(userLocationSuccess(location));
      }
    } else if (error) {
      console.log(error);
    }
  }
}

export default appSaga;
