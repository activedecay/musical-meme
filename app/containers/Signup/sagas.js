import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as c from './constants';
import * as actions from './actions';

import request from 'utils/request';

function* signup({ username, password }) {
  try {
    const result = yield call(request, 'api/user', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ create: { username, password } }),
    });
    yield put(actions.signupComplete(result));
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
