/**
 * Created by Joey on 9/22/2016.
 */

import { fromJS } from 'immutable';

import * as constants from './constants';

const initialState = fromJS({
  mapsLoaded: false,
  loading: false,
  error: false,
  statusMessage: 'Click to begin!',
  displayMode: 'Card',
  places: null,
  distances: null
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
        .set('loading', false)
        .set('error', action.payload);

    case constants.AUTOCOMPLETE_ERROR :
      return state
        .set('loading', false)
        .set('error', action.payload);

    case constants.AUTOCOMPLETE_SUCCESS :
      let predictions;
      console.log(action.payload);
      if (!action.payload) return state;

      if (action.payload.predictions && typeof action.payload.predictions == 'Array'){
        predictions = action.payload.predictions.map((item) => item.description );
      }

      return state
        .set('loading', false)
        .set('autoComplete', predictions);

    case constants.PLACES_SUCCESS :

      return state
        .withMutations((map) => {
          map
            .set('loading', false)
            .set('error', false)
            .set('places', fromJS(action.payload));
        });

    case constants.PLACES_ERROR :
      return state
        .withMutations((map) => {
          map
            .set('loading', false)
            .set('places', null)
            .set('error', action.payload);

        });

    case constants.DISTANCE_MATRIX_SUCCESS :
      let distances = action.payload.json.rows[0].elements;
      let distances_with_index = distances.map((item, i) => Object.assign(item, { place_index: i }));

      distances_with_index.sort((a, b) => a.distance.value - b.distance.value);

      return state
        .set('distances', distances_with_index);


    case constants.DISTANCE_MATRIX_ERROR :
      return state
        .set('loading', false)
        .set('error', action.payload);

    /* Status message reducer */

    case constants.SET_STATUS_MESSAGE :
      return state
        .set('statusMessage', action.payload);

    case constants.GOOGLE_MAPS_LOAD_SUCCESS :
      return state
        .set('mapsLoaded', true);

  }

  return state;
}

export default homeReducer;