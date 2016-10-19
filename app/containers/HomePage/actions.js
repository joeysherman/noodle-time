/**
 * Created by Joey on 9/22/2016.
 */

import * as constants from './constants';

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
    payload: {
      message: 'Searching for your location...',
    },
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
      message: "Oh no! Couldn't find your location...",
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
    payload: {
      message: 'Finding locations near you!',
    }
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