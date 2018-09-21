/**
 * Created by Joey on 12/12/2016.
 */

/*
 *
 * AppBar reducer
 *
 */

import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  hasGeo: false,
  loading: false,
  error: false,
  location: {},
});

function appReducer(state = initialState, action) {

  switch (action.type) {

    case constants.USER_LOCATION_REQUEST :
      return state
        .set('loading', true)
        .set('location', fromJS({}));

    case constants.USER_LOCATION_SUCCESS :
      
      return state
        .set('loading', false)
        .set('location', fromJS(action.payload));

    case constants.USER_LOCATION_ERROR :
      let { code } = action.payload;
      let message = '';

      switch (code) {
        case 1 :
          message = 'DENIED';
          break;
        case 2 :
          message = 'UNAVAILABLE';
          break;
        case 3 :
          message = 'TIMEOUT';
          break;
        default:
          message = 'DEFAULT';
      }

      return state
        .set('loading', false)
        .set('location', fromJS({
          error: true,
          message: message,
        }));

    case constants.USER_HAS_GEO :
      return state
        .set('hasGeo', action.payload);

    
    default:
      return state;
  }
}

export default appReducer;
