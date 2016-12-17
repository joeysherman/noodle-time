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
  (substate) => substate.get('places'),
);

const selectPlaceByIndex = (index) => createSelector(
  selectPlacesPageDomain(),
  (substate) => {
    let places = substate.get('places');

    if (places) return places.get(index).toJS();
  }
);

const selectIndex = () => (state, props) => {
    if (props && props.location.query && props.location.query.i) {
      return props.location.query.i;
    }
    return 0;
  };


export default selectPlacesPage;
export {
  selectIndex,
  selectPlacesPageDomain,
  selectPlaces,
  selectPlaceByIndex,
};
