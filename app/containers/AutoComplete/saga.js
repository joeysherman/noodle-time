import {
  take,
  actionChannel,
  throttle,
  put,
  fork,
  call,
  race,
  cancel,
  cancelled,
  delay
} from "redux-saga/effects";

import request from "../../utils/request";

import { AUTOCOMPLETE_ERROR, AUTOCOMPLETE_ITEM_SELECTED, AUTOCOMPLETE_REQUEST, AUTOCOMPLETE_SUCCESS } from './constants';
import { USER_LOCATION_SUCCESS } from "../App/constants";

import {
  geocodeRequest
} from "../App/actions";

import {
  autoCompleteSuccess,
  autoCompleteError
} from "../AutoComplete/actions"

let autoCompleteUrl = "/api/autocomplete";
let geocodeUrl = "/api/geocode";

// Individual exports for testing


function b(
  a // placeholder
  ) {
    return a // if the placeholder was passed, return
    ? // a random number from 0 to 15
    (
      a ^ // unless b is 8,
      ((Math.random() * // in which case
          16) >> // a random number from
          (a / 4))
          ) // 8 to 11
          .toString(16) // in hexadecimal
    : // or otherwise a concatenated string:
    (
      [1e7] + // 10000000 +
      -1e3 + // -1000 +
      -4e3 + // -4000 +
      -8e3 + // -80000000 +
      -1e11
      ) // -100000000000,
      .replace(
          // replacing
          /[018]/g, // zeroes, ones, and eights with
          b // random hex digits
          );
        }
        
        function* fetchAutocomplete(sessionToken, action) {
          let url =
    autoCompleteUrl +
    "?input=" +
    action.payload.input +
    "&sessiontoken=" +
    sessionToken;
    try {
      const { data, err } = yield call(request, url);
      
      if (data) {
        yield put(autoCompleteSuccess(data));
      } else {
        yield put(autoCompleteError(err));
      }
    } catch(error) {
       console.log("Error in fetch autocomplete: " + error);
    } finally {
      if (yield cancelled()) {
        console.log("cancelled api call");
      }
  } 
}

function* throttleAutocomplete(options) {
  yield throttle(750, AUTOCOMPLETE_REQUEST, fetchAutocomplete, options[0]);
}

export function* defaultSaga() {
  const sessionToken = b();
  const autocompleteTask = yield fork(throttleAutocomplete, [sessionToken]);
  
  const {
    payload }  = yield take(AUTOCOMPLETE_ITEM_SELECTED);

  if (autocompleteTask) {
    yield cancel(autocompleteTask);
  }
}

// All sagas to be loaded
export default defaultSaga;
