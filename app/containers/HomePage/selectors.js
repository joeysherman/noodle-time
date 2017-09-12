/**
 * Created by Joey on 9/22/2016.
 */

import { createSelector } from 'reselect';

const selectHomeDomain = () => (state) => state.get('home');

const selectStatusMessage = () => createSelector(
  selectHomeDomain(),
  (home) => home.get('statusMessage'),
);

const selectNoodleTime = () => createSelector(
  selectHomeDomain(),
  (home) => home.get('noodleTime'),
);

export {
  selectHomeDomain,
  selectNoodleTime,
  selectStatusMessage,
};

