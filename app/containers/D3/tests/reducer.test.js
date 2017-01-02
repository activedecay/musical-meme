import expect from 'expect';
import d3Reducer from '../reducer';
import { fromJS } from 'immutable';

describe('d3Reducer', () => {
  it('returns the initial state', () => {
    expect(d3Reducer(undefined, {})).toEqual(fromJS({}));
  });
});
