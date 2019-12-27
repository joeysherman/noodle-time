import { createSelector } from 'reselect';

/**
 * Direct selector to the autoComplete state domain
 */
const selectAutoCompleteDomain = () => (state) => state.autoComplete;

/**
 * Other specific selectors
 */

const makeSelectSuggestions = () => createSelector(
  selectAutoCompleteDomain(),
  (root) => root.suggestions,
);

/**
 * Default selector used by AutoComplete
 */

const selectAutoComplete = () => createSelector(
  selectAutoCompleteDomain(),
  (substate) => substate.autoComplete,
);

export {
  selectAutoCompleteDomain,
  selectSuggestions,
  selectAutoComplete,
};
