/*
 *
 * PlacesPage reducer
 *
 */

import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  places: null,
});

function placesPageReducer(state = initialState, action) {
  switch (action.type) {

    case constants.PLACES_SUCCESS :
      return state
        .withMutations((map) => {
          map
            .set('loading', false)
            .set('error', false)
            .set('places', fromJS(action.payload));
        });

    case constants.PLACES_ERROR :
      return state
        .withMutations((map) => {
          map
            .set('loading', false)
            .set('places', null)
            .set('error', action.payload);

        });
    default:
      return state;
  }
}

export default placesPageReducer;
