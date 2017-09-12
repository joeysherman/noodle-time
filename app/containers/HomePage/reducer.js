  /**
 * Created by Joey on 9/22/2016.
 */

import { fromJS, Map } from 'immutable';
import { combineReducers } from 'redux-immutable';

import * as constants from './constants';

const initialState = fromJS({
  noodleTime: false,
  statusMessage: 'Click to begin!',
});

/*
*  Reducer function - takes an action and returns new state based on action.type
*  action.type layout goes:
*  - *name*_pending
*  - *name*_success
*  - *name*_error
*
*  */

function homeReducer (state = initialState, action){

  switch (action.type) {
    
    // Toggle noodletime
    case constants.NOODLE_TIME :
      return state
        .update('noodleTime', (value) => !value);

    /* Status message reducer */
    case constants.SET_STATUS_MESSAGE :
      return state
        .set('statusMessage', action.payload);
  }

  return state;
}

export default homeReducer;