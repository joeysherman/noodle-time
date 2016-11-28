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
  (home) => {
    return home.get('userLocation').toJS();
  },
);

const selectAutoCompleteData = createSelector(
  selectHomeDomain,
  (home) => home.get('autoComplete'),
);

const selectPlaces = createSelector(
  selectHomeDomain,
  (home) => home.get('places'),
);


const selectStatusMessage = createSelector(
  selectHomeDomain,
  (home) => home.get('statusMessage'),
);

export {
  selectHomeDomain,
  selectError,
  selectLoading,
  selectUserLocation,
  selectAutoCompleteData,
  selectStatusMessage,
  selectPlaces,
};

