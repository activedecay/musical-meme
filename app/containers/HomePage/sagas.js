import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_REPOS, LOAD_DB } from 'containers/App/constants';
import { reposLoaded, repoLoadingError, dbLoaded } from 'containers/App/actions';

import request from 'utils/request';
import { selectUsername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(selectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Watches for LOAD_REPOS actions and calls getRepos when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
export function* getReposWatcher() {
  yield fork(takeLatest, LOAD_REPOS, getRepos);
}

export function* hitDb() {
  const results = yield call(request, 'api/spoon', {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify({ query: { _id: '5869b62a7733c47a1e44cbac' }, update: { ass: 69 } }),
  });
  yield put(dbLoaded(results));
}

export function* getDb() {
  yield fork(takeLatest, LOAD_DB, hitDb);
}

/**
 * Root saga manages lifecycles
 */
export function* githubData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getReposWatcher);
  const task = yield fork(getDb);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  yield cancel(task);
}

// Bootstrap sagas
export default [
  githubData,
];
