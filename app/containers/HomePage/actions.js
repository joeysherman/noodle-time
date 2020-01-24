/**
 * Created by Joey on 9/22/2019.
 */

import * as constants from './constants';

/* Status message */

export function setStatusMessage(message) {
  return {
    type: constants.SET_STATUS_MESSAGE,
    payload: message,
  }
}

export function noodleTime() {
  return {
    type: constants.NOODLE_TIME,
  }
}