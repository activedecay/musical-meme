import expect from 'expect';
import signupReducer from '../reducer';
import { fromJS } from 'immutable';

describe('signupReducer', () => {
  it('returns the initial state', () => {
    expect(signupReducer(undefined, {})).toEqual(fromJS({}));
  });
});
