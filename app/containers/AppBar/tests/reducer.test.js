import expect from 'expect';
import appBarReducer from '../reducer';
import { fromJS } from 'immutable';

describe('appBarReducer', () => {
  it('returns the initial state', () => {
    expect(appBarReducer(undefined, {})).toEqual(fromJS({}));
  });
});
