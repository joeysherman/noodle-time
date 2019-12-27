import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the example2 state domain
 */

const selectExample2Domain = state => state.example2 || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Example2
 */

const makeSelectExample2 = () =>
  createSelector(
    selectExample2Domain,
    substate => substate,
  );

export default makeSelectExample2;
export { selectExample2Domain };
