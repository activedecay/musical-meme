/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');
const selectUser = () => (state) => selectGlobal()(state).get('user');
const selectRepositories = () => (state) => selectGlobal()(state).get('repo');

const selectUsername = () => createSelector(
  selectUser(),
  (user) => user.get('username')
);

const selectLoading = () => createSelector(
  selectRepositories(),
  (globalState) => globalState.get('loading')
);

const selectError = () => createSelector(
  selectRepositories(),
  (globalState) => globalState.get('error')
);

const selectDb = () => createSelector(
  selectRepositories(),
  (globalState) => globalState.get('db')
);

const selectRepos = () => createSelector(
  selectRepositories(),
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const createRouteState = () => createSelector(
  selectLocationState(),
  (state) => state.locationBeforeTransitions || {}
);

export {
  selectGlobal,
  selectDb,
  selectUsername,
  selectLoading,
  selectError,
  selectRepos,
  selectLocationState,
  createRouteState,
};
