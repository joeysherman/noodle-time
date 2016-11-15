import expect from 'expect';
import mapReducer from '../reducer';
import { fromJS } from 'immutable';

describe('mapReducer', () => {
  it('returns the initial state', () => {
    expect(mapReducer(undefined, {})).toEqual(fromJS({}));
  });
});
