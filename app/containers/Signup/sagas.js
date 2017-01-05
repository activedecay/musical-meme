import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux'
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
    yield put(push('/'));
  } catch (e) {
    const js = yield e.response.json();
    yield put(actions.signupError(js.error));
  }
}

// Individual exports for testing
export function* defaultSaga() {
  yield takeEvery(c.SIGNUP, signup);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
