// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';
import { selectUserLocation } from 'containers/HomePage/selectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [{
    
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        System.import('containers/PlacesPage'),
        System.import('containers/PlacesPage/reducer'),
        System.import('containers/PlacesPage/sagas'),
      ]);

      const renderRoute = loadModule(cb);

      importModules.then(([component, reducer, sagas]) => {
        injectReducer('places', reducer.default);
        injectSagas(sagas.default);
        renderRoute(component);
      });

      importModules.catch(errorLoading);
    },
/*    onEnter: (nextState, replace) => {
      const { latitude, longitude } = selectUserLocation(store.getState());

      if (longitude && latitude) {
        console.log('yes location');
      } else {
        console.log('no location');
        return replace({
          pathname: '/',
          state: 'No location',
        });
      }
    },*/
    childRoutes : [{

      path: 'map',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Map'),
          System.import('containers/Map/reducer'),
          System.import('containers/Map/sagas'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component, reducer, sagas]) => {
          injectReducer('map', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      }
    }, {

      path: 'list',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/List'),
          System.import('containers/List/reducer'),
          System.import('containers/List/sagas'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component, reducer, sagas]) => {
          injectReducer('list', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      }
    }],
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
  ];
}
