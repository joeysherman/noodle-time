import expect from 'expect';
import footerReducer from '../reducer';
import { fromJS } from 'immutable';

describe('footerReducer', () => {
  it('returns the initial state', () => {
    expect(footerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
