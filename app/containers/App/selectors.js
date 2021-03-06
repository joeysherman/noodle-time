// selectLocationState expects a plain JS object for the routing state

import { createSelector } from 'reselect';

/**
 * Direct selector to the App state domain
 */
const selectApp = state => state.app;

/**
 * Other specific selectors
 */

/**
 * Default selector used by App
 */

export const selectAppState = (state) => state.app

export const selectLoadingGeo =
  createSelector(
    selectApp,
    substate => substate.loadingGeo,
  );

export const selectHasGeo =
  createSelector(
    selectApp,
    substate => substate.gethasGeo,
  );

export const selectLocation =
  createSelector(
    selectApp,
    substate => substate.location,
  );

export const selectAddress =
  createSelector(
    selectApp,
    substate => substate.address,
  );
  
  export const selectError =
  createSelector(
    selectApp,
    substate => substate.error,
  );

export default selectApp;
