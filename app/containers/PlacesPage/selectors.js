import { createSelector } from 'reselect';

/**
 * Direct selector to the placesPage state domain
 */
const selectPlacesPageDomain = (state) => state.places;

/**
 * Other specific selectors
 */


/**
 * Default selector used by PlacesPage
 */

const selectPlaces = () => createSelector(
  selectPlacesPageDomain,
  (substate) => substate.places,
);

const selectPlaceByIndex = (index) => createSelector(
  selectPlacesPageDomain,
  (substate) => substate.places,
);

const selectIndex = () => createSelector(
  selectPlacesPageDomain,
  (substate) => substate.index,
)


export {
  selectIndex,
  selectPlacesPageDomain,
  selectPlaces,
  selectPlaceByIndex,
};
