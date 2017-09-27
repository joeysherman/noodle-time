import { take, call, put, select } from 'redux-saga/effects';
import {
  loadGoogleMapsPromise,
  mapLoadSuccess,
  mapLoadError,
} from './actions';
import {
  MAP_LOAD_REQUEST,
} from './constants';

import {
  selectLocation
} from "../App/selectors";

// load map
// mount map
// wait for locations
// render locations
// wait for a click on a marker
// get directions from user -> marker
// render directions from user -> marker

// Individual exports for testing

var googleMap = false;

export function* defaultSaga() {
  yield take(MAP_LOAD_REQUEST);
  try {
    yield call(loadGoogleMapsPromise);
    yield put({ type: 'MOUNT_MAP'});
  } catch (error) {
    console.log('error loading maps');
    console.log(error)
  }
}

function* mountMap() {
  yield take('MOUNT_MAP');
  console.log('mounting map saga');
  const user = yield select(selectLocation());
  const userLocation = user.geometry.location;

  if (window.google) {
    googleMap = new window.google.maps.Map(document.getElementById('map'), {
      center: userLocation,
      zoom: 15,
    });
  }
  yield call(locationsWatcher);
}

function* locationsWatcher() {
  const { payload } = yield take('PLACES_SUCCESS');

  // check if payload !== array || length == 0
  console.log('locWat ' + payload.length);
  const placeCoords = getPlaceCoords(payload);
  placeAllPlacesOnMap(placeCoords);
  extendMapBounds(placeCoords);
}

function getPlaceCoords(places) {
  return places.map((item) => {
    return {
      lat: item.location.coordinate.latitude,
      lng: item.location.coordinate.longitude,
    };
  });
}

function extendMapBounds(arrOfCoords) {
  let bounds = googleMap.getBounds();

  arrOfCoords.forEach((coords) => {
    bounds = bounds.extend(coords);
  });

  googleMap.fitBounds(bounds);
}

function placeAllPlacesOnMap(arrOfCoords) {

  arrOfCoords.map((coords, i) => {
    new window.google.maps.Marker({
      map: googleMap,
      position: coords,
      label: i.toString(),
      clickable: true,
    });
  });
}

function placeUserLocationOnMap() {
  let { geometry } = this.props.userLocation;
  let userLocation = geometry.location;

  let marker = new window.google.maps.Marker({
    map: window.map,
    position: userLocation,
  });
};


/*if (!window.mapMarkers){
  window.mapMarkers = [];
}
let marker = new window.google.maps.Marker({
  map: window.map,
  position: data.coords,
  clickable: true,
  label: data.label,
});

window.mapMarkers.push(marker);

return marker;*/


// All sagas to be loaded
export default [
  defaultSaga,
  mountMap,
];
