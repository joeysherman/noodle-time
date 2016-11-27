import { createSelector } from 'reselect';

/**
 * Direct selector to the placesPage state domain
 */
const selectPlacesPageDomain = (state) => state.get('places');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PlacesPage
 */

const selectPlacesPage = createSelector(
  selectPlacesPageDomain,
  (substate) => substate.toJS()
);

const selectPlaces = createSelector(
  selectPlacesPageDomain,
  (substate) => substate.get('places'),
);

const selectPlaceByIndex = (index) => createSelector(
  selectPlacesPageDomain,
  (substate) => {
    let places = substate.get('places');

    if (places) return places.get(index).toJS();
  }
);


export default selectPlacesPage;
export {
  selectPlacesPageDomain,
  selectPlaces,
  selectPlaceByIndex,
};
