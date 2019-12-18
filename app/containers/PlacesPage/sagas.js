import { take, call, put, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import request from "../../utils/request";
import { push } from "react-router-redux";

import { placesSuccess, placesError, detailSuccess } from "./actions";

import {
  PLACES_REQUEST,
  SET_SELECTED_INDEX,
  DETAIL_REQUEST
} from "./constants";

import { selectPlaceByIndex } from "./selectors";

let placesUrl = "/api/noodles";
let detailUrl = "/api/details";

// Individual exports for testing
export function* defaultSaga() {
  const action = yield take(PLACES_REQUEST);
  yield call(fetchNoodlePlaces, action.payload);
}

function* fetchNoodlePlaces(location) {
  const { latitude, longitude } = location;

  if (latitude && longitude) {
    let url = placesUrl + "?" + "lat=" + latitude + "&lng=" + longitude;

    const { data, err } = yield call(request, url);

    if (err) {
      yield put(placesError(data.data));
    } else if (data) {
      yield put(placesSuccess(data.jsonBody.businesses));
    }
  }
}

function* detailSaga() {
  while (true) {
    const { payload } = yield take(DETAIL_REQUEST);

    let url = detailUrl + "?id=" + payload;
    let { data, err } = yield call(request, url);

    if (err) {
      //console.log("error in detail saga - " + JSON.stringify(err));
    } else if (data) {
      //console.log("data in detail saga - " + JSON.stringify(data, null, 2));
      yield put(detailSuccess(payload, data));
    }
  }
}

// All sagas to be loaded
export default [defaultSaga, detailSaga];
