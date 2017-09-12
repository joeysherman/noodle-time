// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default)
}

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [{
    path: 'search',
    getComponent(nextState, cb) {
      console.log('getting component router')
      console.log(nextState);
      const importModules = Promise.all([
        System.import('containers/SearchPage'),
        System.import('containers/SearchPage/reducer'),
        System.import('containers/SearchPage/sagas'),
      ]);

      const renderRoute = loadModule(cb);

      importModules.then(([component, reducer, sagas]) => {
        injectReducer('searchPage', reducer.default);
        injectSagas(sagas.default);
        renderRoute(component);
      });

      importModules.catch(errorLoading);
    },
  }];
/*  return [{
    path: 'search',
    getComponent(nextState, cb) {
/!*      console.log('getting component router')
      console.log(nextState);*!/
      const importModules = Promise.all([
        System.import('containers/PlacesPage'),
        System.import('containers/PlacesPage/reducer'),
        System.import('containers/PlacesPage/sagas'),
      ]);

      const renderRoute = loadModule(cb);

      importModules.then(([component, reducer, sagas, mapReducer, mapSagas]) => {
        injectReducer('places', reducer.default);
        injectSagas(sagas.default);

        renderRoute(component);
      });

      importModules.catch(errorLoading);
    },
    onChange: (prevState, nextState, replace, callback) => {
      let { query } = nextState.location;

      if (query && query.mode == 'map') {
        return injectMap(callback);
      }

      callback();

    },
    onEnter: (nextState, replace, callback) => {
      let { query } = nextState.location;

      if (query && query.mode == 'map') {
        return injectMap(callback);
      }

      callback();

     },
  },
  {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];*/
}
