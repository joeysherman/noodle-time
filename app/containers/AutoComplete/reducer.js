/*
 *
 * AutoComplete reducer
 *
 */

import { fromJS } from 'immutable';
import * as constants from './constants';

let autoCompleteInitialState = {
  loading: false,
  error: false,
  predictions: false,
};

function autoCompleteReducer(state = fromJS(autoCompleteInitialState), action) {

  switch (action.type) {
    case constants.AUTOCOMPLETE_ERROR :
      return state
        .set('loading', false)
        .set('error', action.payload);

    case constants.AUTOCOMPLETE_SUCCESS :
      let predictions = [];

      if (action.payload.json.status == 'OK'){
        predictions = action.payload.json.predictions;
      }
      return state
        .set('predictions', predictions);

  }

  return state;
}
export default autoCompleteReducer;
