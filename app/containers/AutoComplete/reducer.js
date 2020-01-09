/*
 *
 * AutoComplete reducer
 *
 */

import produce from 'immer';
import * as constants from './constants';

export const autoCompleteInitialState = {
  loading: false,
  error: false,
  suggestions: false,
};

const autoCompleteReducer = (state = autoCompleteInitialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.AUTOCOMPLETE_REQUEST:
        draft.loading = true;
        break;
      case constants.AUTOCOMPLETE_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.suggestions = action.payload.json.predictions;
        break;
      case constants.AUTOCOMPLETE_ERROR:
        break;
      case constants.AUTOCOMPLETE_ITEM_SELECTED:
        break;
    }
  });
  
export default autoCompleteReducer;
