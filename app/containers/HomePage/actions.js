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

export function userLocationSuccess(location) {
  return {
    type: constants.USER_LOCATION_SUCCESS,
    payload: location
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


/* Load Google maps api via promisescript */
 const API_KEY = 'AIzaSyC0k6alaE-wq9k46ovNZNpY2ZNQgeRwwsY';

var promiseScriptOptions = {
  url: 'https://maps.googleapis.com/maps/api/js?v=3&key=' + API_KEY + '&libraries=places',
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