/*
 *
 * Map actions
 *
 */

//import promisescript from 'promisescript';
import {
  MAP_LOAD_ERROR,
  MAP_LOAD_REQUEST,
  MAP_LOAD_SUCCESS,
} from './constants';

export function mapLoadRequest() {
  return {
    type: MAP_LOAD_REQUEST,
  }
}

export function mapLoadSuccess() {
  return {
    type: MAP_LOAD_SUCCESS,
  }
}

export function mapLoadError(error) {
  return {
    type: MAP_LOAD_ERROR,
    payload: error,
  }
}


/* Load Google maps api via promisescript */
const API_KEY = 'AIzaSyBUXW19bkxMuxxTC3it0l_3lG1c8CPSCQc';

const promiseScriptOptions = {
  url: 'https://maps.googleapis.com/maps/api/js?v=3&key=' + API_KEY + '&libraries=places',
  type: 'script',
  exposed: 'google',
};

export function loadGoogleMapsPromise() {
  return promisescript(promiseScriptOptions);
}


export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
