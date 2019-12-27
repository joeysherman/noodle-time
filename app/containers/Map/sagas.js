import { take, call, put, select } from "redux-saga/effects";
import { loadGoogleMapsPromise, mapLoadSuccess, mapLoadError } from "./actions";

import { MAP_LOAD_REQUEST, MOUNT_MAP_REQUEST } from "./constants";

import { selectLocation } from "../App/selectors";
import { selectPlaces } from "../PlacesPage/selectors";
// load map
// mount map
// wait for locations
// render locations
// wait for a click on a marker
// get directions from user -> marker
// render directions from user -> marker

// Individual exports for testing

var googleMap = false;
var userMarker = false;

export function* defaultSaga() {
  yield take(MAP_LOAD_REQUEST);
}

// All sagas to be loaded
export default defaultSaga;
