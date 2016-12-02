/**
 * Created by Joey on 9/22/2016.
 */

import { fromJS, Map } from 'immutable';
import { combineReducers } from 'redux-immutable';

import * as constants from './constants';

const initialState = fromJS({
  statusMessage: 'Click to begin!',
  userLocation: {
    latitude: null,
    longitude: null,
    timestamp: null,
  },
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

    case constants.USER_LOCATION_SUCCESS :
      let { latitude, longitude } = action.payload.coords;
      let { timestamp } = action.payload;

      return state
        .set('userLocation', fromJS({
          timestamp,
          latitude,
          longitude,
        }));

    case constants.USER_LOCATION_ERROR :

      return state
        .set('userLocation', fromJS({ error: true }));

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
  predictions: [],
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
        predictions = action.payload.json.predictions.map((item) => {
          return {
            text: item.description,
            value: item.place_id,
          }
        });
      }
      return state
        .set('predictions', predictions);
  }

  return state;
}

export default combineReducers({
  'user': homeReducer,
  'autocomplete': autocompleteReducer,
});