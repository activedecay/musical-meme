/*
 *
 * Signup reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  username: false,
  password: false,
});

function signupReducer(state = initialState, action) {
  switch (action.type) {
    case c.SIGNUP:
      return state
        .set('error', false)
        .set('loading', true);
    case c.SIGNUP_COMPLETE:
      return state
        .set('loading', false);
    case c.SIGNUP_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case c.CHANGE_USERNAME:
      return state.set('username', action.username);
    case c.CHANGE_PASSWORD:
      return state.set('password', action.password);
    default:
      return state;
  }
}

export default signupReducer;
