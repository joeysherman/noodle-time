import { createSelector } from 'reselect';

/**
 * Direct selector to the placesPage state domain
 */
const selectPlacesPageDomain = (state, props) => state.places;
/**
 * Other specific selectors
 */


/**
 * Default selector used by PlacesPage
 */

const selectPlaces = createSelector(
  selectPlacesPageDomain,
  (substate) => substate.places,
);

const selectPlaceByIndex = createSelector(
  selectPlacesPageDomain,
  (substate) => substate.places,
);

const selectPlacesLoading = createSelector(
  selectPlacesPageDomain,
  (substate) => substate.loading,
);

const selectIndex = createSelector(
  selectPlacesPageDomain,
  (substate) => substate.index,
)

const selectDetailById = createSelector(
  selectPlacesPageDomain,
  (substate) => {
    
  return substate.places[substate.index];
  }
)


export {
  selectIndex,
  selectPlacesPageDomain,
  selectPlacesLoading,
  selectPlaces,
  selectPlaceByIndex,
  selectDetailById,
};
