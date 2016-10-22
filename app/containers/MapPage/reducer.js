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

const initialState = fromJS({
  loaded: false,
});

export default function(state = initialState, action) {
  switch(action.type) {
    default :
      return state;
  }
}