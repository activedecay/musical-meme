/*
 *
 * Signup actions
 *
 */

import * as c from './constants';

export const signup = (username, password) => ({ type: c.SIGNUP, username, password });
export const signupError = (error) => ({ type: c.SIGNUP_ERROR, error });
export const signupComplete = (result) => ({ type: c.SIGNUP_COMPLETE, result });
export const changeUsername = (username) => ({ type: c.CHANGE_USERNAME, username });
export const changePassword = (password) => ({ type: c.CHANGE_PASSWORD, password });
