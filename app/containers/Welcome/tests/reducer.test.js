import expect from 'expect';
import welcomeReducer from '../reducer';
import { fromJS } from 'immutable';

describe('welcomeReducer', () => {
  it('returns the initial state', () => {
    expect(welcomeReducer(undefined, {})).toEqual(fromJS({}));
  });
});
