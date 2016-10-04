/**
 * Created by Joey on 9/22/2016.
 */

import { fromJS } from 'immutable';

import * as constants from './constants';

const initialState = fromJS({
   loading: false,
   error: false,
});

export default function homeReducer (state = initialState, action){
    
    switch (action.type) {
      case constants.USER_LOCATION_PENDING : 
            return state.set('loading', true);
      case constants.USER_LOCATION_FOUND :
            return state
              .set('loading', false)
              .set('error', false)
              .setIn('userLocation', action.userLocation);
      case constants.USER_LOCATION_ERROR :
            return state
              .set('loading', false)
              .setIn('error', action.error);
    }
  return state;
}

export default homeReducer;