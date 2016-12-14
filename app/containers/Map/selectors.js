import { createSelector } from 'reselect';

/**
 * Direct selector to the map state domain
 */
const selectMapDomain = () => (state) => state.get('map');

/**
 * Other specific selectors
 */

const selectMapsLoaded = () => createSelector(
  selectMapDomain(),
  (map) => map.get('loaded'),
);

/**
 * Default selector used by Map
 */

const selectMap = () => createSelector(
  selectMapDomain(),
  (substate) => substate.toJS()
);

export default selectMap;
export {
  selectMapDomain,
  selectMapsLoaded,
};
