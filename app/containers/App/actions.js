/**
 * Created by Joey on 12/12/2016.
 */

import * as constants from './constants';

// Action for user GPS

export function userHasGeo(bool) {
  return {
    type: constants.USER_HAS_GEO,
    payload: bool,
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