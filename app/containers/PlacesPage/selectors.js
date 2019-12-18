import { createSelector } from 'reselect';

/**
 * Direct selector to the placesPage state domain
 */
const selectPlacesPageDomain = () => (state) => state.get('places');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PlacesPage
 */

const selectPlacesPage = () => createSelector(
  selectPlacesPageDomain(),
  (substate) => substate.toJS()
);

const selectPlaces = () => createSelector(
  selectPlacesPageDomain(),
  (substate) => substate.get('places').toJS(),
);

const selectPlaceByIndex = (index) => createSelector(
  selectPlacesPageDomain(),
  (substate) => {
    let places = substate.get('places');

    if (places) return places.getIn([index, 'id']);
  }
);

const selectIndex = () => createSelector(
  selectPlacesPageDomain(),
  (substate) => substate.get('index'),
)


export default selectPlacesPage;
export {
  selectIndex,
  selectPlacesPageDomain,
  selectPlaces,
  selectPlaceByIndex,
};
