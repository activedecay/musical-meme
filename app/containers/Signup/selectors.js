import { createSelector } from 'reselect';

const selectSignupDomain = () => (state) => state.get('signup');

const selectSignup = () => createSelector(
  selectSignupDomain(),
  (substate) => substate.toJS()
);

export default selectSignup;
export {
  selectSignupDomain,
};
