/**
 * Created by Joey on 9/22/2016.
 */

import { fromJS } from 'immutable';

import * as constants from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  statusMessage: 'Click to begin!',
  userLocation: {
    timestamp: null,
    latitude: null,
    longitude: null,
  },
  autoComplete: null,
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
        .withMutations((map) => {
          map
            .set('loading', false)
            .set('error', false)
            .setIn(['userLocation', 'timestamp'], timestamp)
            .setIn(['userLocation', 'latitude'], latitude)
            .setIn(['userLocation', 'longitude'], longitude);
        });

    case constants.USER_LOCATION_ERROR :

      return state
        .set('userLocation', fromJS({ error: true }));

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
            place_id : item.place_id,
          };
        });
      }

      return state
        .set('autoComplete', predictions);

    /* Status message reducer */

    case constants.SET_STATUS_MESSAGE :
      return state
        .set('statusMessage', action.payload);

  }

  return state;
}

export default homeReducer;