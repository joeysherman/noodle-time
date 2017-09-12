/*
 *
 * AutoComplete actions
 *
 */

import {
  DEFAULT_ACTION,
} from './constants';

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

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
