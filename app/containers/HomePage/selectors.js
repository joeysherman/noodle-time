/**
 * Created by Joey on 9/22/2016.
 */

import { createSelector } from 'reselect';

const selectHomeDomain = (state) => state.get('home');
const selectUserSlice = (state) => state.getIn(['home', 'user']);
const selectAutocompleteSlice = (state) => state.getIn(['home', 'autocomplete']);

const selectUserLocation = createSelector(
  selectUserSlice,
  (home) => {
    return home.get('userLocation').toJS();
  },
);

const selectAutoCompleteData = createSelector(
  selectAutocompleteSlice,
  (slice) => slice.toJS(),
);

const selectStatusMessage = createSelector(
  selectUserSlice,
  (home) => home.get('statusMessage'),
);

const selectHasGeo = createSelector(
  selectUserSlice,
  (slice) => slice.get('hasGeo'),
);

const selectNoodleTime = createSelector(
  selectUserSlice,
  (slice) => slice.get('noodleTime'),
);

export {
  selectHomeDomain,
  selectNoodleTime,
  selectUserLocation,
  selectHasGeo,
  selectAutoCompleteData,
  selectStatusMessage,
};

