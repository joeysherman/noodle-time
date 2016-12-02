/*
 *
 * Map reducer
 *
 */

import { fromJS } from 'immutable';
import {
  MAP_LOAD_SUCCESS,
  MAP_LOAD_REQUEST,
} from './constants';

const initialState = fromJS({
  loaded: false,
});

function mapReducer(state = initialState, action) {
  switch (action.type) {
    case MAP_LOAD_SUCCESS:
      return state
        .set('loaded', true);

    default:
      return state;
  }
}

export default mapReducer;
