/**
  v * Created by Joey on 9/22/2016.
 */

import { take, put } from 'redux-saga/effects';

import { USER_LOCATION_SUCCESS } from '../App/constants';
import { geocodeRequest } from '../App/actions';
import { AUTOCOMPLETE_ITEM_SELECTED } from '../AutoComplete/constants';

export function* homePageSaga() {
  while (true) {
    // find coords for location via reverse geo-code
    // put userlocationsuccess
    const { payload } = yield take(AUTOCOMPLETE_ITEM_SELECTED);
    yield put(geocodeRequest(payload));
    yield take(USER_LOCATION_SUCCESS);
    yield put(
      push({
        pathname: '/search',
      }),
    );
  }
}

export default homePageSaga;
