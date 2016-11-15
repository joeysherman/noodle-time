/**
 * Created by Joey on 11/15/2016.
 */

import { getAsyncInjectors } from 'utils/asyncInjectors';



const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createChildRoutes(store) {

  const { injectReducer } = getAsyncInjectors(store);

  return [{
    path: 'map',
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        System.import('../Map'),
        System.import('../Map/reducer'),
      ]);

      const renderRoute = loadModule(cb);

      importModules.then(([component, reducer]) => {
        injectReducer('map', reducer.default);
        renderRoute(component);
      }).catch(errorLoading);

    }
  }]
}