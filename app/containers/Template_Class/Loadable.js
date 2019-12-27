/**
 *
 * Asynchronously loads the component for Example2
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
