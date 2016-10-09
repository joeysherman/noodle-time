/**
 * Created by Joey on 9/22/2016.
 */

import { createSelector } from 'reselect';

const selectHomeDomain = (state) => state.get('home');

const selectError = createSelector(
  selectHomeDomain,
  (home) => home.get('error'),
);

const selectLoading = createSelector(
  selectHomeDomain,
  (home) => home.get('loading'),
);

const selectUserLocation = createSelector(
  selectHomeDomain,
  (home) => home.get('userLocation'),
);

const selectAutoCompleteData = createSelector(
  selectHomeDomain,
  (home) => home.get('autoComplete'),
);



export {
  selectHomeDomain,
  selectError,
  selectLoading,
  selectUserLocation,
  selectAutoCompleteData,
};

