/**
 * Created by Joey on 9/22/2016.
 */

import * as constants from './constants';

export function userLocationFound(userLocation) {
  return {
    type: constants.USER_LOCATION_FOUND,
    payload: userLocation
  }
}

export function userLocationRequest() {
  return {
    type: constants.FETCH_USER_LOCATION,
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
    if ("navigator" in window) {
      window.navigator.geolocation.getCurrentPosition((location) => {
        resolve(location);
      }, (error) => {
        reject(error);
      });
    } else {
      reject({
        message: 'No Navigator',
      })
    }
  });
}