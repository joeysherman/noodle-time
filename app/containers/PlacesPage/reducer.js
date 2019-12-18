/*
 *
 * PlacesPage reducer
 *
 */

import { fromJS } from "immutable";
import * as constants from "./constants";

const initialState = fromJS({
  index: false,
  places: [],
  loading: false,
  error: false
});

function placesPageReducer(state = initialState, action) {
  switch (action.type) {
    case constants.PLACES_SUCCESS:
      return state.withMutations(map => {
        map
          .set("loading", false)
          .set("error", false)
          .set("places", fromJS(action.payload));
      });

    case constants.PLACES_ERROR:
      return state.withMutations(map => {
        map
          .set("loading", false)
          .set("places", fromJS([]))
          .set("error", action.payload);
      });
    case constants.PLACES_REQUEST:
      return state.withMutations(map => {
        map
          .set("loading", true)
          .set("places", fromJS([]))
          .set("error", null);
      });

    case constants.DETAIL_SUCCESS:
      return state.withMutations(map => {
        map
          .set("loading", false)
          .set("error", false)
          .setIn(["detail", action.payload.id], fromJS(action.payload.data.jsonBody));
      });

    case constants.DETAIL_ERROR:
      return state.withMutations(map => {
        map
          .set("loading", false)
          .set("error", action.payload);
      });
    case constants.DETAIL_REQUEST:
      return state.withMutations(map => {
        map
          .set("loading", true)
          .set("error", null);
      });

    case constants.INC_SELECTED_INDEX:
      return state.update("index", i => i + 1);

    case constants.DEC_SELECTED_INDEX:
      return state.update("index", i => i - 1);

    case constants.SET_SELECTED_INDEX:
      return state.set("index", action.payload);

    default:
      return state;
  }
}

export default placesPageReducer;
