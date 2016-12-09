/**
 * Created by Joey on 9/22/2016.
 */

import * as constants from './constants';

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

export function autoCompleteItemSelected(index) {
  return {
    type: constants.AUTOCOMPLETE_ITEM_SELECTED,
    payload: index,
  }
}

// Action for user GPS

export function userHasGeo(bool) {
  return {
    type: constants.USER_HAS_GEO,
    payload: bool,
  }
}

export function noodleTime() {
  return {
    type: constants.NOODLE_TIME,
  }
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
      }, function(err) {
        resolve({ err });
      }, options);
    } else {
      resolve({
        err: { code: -1 },
      });
    }
  });
}