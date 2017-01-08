/*
 *
 * Signup reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

const initialState = fromJS({
  login: false,
  loading: false,
  error: false,
  welcome: false,
  username: false,
  password: false,
});

function signupReducer(state = initialState, action) {
  switch (action.type) {
    case c.SIGNUP:
    case c.LOGIN:
      return state
        .set('error', false)
        .set('loading', true);
    case c.SIGNUP_COMPLETE:
    case c.LOGIN_COMPLETE:
      return state
        .set('welcome', true)
        .set('loading', false);
    case c.SIGNUP_ERROR:
    case c.LOGIN_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case c.CHANGE_USERNAME:
      return state
        .set('error', false)
        .set('username', action.username);
    case c.CHANGE_PASSWORD:
      return state
        .set('error', false)
        .set('password', action.password);
    case c.WANTS_LOGIN:
      return state
        .set('error', false)
        .set('login', action.login);
    default:
      return state;
  }
}

export default signupReducer;
