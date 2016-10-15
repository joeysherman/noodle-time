/**
 * Created by Joey on 9/22/2016.
 */

import { fromJS } from 'immutable';

import * as constants from './constants';

const initialState = fromJS({
   loading: false,
   error: false,
});

function homeReducer (state = initialState, action){
  switch (action.type) {

    case constants.USER_LOCATION_PENDING :
      return state
        .set('loading', true)
        .set('error', false);

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
        let { code } = action.payload;

      return state
        .set('loading', false)
        .set('error', true);

    case constants.AUTOCOMPLETE_ERROR :

      return state
        .set('loading', false)
        .set('error', true);
    case constants.AUTOCOMPLETE_SUCCESS :
      let predictions;
      console.log(action.payload);
      if (!action.payload) return state;

      if (action.payload.predictions && typeof action.payload.predictions == 'Array'){
        predictions = action.payload.predictions.map((item) => item.description );
      } ;
      return state
        .set('loading', false)
        .set('autoComplete', predictions);
  }

  return state;
}

export default homeReducer;