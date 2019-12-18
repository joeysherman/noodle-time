/**
 * Created by Joey on 9/22/2016.
 */
import produce from 'immer';
import * as constants from './constants';

export const initialState = {
  noodleTime: false,
};

/*
 *  Reducer function - takes an action and returns new state based on action.type
 *  action.type layout goes:
 *  - *name*_pending
 *  - *name*_success
 *  - *name*_error
 *
 *  */

const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.NOODLE_TIME:
        draft.noodletime = true;
        break;
    }
  });

export default homeReducer;
