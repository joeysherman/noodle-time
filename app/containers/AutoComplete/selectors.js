import { createSelector } from 'reselect';

/**
 * Direct selector to the autoComplete state domain
 */
const selectAutoCompleteDomain = () => (state) => state.get('autoComplete');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AutoComplete
 */

const selectAutoComplete = () => createSelector(
  selectAutoCompleteDomain(),
  (substate) => substate.toJS()
);

export default selectAutoComplete;
export {
  selectAutoCompleteDomain,
};
