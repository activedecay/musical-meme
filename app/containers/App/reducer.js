import { combineReducers } from 'redux-immutable';
import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOAD_DB_SUCCESS,
  USER_SIGNED_IN,
  USER_SIGNED_OUT,
} from './constants';
import { fromJS } from 'immutable';


function githubReducer(state = fromJS({
  db: false,
  loading: false,
  error: false,
  userData: {
    repositories: false,
  },

}), action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_DB_SUCCESS:
      return state
        .set('db', action.results);
    default:
      return state;
  }
}

const userReducer = (state = fromJS({
  username: false,
}), action) => {
  switch (action.type) {
    case USER_SIGNED_IN:
      return state
        .set('username', action.username);
    case USER_SIGNED_OUT:
      return state
        .set('username', false);
    default:
      return state;
  }
}

const appReducer = combineReducers({
  user: userReducer,
  repo: githubReducer,
})

export default appReducer;
