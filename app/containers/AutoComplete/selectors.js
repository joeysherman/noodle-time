import { createSelector } from 'reselect';

/**
 * Direct selector to the autoComplete state domain
 */
const selectAutoCompleteDomain = () => (state) => state.get('autoComplete');

/**
 * Other specific selectors
 */

const selectPredictions = () => createSelector(
  selectAutoCompleteDomain(),
  (root) => root.get('predictions'),
);

/**
 * Default selector used by AutoComplete
 */

const selectAutoComplete = () => createSelector(
  selectAutoCompleteDomain(),
  (substate) => substate.get('autoComplete'),
);

export {
  selectAutoCompleteDomain,
  selectPredictions,
  selectAutoComplete,
};
