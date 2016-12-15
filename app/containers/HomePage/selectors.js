/**
 * Created by Joey on 9/22/2016.
 */

import { createSelector } from 'reselect';

const selectHomeDomain = () => (state) => state.get('home');
const selectHomeSlice = () => (state) => state.getIn(['home', 'home']);
const selectAutocompleteSlice = () => (state) => state.getIn(['home', 'autocomplete']);

const selectAutoCompleteData = () => createSelector(
  selectAutocompleteSlice(),
  (slice) => slice.get('predictions'),
);

const selectStatusMessage = () => createSelector(
  selectHomeSlice(),
  (home) => home.get('statusMessage'),
);

const selectNoodleTime = () => createSelector(
  selectHomeSlice(),
  (slice) => slice.get('noodleTime'),
);

export {
  selectHomeDomain,
  selectNoodleTime,
  selectAutoCompleteData,
  selectStatusMessage,
};

