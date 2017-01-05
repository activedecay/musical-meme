import { createSelector } from 'reselect';

/**
 * Direct selector to the signup state domain
 */
const selectSignupDomain = () => (state) => state.get('signup');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Signup
 */

const selectSignup = () => createSelector(
  selectSignupDomain(),
  (substate) => substate.toJS()
);

export default selectSignup;
export {
  selectSignupDomain,
};
