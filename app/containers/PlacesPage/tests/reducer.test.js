import expect from 'expect';
import placesPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('placesPageReducer', () => {
  it('returns the initial state', () => {
    expect(placesPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
