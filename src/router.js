/* eslint-disable */
import * as Router from 'vue-router';
import { watch } from 'vue';
import { glueConfig as GLUE_CONFIG } from '../config/user-config';
import {
  Auth,
  DatasetDetailsCategories,
  DatasetDetailsQuality,
  DatasetDetailsSimilarDatasets,
  DatasetDetailsDataset,
  DatasetDetails,
  MapBasic,
  MapBoundsReceiver,
  Datasets,
  Catalogues,
  NotFound,
  Imprint,
  PrivacyPolicy,
  SparqlSearch,
  DataProviderInterface,
  DataFetchingComponent,
  OverviewPage,
  InputPage,
  DraftsPage,
  LinkedDataViewer,
  UserProfilePage,
  UserCataloguesPage,
  decode,
} from "@piveau/piveau-hub-ui-modules";

const title = GLUE_CONFIG.metadata.title;

const router = Router.createRouter({
  history: Router.createWebHistory(GLUE_CONFIG.routing.routerOptions.base),
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (to.matched.some(route => route.meta.scrollTop)) return { left: 0, top: 0 };
    else if (savedPosition) return savedPosition;
    else return { left: 0, top: 0 };
  },
  routes: [
    {
      path: '/',
      redirect: { name: 'Datasets' },
    },
    {
      path: '/datasets',
      name: 'Datasets',
      component: Datasets,
    },
    {
      path: '/datasets/:ds_id',
      component: DatasetDetails,
      children: [
        {
          path: '',
          name: 'DatasetDetailsDataset',
          components: {
            datasetDetailsSubpages: DatasetDetailsDataset,
          },
        },
        {
          path: 'categories',
          name: 'DatasetDetailsCategories',
          components: {
            datasetDetailsSubpages: DatasetDetailsCategories,
          },
        },
        {
          path: 'similarDatasets',
          name: 'DatasetDetailsSimilarDatasets',
          components: {
            datasetDetailsSubpages: DatasetDetailsSimilarDatasets,
          },
        },
        {
          path: 'quality',
          name: 'DatasetDetailsQuality',
          components: {
            datasetDetailsSubpages: DatasetDetailsQuality,
          },
        },
      ],
    },
    {
      path: '/catalogues',
      name: 'Catalogues',
      component: Catalogues,
    },
    {
      path: '/catalogues/:ctlg_id',
      name: 'CatalogueDetails',
      component: Datasets,
    },
    {
      path: '/imprint',
      name: 'Imprint',
      component: Imprint,
      title,
    },
    {
      path: '/privacypolicy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy,
    },
    {
      path: '/maps',
      name: 'MapBasic',
      component: MapBasic,
    },
    {
      path: '/mapsBoundsReceiver',
      name: 'MapBoundsReceiver',
      component: MapBoundsReceiver,
    },
    {
      path: '/login',
      name: 'Login',
      component: Auth,
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Auth,
    },
    {
      path: '/404',
      alias: '/(.)*',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: '/sparql',
      name: 'SparqlSearch',
      component: SparqlSearch,
    },
  ]
});

if (GLUE_CONFIG.content.dataProviderInterface.useService) {
  router.addRoute({
    path: '/dpi/draft',
    name: 'DataProviderInterface-Draft',
    component: DraftsPage,
    meta: {
      requiresAuth: true,
    }
  }),
  router.addRoute({
    path: '/dpi/draft/:name.:format',
    name: 'DataProviderInterface-LinkedData',
    component: LinkedDataViewer,
    props: true,
    meta: {
      requiresAuth: true,
    }
  }),
  router.addRoute({
    path: '/dpi/user/',
    name: 'DataProviderInterface-UserProfile',
    component: UserProfilePage,
    meta: {
      requiresAuth: true,
    }
  }),
  router.addRoute({
    path: '/dpi/user-catalogues',
    name: 'DataProviderInterface-UserCatalogues',
    component: UserCataloguesPage,
    meta: {
      requiresAuth: true,
    }
  }),
  router.addRoute({
    path: '/dpi/edit/:catalog/:property/:id',
    name: "DataProviderInterface-Edit",
    component: DataFetchingComponent,
    props: true
  }),
  router.addRoute({
    path: "/dpi",
    name: "DataProviderInterface",
    component: DataProviderInterface,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: ":property",
        name: "DataProviderInterface-Input",
        component: InputPage,
        props: true
      },
      // {
      //   path: ":property/overview",
      //   name: "DataProviderInterface-Overview",
      //   component: OverviewPage,
      //   props: true
      // },
      // {
      //   path: ":property/:page",
      //   name: "DataProviderInterface-Input",
      //   component: InputPage,
      //   props: true,
      //   children: [
      //     {
      //       path: ":id",
      //       name: "DataProviderInterface-ID",
      //       component: InputPage,
      //       props: true,
      //     },
      //   ],
      // },
    ]
  });
}

router.beforeEach((to, from, next) => {
  // if (to?.redirectedFrom?.substring(0, 3) === '/#/') {
  //   let path = to.redirectedFrom.substring(2);
  //   const base = `${GLUE_CONFIG.routing.routerOptions.base}/`;
  //   if (path.startsWith(base)) {
  //     // Restore standard Vue behavior when navigated to '/#/base'
  //     // so you are redirected to '/base' instead of '/base/base'
  //     path = '/';
  //   }
  //   next({ path, replace: true });
  //   return;
  // }

  let isLinkedDataRequest = false;

  // RDF|N3|JSON-LD|TTL|NT redirects
  if (/^\/(data\/)?datasets\/[a-z0-9-_]+(\.rdf|\.n3|\.jsonld|\.ttl|\.nt)/.test(to.path)) {    
    let locale = to.query.locale ? `&locale=${to.query.locale}` : '';

    isLinkedDataRequest = true;
    window.location = `${GLUE_CONFIG.api.hubUrl}${to.path}?useNormalizedId=true${locale}`;
  }

  if (/^\/(data\/)?api\/datasets\/[a-z0-9-_]+(\.rdf|\.n3|\.jsonld|\.ttl|\.nt)/.test(to.path)) {   
    let locale = to.query.locale ? `?locale=${to.query.locale}` : '';
    let returnPath = to.path.replace('/api', '')
      .replace(/(\.rdf|\.n3|\.jsonld|\.ttl|\.nt)/, '')
      .replace('?useNormalizedId=true', '');

    isLinkedDataRequest = true;
    window.location = `${window.location.protocol}//${window.location.host}${GLUE_CONFIG.routing.routerOptions.base}${returnPath}${locale}`;
  }

  if (isLinkedDataRequest) {
    // Redirect to the same page but without linked data file ending suffix
    // to prevent the 404 redirection due to app trying to fetch the wrong dataset id
    const datasetIdWithoutSuffix = to.params?.ds_id.replace(/(\.rdf|\.n3|\.jsonld|\.ttl|\.nt)/, '');
    const newRoute = { ...to, params: { ...to.params, ds_id: datasetIdWithoutSuffix } };

    next(newRoute);
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('i must check');

    const keycloak = router.app.config.globalProperties.$keycloak;
    if (!keycloak.ready) {
      // Keycloak not initialized yet, setup watcher
      const unwatch = watch(
        () => keycloak.ready,
        (isReady) => {
          if (isReady) {
            unwatch(); // Stop watching after first check
            const authenticated = keycloak.authenticated;
            handleAuthentication(authenticated, to, next);
          }
        },
        { immediate: true }
      );
    } else {
      // Keycloak already initialized, proceed with check
      handleAuthentication(keycloak.authenticated, to, next);
    }
  }
  // TODO: This causes the following error message and needs to be fixed:
  // [Vue Router warn]: Detected a possibly infinite redirection in a navigation guard ...
  //
  // else if (!to.query.locale && from.query.locale) {
  //   const pathWithCurrentLocale = `${to.path}?locale=${from.query.locale}`; // TODO: Other queries may get lost here?
  //   next({ path: pathWithCurrentLocale });
  // } 
  else {
    document.title = title;
    next();
  }
});

function handleAuthentication(authenticated, to, next) {
  if (!authenticated) {
    // TODO: Show unauthorized page here or redirect to login
  } else {
    router.app.config.globalProperties.$keycloak.getRtpToken().then((rtpToken) => {
      const decodedAccessToken = decode(rtpToken);
      let isAuthenticated = false;

      decodedAccessToken.authorization.permissions.forEach((permission) => {
        if (permission.scopes.find(scope => scope === 'dataset:create')) isAuthenticated = true;
      });

      if (!isAuthenticated) next({ name: 'Datasets' });
      else next();
    });
  }
}

export default router;
