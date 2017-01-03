// code splitting biz!
import { getAsyncInjectors } from './utils/asyncInjectors';
import _ from 'lodash';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      /* https://github.com/ReactTraining/react-router/blob/master/docs/Glossary.md#routerstate
       type RouterState = {
       location: Location;
       routes: Array<Route>;
       params: Params;
       components: Array<Component>;
       };
       */
      onEnter: ({ params, routes, location }, replace) => {
        if (_.isEmpty(store.getState().getIn(['home', 'username']))) replace('/signup');
      },
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/HomePage/reducer'),
          System.import('containers/HomePage/sagas'),
          System.import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/features',
      name: 'features',
      getComponent(nextState, cb) {
        System.import('containers/FeaturePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/d3',
      name: 'd3',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/D3/reducer'),
          System.import('containers/D3'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('d3', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/signup',
      name: 'signup',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Signup/reducer'),
          System.import('containers/Signup/sagas'),
          System.import('containers/Signup'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('signup', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
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
