/*
 *
 * Map reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DIRECTIONS_ERROR,
  DIRECTIONS_REQUEST,
  DIRECTIONS_SUCCESS,

  MAP_LOAD_ERROR,
  MAP_LOAD_REQUEST,
  MAP_LOAD_SUCCESS
} from './constants';

const initialState = fromJS({
  loaded: false,
  viewIndex: -1,
});



function mapReducer(state = initialState, action) {
  switch (action.type) {
    case MAP_LOAD_SUCCESS:
      return state
        .set('loaded', true);
    case DIRECTIONS_REQUEST:
      return state
        .set('directions', 'loading');
    case DIRECTIONS_SUCCESS:
      return state
        .set('directions', action.payload);

    case DIRECTIONS_ERROR:
      return state
        .set('directions', 'error');
    default:
      return state;
  }
}

export default mapReducer;
