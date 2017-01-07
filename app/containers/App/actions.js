/*
 * App Actions
 */

import {
  LOAD_DB,
  LOAD_DB_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  USER_SIGNED_IN,
  USER_SIGNED_OUT,
} from './constants';

export const dbLoaded = (results) => ({ type: LOAD_DB_SUCCESS, results });
export const loadDb = () => ({ type: LOAD_DB });
export const userSignedIn = (username) => ({ type: USER_SIGNED_IN, username });
export const userSignedOut = () => ({ type: USER_SIGNED_OUT});



/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}
