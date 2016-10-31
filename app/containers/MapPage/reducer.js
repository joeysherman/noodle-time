/**
 * Created by Joey on 10/22/2016.
 */

/*
*  Reducers
*
*  @input - an action
 * @output - new State tree
*
* */

import { fromJS } from 'immutable';

import * as constants from './constants';

const initialState = fromJS({
  loaded: false,
  selectedPlaceIndex: null,
});

export default function(state = initialState, action) {
  switch(action.type) {

    // Map load reducers
    case constants.MAP_LOAD_SUCCESS :
          return state
            .set('loaded', true);
    case constants.MAP_LOAD_PENDING :
          return state
            .set('loaded', 'pending');
    case constants.MAP_LOAD_ERROR :
          return state
            .set('loaded', 'error');

    // Map Marker selected actions
    case constants.MAP_MARKER_CLICKED :
      return state
        .set('selectedPlaceIndex', action.payload);
    default :
      return state;
  }
}