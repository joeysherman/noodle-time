import { createSelector } from 'reselect';

/**
 * Direct selector to the appBar state domain
 */
const selectAppBarDomain = (state) => state.get('appBar');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AppBar
 */

const selectAppBar = createSelector(
  selectAppBarDomain,
  (substate) => substate.toJS()
);

export default selectAppBar;
export {
  selectAppBarDomain,
};
