/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';

export const LOAD_DB = 'boilerplate/App/LOAD_DB';
export const LOAD_DB_SUCCESS = 'boilerplate/App/LOAD_DB_SUCCESS';

export const USER_SIGNED_IN = 'boilerplate/App/USER_SIGNED_IN';
export const USER_SIGNED_OUT = 'boilerplate/App/USER_SIGNED_OUT';

export const DEFAULT_LOCALE = 'en';

