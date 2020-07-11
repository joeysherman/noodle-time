import { createSelector } from 'reselect';

/**
 * Direct selector to the placesPage state domain
 */
const selectPlacesPageDomain = (state, props) => state.places;

const selectQueryString = (state, qs) => qs;

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
  [selectPlacesPageDomain, selectQueryString],
  (placesSubState, qs) => {
    let { detail } = qs;

  return placesSubState.detail[detail];
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
