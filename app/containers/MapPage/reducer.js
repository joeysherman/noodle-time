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
});

export default function(state = initialState, action) {
  switch(action.type) {
    case constants.MAP_LOAD_SUCCESS :
          return state
            .set('loaded', true);
    case constants.MAP_LOAD_PENDING :
          return state
            .set('loaded', 'pending');
    case constants.MAP_LOAD_ERROR :
          return state
            .set('loaded', 'error');
    default :
      return state;
  }
}