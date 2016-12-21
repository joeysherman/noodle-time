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


const selectViewIndex = () => createSelector(
  selectMapDomain(),
  (map) => map.get('viewIndex'),
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
  selectViewIndex,
  selectMapDomain,
  selectMapsLoaded,
};
