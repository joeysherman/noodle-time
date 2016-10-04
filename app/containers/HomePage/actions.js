/**
 * Created by Joey on 9/22/2016.
 */

import * as constants from './constants';

export function userLocationFound(userLocation) {
  return {
    type: constants.USER_LOCATION_FOUND,
    userLocation
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
    error
  }
}


export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if ("navigator" in window) {
      window.navigator.geolocation.getCurrentPosition((location) => {
        resolve({ data: location });
      }, (error) => {
        reject({ error: error });
      });
    } else {
      reject({
        error: 'No Navigator',
      })
    }
  });
}