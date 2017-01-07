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

let autcompleteInitialState = {
  loading: false,
  error: false,
  predictions: false,
};

function autocompleteReducer(state = fromJS(autcompleteInitialState), action) {

  switch (action.type) {
    case constants.AUTOCOMPLETE_ERROR :
      return state
        .set('loading', false)
        .set('error', action.payload);

    case constants.AUTOCOMPLETE_SUCCESS :
      let predictions = [];

      if (action.payload.json.status == 'OK'){
        predictions = action.payload.json.predictions;
      }
      return state
        .set('predictions', predictions);

  }

  return state;
}

export default combineReducers({
  'home': homeReducer,
  'autocomplete': autocompleteReducer,
});