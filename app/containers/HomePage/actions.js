/**
 * Created by Joey on 9/22/2016.
 */

import * as constants from './constants';
import promisescript from 'promisescript';

/* Status message */

export function setStatusMessage(message) {
  return {
    type: constants.SET_STATUS_MESSAGE,
    payload: message,
  }
}

/* User Location */

export function userLocationSuccess(userLocation) {
  return {
    type: constants.USER_LOCATION_SUCCESS,
    payload: userLocation,
  }
}

export function userLocationRequest() {
  return {
    type: constants.USER_LOCATION_REQUEST,
  }
}

export function userLocationError(error) {
  return {
    type: constants.USER_LOCATION_ERROR,
    payload: error
  }
}

/* AutoComplete */

export function autoCompleteRequest(input) {
  return {
    type: constants.AUTOCOMPLETE_REQUEST,
    payload: {
      input,
    }
  }
}

export function autoCompleteSuccess(response) {
  return {
    type: constants.AUTOCOMPLETE_SUCCESS,
    payload: response,
  }
}

export function autoCompleteError(error) {
  return {
    type: constants.AUTOCOMPLETE_ERROR,
    payload: error,
  }
}

/* Places */

export function placesSuccess(places) {
  return {
    type : constants.PLACES_SUCCESS,
    payload: places
  }
}

export function placesError(error) {
  return {
    type: constants.PLACES_ERROR,
    payload: error,
  }
}

export function placesRequest() {
  return {
    type: constants.PLACES_REQUEST,
  }
}

/* Place Details */

export function placeDetailsSuccess(details) {
  return {
    type : constants.PLACE_DETAILS_SUCCESS,
    payload: details
  }
}

export function placeDetailsError(error) {
  return {
    type: constants.PLACE_DETAILS_ERROR,
    payload: error,
  }
}

export function placeDetailsRequest() {
  return {
    type: constants.PLACE_DETAILS_REQUEST,
  }
}

/* Distance Matrix */

export function distanceMatrixSuccess(distances) {
  return {
    type: constants.DISTANCE_MATRIX_SUCCESS,
    payload: distances
  }
}

export function distanceMatrixError(error) {
  return {
    type: constants.DISTANCE_MATRIX_ERROR,
    payload: error
  }
}

export function googleMapsLoadError(error) {
  return {
    type: constants.GOOGLE_MAPS_LOAD_ERROR,
    payload: error,
  }
}

export function googleMapsLoadSuccess() {
  return {
    type: constants.GOOGLE_MAPS_LOAD_SUCCESS,
  }
}

export function googleMapsLoadRequest() {
  return {
    type: constants.GOOGLE_MAPS_LOAD_REQUEST,
  }
}

/* Load Google maps api via promisescript */
 const API_KEY = 'AIzaSyC0k6alaE-wq9k46ovNZNpY2ZNQgeRwwsY';

const promiseScriptOptions = {
  url: 'https://maps.googleapis.com/maps/api/js?key=' + API_KEY + '&libraries=places',
  type: 'script',
  exposed: 'google',
};

export function loadGoogleMapsPromise() {
  return promisescript(promiseScriptOptions);
}

/*
* Fetch user Location by navigator
*
* #return Promise that gets resolved with:
* [Object} location or error as properties
 *
* */
export function fetchUserLocationGeo() {
  return new Promise((resolve, reject) => {
    let options = {
      enableHighAccuracy: true,
      timeout: 1000,
      maximumAge: 10
    };

    if ("navigator" in window) {
      window.navigator.geolocation.getCurrentPosition(function(location) {
        resolve({ location });
      }, function(error) {
        resolve({ error });
      }, options);
    } else {
      resolve({
        error: 'No Navigator',
      })
    }
  });
}