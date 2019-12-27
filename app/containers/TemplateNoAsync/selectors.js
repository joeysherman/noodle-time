import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the templateNoAsync state domain
 */

const selectTemplateNoAsyncDomain = state =>
  state.templateNoAsync || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TemplateNoAsync
 */

const makeSelectTemplateNoAsync = () =>
  createSelector(
    selectTemplateNoAsyncDomain,
    substate => substate,
  );

export default makeSelectTemplateNoAsync;
export { selectTemplateNoAsyncDomain };
