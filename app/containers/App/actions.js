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

export function userAddressSuccess(address) {
  return {
    type: constants.USER_ADDRESS_SUCCESS,
    payload: address
  }
}

export function userAddressRequest() {
  return {
    type: constants.USER_ADDRESS_REQUEST,
  }
}

export function userAddressError(error) {
  return {
    type: constants.USER_ADDRESS_ERROR,
    payload: error
  }
}

export function userLocationSuccess(location) {
  return {
    type: constants.USER_LOCATION_SUCCESS,
    payload: location
  }
}

export function geocodeRequest(request) {
  return {
    type: constants.GEOCODE_REQUEST,
    payload: request,
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
      timeout: 30000
    };

    if ("navigator" in window) {
      window.navigator.geolocation.getCurrentPosition(function(location) {
        console.log('we have location!')
        resolve({ location });
      }, function(err) {
        console.log('Error code ' + err.code + ' - ' + err.message);
        resolve({ err });
      }, options);
    } else {
      resolve({
        err: { code: -1 },
      });
    }
  });
}