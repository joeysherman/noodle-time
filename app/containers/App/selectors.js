// selectLocationState expects a plain JS object for the routing state

import { createSelector } from 'reselect';

/**
 * Direct selector to the App state domain
 */
const selectApp = () => (state) => state.get('app');

/**
 * Other specific selectors
 */


/**
 * Default selector used by App
 */

export const selectAppState = () => createSelector(
  selectApp(),
  (substate) => substate.toJS()
);

export const selectHasGeo = () => createSelector(
  selectApp(),
  (substate) => substate.get('hasGeo'),
);

export const selectLocation = () => createSelector(
  selectApp(),
  (substate) => {
    return substate.get('location').toJS();
  },
);


export const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export default selectApp;
