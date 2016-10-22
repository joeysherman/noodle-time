/**
 * Created by Joey on 10/22/2016.
 */

import { createSelector } from 'reselect';

const selectMapDomain = (state) => state.get('map');

const selectMapLoaded = createSelector(
  selectMapDomain,
  (state) => state.get('loaded')
);

export {
  selectMapLoaded,
  selectMapDomain,

};