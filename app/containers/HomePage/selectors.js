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
    if (home && home.has('userLocation')) {
      return home.get('userLocation').toJS();
    }
    return undefined;
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

const selectDistances = createSelector(
  selectHomeDomain,
  (home) => {
    if (home) {
      return home.get('distances');
    }
    return undefined;
  }
);

const selectStatusMessage = createSelector(
  selectHomeDomain,
  (home) => home.get('statusMessage'),
);

const selectDisplayMode = createSelector(
  selectHomeDomain,
  (home) => home.get('displayMode'),
)

export {
  selectHomeDomain,
  selectError,
  selectLoading,
  selectUserLocation,
  selectAutoCompleteData,
  selectDistances,
  selectStatusMessage,
  selectPlaces,
  selectDisplayMode,
};

