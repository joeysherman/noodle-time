/*
 *
 * PlacesPage actions
 *
 */

import * as constants from "./constants";

export function placesSuccess(places) {
  return {
    type: constants.PLACES_SUCCESS,
    payload: places
  };
}

export function placesError(error) {
  return {
    type: constants.PLACES_ERROR,
    payload: error
  };
}

export function placesRequest(location) {
  return {
    type: constants.PLACES_REQUEST,
    payload: location
  };
}

export function detailRequest(id) {
  return {
    type: constants.DETAIL_REQUEST,
    payload: { id },
  };
}

export function detailSuccess(id, data) {
  return {
    type: constants.DETAIL_SUCCESS,
    payload: {
      data,
      id
    }
  };
}

export function incPlacesIndex() {
  return {
    type: constants.INC_SELECTED_INDEX
  };
}

export function decPlacesIndex() {
  return {
    type: constants.DEC_SELECTED_INDEX
  };
}

export function setPlacesIndex(index) {
  return {
    type: constants.SET_SELECTED_INDEX,
    payload: index
  };
}
