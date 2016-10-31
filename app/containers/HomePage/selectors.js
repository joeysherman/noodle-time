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
  (home) => {
    if (home) {
      return home.get('places')
    }
    return undefined;
  },
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


const selectPlace = (index) => (createSelector(
  selectHomeDomain,
  (home) => home.getIn(['places', index]),
));


export {
  selectHomeDomain,
  selectError,
  selectLoading,
  selectUserLocation,
  selectAutoCompleteData,
  selectDistances,
  selectPlace,
  selectPlaces,
};

