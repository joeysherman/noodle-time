/**
 * Created by Joey on 9/22/2016.
 */

import * as constants from './constants';

/* Status message */

export function setStatusMessage(message) {
  return {
    type: constants.SET_STATUS_MESSAGE,
    payload: message,
  }
}

/* AutoComplete */

export function autoCompleteRequest(input) {
  return {
    type: constants.AUTOCOMPLETE_REQUEST,
    payload: {
      input,
    }
  }
}

export function autoCompleteSuccess(response) {
  return {
    type: constants.AUTOCOMPLETE_SUCCESS,
    payload: response,
  }
}

export function autoCompleteError(error) {
  return {
    type: constants.AUTOCOMPLETE_ERROR,
    payload: error,
  }
}

export function autoCompleteItemSelected(index) {
  return {
    type: constants.AUTOCOMPLETE_ITEM_SELECTED,
    payload: index,
  }
}

export function noodleTime() {
  return {
    type: constants.NOODLE_TIME,
  }
}