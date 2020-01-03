import { createSelector } from 'reselect';

/**
 * Direct selector to the map state domain
 */
const selectMapDomain = () => (state) => state.map;

/**
 * Other specific selectors
 */

const selectMapsLoaded = () => createSelector(
  selectMapDomain(),
  (map) => map.loaded,
);


const selectViewIndex = () => createSelector(
  selectMapDomain(),
  (map) => map.viewIndex,
);


/**
 * Default selector used by Map
 */

const selectMap = () => createSelector(
  selectMapDomain(),
  (substate) => substate
);

export default selectMap;
export {
  selectViewIndex,
  selectMapDomain,
  selectMapsLoaded,
};
