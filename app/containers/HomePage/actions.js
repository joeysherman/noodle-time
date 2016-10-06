/**
 * Created by Joey on 9/22/2016.
 */

import * as constants from './constants';

export function userLocationFound(userLocation) {
  return {
    type: constants.USER_LOCATION_FOUND,
    payload: userLocation,
  }
}

export function userLocationRequest() {
  return {
    type: constants.FETCH_USER_LOCATION,
  }
}

export function userLocationPending() {
  return {
    type: constants.USER_LOCATION_PENDING
  }
}

export function userLocationError(error) {
  return {
    type: constants.USER_LOCATION_ERROR,
    payload: error
  }
}


export function getUserLocation() {
  return new Promise((resolve, reject) => {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
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