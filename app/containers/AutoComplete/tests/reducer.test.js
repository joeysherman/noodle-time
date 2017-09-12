import expect from 'expect';
import autoCompleteReducer from '../reducer';
import { fromJS } from 'immutable';

describe('autoCompleteReducer', () => {
  it('returns the initial state', () => {
    expect(autoCompleteReducer(undefined, {})).toEqual(fromJS({}));
  });
});
