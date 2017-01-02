import { createSelector } from 'reselect';

/**
 * Direct selector to the d3 state domain
 */
const selectD3Domain = () => (state) => state.get('d3');

/**
 * Other specific selectors
 */


/**
 * Default selector used by D3
 */

const selectD3 = () => createSelector(
  selectD3Domain(),
  (substate) => substate.toJS()
);

export default selectD3;
export {
  selectD3Domain,
};
