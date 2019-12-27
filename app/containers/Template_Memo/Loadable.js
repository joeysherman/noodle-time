/**
 *
 * Asynchronously loads the component for Example
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
