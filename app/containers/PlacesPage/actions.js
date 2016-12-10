/*
 *
 * PlacesPage actions
 *
 */

import * as constants from './constants';

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

export function placesRequest(location) {
  return {
    type: constants.PLACES_REQUEST,
    payload: location,
  }
}

export function decrementIndex() {
  return {
    type: constants.DECREMENT_INDEX,
  }
}

export function incrementIndex() {
  return {
    type: constants.INCREMENT_INDEX,
  }
}
