import expect from 'expect';
import detailReducer from '../reducer';
import { fromJS } from 'immutable';

describe('detailReducer', () => {
  it('returns the initial state', () => {
    expect(detailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
