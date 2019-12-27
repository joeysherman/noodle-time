/**
 * Created by Joey on 12/12/2016.
 */

/*
 *
 * AppBar reducer
 *
 */

import produce from 'immer';
import * as constants from './constants';

const initialState = {
  hasGeo: false,
  loadingGeo: false,
  error: false,
  location: false,
};

const appReducer = (state = initialState, action) =>
  produce(state, (draft) => { 

  switch (action.type) {

    case constants.USER_LOCATION_REQUEST :
      draft.loadingGeo = true;
      draft.location = {};
      break;

    case constants.USER_LOCATION_SUCCESS :
      draft.loadingGeo = false;
      draft.location = action.payload;
      break;

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

      draft.loadingGeo = false;
      draft.error = message;
      break;

    case constants.USER_HAS_GEO :
      draft.hasGeo = action.payload;
    
    default:
      return draft;
  }
});

export default appReducer;
