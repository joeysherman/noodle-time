/*
 *
 * PlacesPage reducer
 *
 */

import produce from 'immer';
import * as constants from './constants';

const initialState = {
  index: false,
  places: [],
  loading: false,
  error: false,
};

const placesPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
    case constants.PLACES_SUCCESS:
      draft.loading = false;
      draft.error = false;
      draft.places = action.payload;
      break;
    case constants.PLACES_ERROR:
      draft.loading = false;
      draft.places = [];
      draft.error = action.payload;
      break;
    case constants.PLACES_REQUEST:
      draft.loading = true;
      draft.places = [];
      draft.error = false;
      break;
    case constants.DETAIL_SUCCESS:
      draft.loading = false;
      draft.error = false;
      draft.detail[action.payload.id] = action.payload.data.jsonBody;
      break;
    case constants.DETAIL_ERROR:
      draft.loading = false;
      draft.error = action.payload;
      break;
    case constants.DETAIL_REQUEST:
      draft.loading = true;
      draft.error = false;
      break;
    case constants.INC_SELECTED_INDEX:
      draft.index = draft.index + 1;
      break;
    case constants.DEC_SELECTED_INDEX:
      draft.index = draft.index - 1;
      break;
    case constants.SET_SELECTED_INDEX:
      return state.index = action.payload;
    default:
      return state;
    }
  });

export default placesPageReducer;
