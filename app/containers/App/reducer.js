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
  fetching: false,
  location: {
    latitude: null,
    longitude: null,
    timestamp: null,
  },
  address: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case constants.USER_LOCATION_SUCCESS :
      let { latitude, longitude } = action.payload.coords;
      let { timestamp } = action.payload;

      return state
        .set('location', fromJS({
          timestamp,
          latitude,
          longitude,
        }));

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
