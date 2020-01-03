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

const selectIndex = createSelector(
  selectPlacesPageDomain,
  (substate) => substate.index,
)

const selectDetailById = createSelector(
  (substate, props) => {
    console.log(JSON.stringify(props));
    console.log(JSON.stringify(subState));
    //substate.detail[substate.places[substate.index]],
    return false;
  }
)


export {
  selectIndex,
  selectPlacesPageDomain,
  selectPlaces,
  selectPlaceByIndex,
  selectDetailById,
};
