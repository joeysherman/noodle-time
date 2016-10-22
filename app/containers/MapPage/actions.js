/**
 * Created by Joey on 10/22/2016.
 */


/*
* Actions for MapPage
* */

import * as constants from './constants';
import promisescript from 'promisescript';

const apiKey = 'AIzaSyC0k6alaE-wq9k46ovNZNpY2ZNQgeRwwsY';

const promiseScriptOptions = {
  url: 'https://maps.googleapis.com/maps/api/js?key=' + apiKey,
  type: 'script',
  exposed: 'Google',
};

export function maploadSuccess(){
  return {
    type: constants.MAP_LOAD_SUCCESS
  }
}

export function mapLoadError(error) {
  return {
    type: constants.MAP_LOAD_ERROR,
    payload: error,
  }
}

export function mapLoadPending() {
  return {
    type: constants.MAP_LOAD_PENDING,
  }
}

export function mapLoadRequest() {
  return {
    type: constants.MAP_LOAD_REQUEST,

  }
}

export function loadMapPromise(){
  return promisescript(promiseScriptOptions);
}