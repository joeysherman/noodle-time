import { createSelector } from 'reselect';

/**
 * Direct selector to the detail state domain
 */
const selectDetailDomain = (state) => state.get('detail');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Detail
 */

const selectDetail = createSelector(
  selectDetailDomain,
  (substate) => substate.toJS()
);

const selectIndex = createSelector(
  selectDetailDomain,
  (substate) => substate.get('index')
);


export default selectDetail;
export {
  selectDetailDomain,
  selectIndex,
};
