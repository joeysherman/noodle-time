/*
 *
 * Map reducer
 *
 */

import produce from 'immer';
import {
  DIRECTIONS_ERROR,
  DIRECTIONS_REQUEST,
  DIRECTIONS_SUCCESS,
  MAP_LOAD_ERROR,
  MAP_LOAD_REQUEST,
  MAP_LOAD_SUCCESS,
} from './constants';

const initialState = {
  loaded: false,
  viewIndex: false,
};

const mapReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case MAP_LOAD_SUCCESS:
        draft.loaded = true;
        break;
      case DIRECTIONS_REQUEST:
        draft.directions.loading = true;
        break;
      case DIRECTIONS_SUCCESS:
        draft.directions.directions = action.payload;
        break;
      case DIRECTIONS_ERROR:
        draft.directions.error = action.payload;
        break;
      default:
        draft;
    }
  });

export default mapReducer;
