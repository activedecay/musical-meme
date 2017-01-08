import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'react-router-redux'
import * as c from './constants';
import * as actions from './actions';
import { userSignedIn } from 'containers/App/actions';

import request from 'utils/request';

function* signup({ username, password }) {
  try {
    const result = yield call(request, 'api/user', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST', // creates a new user, or fails if exists.
      body: JSON.stringify({ create: { username } }),
    });
    yield call(request, 'api/user', {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT', // updates the user's password
      body: JSON.stringify({ query: { username }, update: { password } }),
    });
    yield put(actions.signupComplete(result));
    yield put(userSignedIn(username));
    yield put(push('/welcome'));
  } catch (e) {
    const js = yield e.response.json();
    yield put(actions.signupError(js.error));
  }
}

function* login({ username, password }) {
  try {
    const result = yield call(request, `api/user/${username}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST', // search for existing user/pass, or fails if not found.
      body: JSON.stringify({ query: { username, password }, update: {} }),
    });
    yield put(actions.loginComplete(result));
    yield put(userSignedIn(username));
    yield put(push('/welcome'));
  } catch (e) {
    const js = yield e.response.json();
    yield put(actions.loginError(js.error));
  }
}

export function* signUpTaker() {
  yield takeEvery(c.SIGNUP, signup);
}

export function* loginTaker() {
  yield takeEvery(c.LOGIN, login);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* root() {
  // Fork watcher so we can continue execution
  const signUp = yield fork(signUpTaker);
  const login = yield fork(loginTaker);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(signUp);
  yield cancel(login);
}

// All sagas to be loaded
export default [
  root
];
