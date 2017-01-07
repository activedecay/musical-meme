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

// Individual exports for testing
export function* defaultSaga() {
  yield takeEvery(c.SIGNUP, signup);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* root() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(defaultSaga);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  root
];
