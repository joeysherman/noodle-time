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
    const location = yield select(selectLocation());

    mountMap(location);
  } catch (error) {
    console.log('error loading maps');
    console.log(error)
  }
}

function mountMap(user) {
  let userLocation = user.geometry.location;

  if (window.google) {
    googleMap = new window.google.maps.Map(document.getElementById('map'), {
      center: userLocation,
      zoom: 15,
    });
  }
}

function extendMapBounds() {
  let bounds = this.getMapBounds();
  let placesCoords = this.getPlacesCoords();

  placesCoords.forEach((item) => {
    bounds = bounds.extend(item);
  });

  window.map.fitBounds(bounds);
};

function placeAllPlacesOnMap() {
  let { places } = this.props;

  if (places.length){
    let holder;

    places.map((item, i) => {
      holder = this.createAndSetMarker({
        coords: {
          lat: item.location.coordinate.latitude,
          lng: item.location.coordinate.longitude,
        },
        label: i.toString(),
      });

      this.attachListenerToMarker(holder, i);

    });
  }
};

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
];
