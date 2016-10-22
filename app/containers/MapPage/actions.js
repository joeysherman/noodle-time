/**
 * Created by Joey on 10/22/2016.
 */


/*
* Actions for MapPage
* */

import * as constants from './constants';

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