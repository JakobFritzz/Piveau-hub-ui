# Migration Guide (v4)

This Migration Guide explains how to use Vue 3 together with Vite in your `piveau-hub-ui`. 

It does not contain all breaking changes of Vue 3, but only the ones which are necessary for `piveau-hub-ui`, i.e. all developers are asked to read about Vue 3 themselves.

Please follow this guide strictly and apply the following changes:

## 1. Update `package.json`

<details><summary>Open</summary>
<br>

> _Note: Use the "@vue/compat" package for testing. There may be more dependencies to add / upgrade in your project!_

#### 1.1 Replace vue-cli commands in `package.json` and use Vite:

```js
  "scripts": {
    "dev": "npm run serve",
    "serve": "vite --host",
    "build": "vite build",
  },
```

#### 1.2 Upgrade piveau packages to Vue 3 compatible versions in `package.json`:

```js
"@piveau/piveau-hub-ui-modules": "4.x.x",
"@piveau/piveau-universal-piwik": "3.x.x",
```

#### 1.3 Upgrade Vue in `package.json`:

```js
"vue": "^3.3.8",
"@vue/compat": "^3.1.0",
```

#### 1.4 Upgrade other packages to Vue 3 compatible versions in `package.json`:

```js
"@fortawesome/vue-fontawesome": "^3.0.3",
"@vue/test-utils": "^2.3.0",
"jest": "^29.4.3",
"ts-jest": "^29.0.5",
"vite": "^4.0.3",
"vue-router": "^4.1.6",
"vue-i18n": "^9.4.0",
"vuex": "^4.0.2",
"webpack-merge": "^5.9.0"
```


#### 1.5 Add new Vue 3 compatible packages to `package.json`:

```js
"@aacassandra/vue3-progressbar": "^1.0.3",
"@unhead/vue": "^1.8.8",
"@vitejs/plugin-vue": "^4.0.0",
"@vitejs/plugin-vue-jsx": "^3.0.2",
"@vue/vue3-jest": "^29.2.2",
"vue3-cookies": "^1.0.6",
"vue-select-3": "^1.0.1",
"vue-skeletor": "^1.0.6",
"vue3-click-away": "^1.2.4",
"vue3-datepicker": "^0.3.4",
```

#### 1.6 Remove incompatible packages from `package.json`:

```js
"@piveau/dcatap-frontend": "x.x.x",
"@babel/core": "x.x.x",
"@babel/eslint-parser": "x.x.x",
"@babel/plugin-proposal-export-default-from": "x.x.x",
"@babel/plugin-proposal-function-sent": "x.x.x",
"@babel/plugin-proposal-throw-expressions": "x.x.x",
"@babel/plugin-syntax-import-meta": "x.x.x",
"@babel/polyfill": "x.x.x",
"@cypress/vue": "x.x.x",
"@cypress/webpack-dev-server": "x.x.x",
"@cypress/webpack-preprocessor": "x.x.x",
"@vitejs/plugin-vue2": "x.x.x",
"@vue/cli-plugin-e2e-cypress": "x.x.x",
"@vue/vue2-jest": "x.x.x",
"@vue/cli-plugin-babel": "x.x.x",
"@vue/cli-plugin-eslint": "x.x.x",
"@vue/cli-plugin-router": "x.x.x",
"@vue/cli-plugin-typescript": "x.x.x",
"@vue/cli-plugin-unit-jest": "x.x.x",
"@vue/cli-plugin-vuex": "x.x.x",
"@vue/compiler-sfc": "x.x.x",
"cypress": "x.x.x",
"cypress-pipe": "x.x.x",
"cypress-wait-until": "x.x.x",
"core-js": "x.x.x",
"skeleton-loader-vue": "x.x.x",
"vee-validate": "x.x.x",
"vue-cookie": "x.x.x",
"vue-clickaway": "x.x.x",
"vue-inject": "x.x.x",
"vue-progressbar": "x.x.x",
"vue-select": "x.x.x",
"vue-step-progress": "x.x.x",
"vue2-datepicker": "x.x.x",
"vuex-router-sync": "x.x.x",
```
</details>


## 2. Update `main.ts`, `router.js`, `index.html` & `*.env.js`

<details><summary>Open</summary>

#### 2.1 `main.ts`

> _Note: Import and use new packages!_

> _Note: Remove old imports and usages!_

> _Note: Replace `require` with `import` for styles!_

> _Note: Replace all occurences of `Vue.xxx` by `app.xxx`!_

```js
import { createI18n } from 'vue-i18n';
import { createApp } from 'vue';

import { createHead } from '@unhead/vue';
import VueProgressBar from "@aacassandra/vue3-progressbar";
import VueClickAway from "vue3-click-away";
import VueCookies from 'vue3-cookies';
import { Skeletor } from 'vue-skeletor';
import 'vue-skeletor/dist/vue-skeletor.css';

...

const app = createApp(App);

...

app.config.performance = true;
const env = app.config.globalProperties.$env;

...

import 'popper.js';
import 'bootstrap';

import '@piveau/piveau-hub-ui-modules/styles';

import './styles/styles.scss';
import 'leaflet/dist/leaflet.css';
import '@fortawesome/fontawesome-free/css/all.css';

...

const i18n = createI18n({
  locale: LOCALE,
  fallbackLocale: FALLBACKLOCALE,
  messages: I18N_CONFIG,
  allowComposition: true,
  legacy: false,
  globalInjection: true,
  fallbackWarn: false,
  silentFallbackWarn: true,
  silentTranslationWarn: true,
  warnHtmlMessage: false,
});

...

const head = createHead();
app.use(head);

...

app.mount('#app');
```

#### 2.2 `router.js`

> _Note: Base option was removed, use history!_

> _Note: Catch all route syntax changed!_

```js
import * as Router from 'vue-router';

...

const router = Router.createRouter({
  history: Router.createWebHistory(GLUE_CONFIG.routing.routerOptions.base),
  linkActiveClass: 'active',

  ...

  {
    path: '/404',
    alias: '/(.)*',
    name: 'NotFound',
    component: NotFound,
  },

  ...

});
```

#### 2.3 `index.html`

> _Note: Move `index.html` into root directory!_


```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="shortcut icon" type="image/ico" href="/static/favicon.ico">
    <link rel="preload" type="text/css" href="/static/preload-styles/loading-animation.css" as="style">
    <link rel="preload" type="text/css" href="/static/fonts/material-icons.css" as="style">
    <link rel="stylesheet" href="/static/preload-styles/loading-animation.css">
    <link rel="stylesheet" href="/static/fonts/material-icons.css">
    <script type="module" src="/src/main.ts"></script>
    <title></title>
  </head>
  <body>
    <div id="app">
        <div class="spinner-container">
            <div class="spinner"></div>
        </div>
    </div>
  </body>
</html>
```

#### 2.4 `*.env.js`

> _Note: Adjust import of webpack-merge!_


```js
var { merge } = require('webpack-merge');

...
```
</details>


## 3. Update `user-config.sample.js`

<details><summary>Open</summary>
<br>

> _Note: You may need to adjust the API´s for your project!_

```js
import i18n from './i18n';

const glueConfig = {
  api: {
    // baseUrl: 'https://data.europa.eu/api/hub/search/',
    // baseUrl: 'https://ppe.data.europa.eu/api/hub/search/',
    baseUrl: 'https://piveau-hub-search-data-europa-eu.apps.osc.fokus.fraunhofer.de/',

    // hubUrl: 'https://data.europa.eu/api/hub/repo/',
    // hubUrl: 'https://ppe.data.europa.eu/api/hub/repo/',
    hubUrl: 'https://piveau-hub-repo-data-europa-eu.apps.osc.fokus.fraunhofer.de/',

    // qualityBaseUrl: 'https://data.europa.eu/api/mqa/cache/',
    // qualityBaseUrl: 'https://ppe.data.europa.eu/api/mqa/cache/',
    qualityBaseUrl: 'https://piveau-metrics-cache-data-europa-eu.apps.osc.fokus.fraunhofer.de/',

    // similarityBaseUrl: 'https://data.europa.eu/api/similarities/',
    // similarityBaseUrl: 'https://ppe.data.europa.eu/api/similarities/',
    similarityBaseUrl: 'https://piveau-metrics-dataset-similarities-data-europa-eu.apps.osc.fokus.fraunhofer.de/',

    // fileUploadUrl: 'https://data.europa.eu/api/hub/store/',
    // fileUploadUrl: 'https://ppe.data.europa.eu/api/hub/store/',
    fileUploadUrl: 'https://piveau-hub-store-data-europa-eu.apps.osc.fokus.fraunhofer.de/',

    sparqlUrl: 'https://data.europa.eu/sparql',
    gazetteerBaseUrl: 'https://data.europa.eu/api/hub/search/gazetteer/',
    catalogBaseUrl: 'https://europeandataportal.eu/',
    corsproxyApiUrl: 'https://piveau-corsproxy-piveau.apps.osc.fokus.fraunhofer.de',
  },
  authentication: {
    useService: true,
    login: {
      useLogin: true,

      loginTitle: 'Login',
      loginURL: '/login',
      loginRedirectUri: '/',

      logoutTitle: 'Logout',
      logoutURL: '/logout',
      logoutRedirectUri: '/',
    },
    keycloak: {
      realm: 'piveau',
      clientId: 'piveau-hub-ui',
      url: 'https://keycloak-piveau.apps.osc.fokus.fraunhofer.de',

      // TODO: Do we need to include these properties? They seem to be default values that never change #2763
      'ssl-required': 'external',
      'public-client': true,
      'verify-token-audience': true,
      'use-resource-role-mappings': true,
      'confidential-port': 0,
    },
    keycloakInit: {
      pkceMethod: '',
    },
    rtp: {
      grand_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
      audience: 'piveau-hub-repo',
    },
    authToken: '',
  },
  routing: {
    routerOptions: {
      base: '/',
      mode: 'history',
    },
    navigation: {
      showSparql: false,
    },
    pagination: {
      usePagination: true,
      usePaginationArrows: true,
      useItemsPerPage: true,
      defaultItemsPerPage: 10, // TODO: Make use of this property #2764
      defaultItemsPerPageOptions: [5, 10, 25, 50],
    },
  },
  metadata: {
    title: 'piveau Hub-UI',
    description: 'A modern and customizable web application for data management of extensive data catalogs.',
    keywords: 'Open Data',
  },
  content: {
    datasets: {
      useSort: true,
      useFeed: true,
      useCatalogs: true,
      followKeywordLinks: 'nofollow',
      maxKeywordLength: 15,
      facets: {
        useDatasetFacets: true,
        useDatasetFacetsMap: false,
        showClearButton: false,
        showFacetsTitle: false,
        cutoff: 5 ,
        MIN_FACET_LIMIT: 10,
        MAX_FACET_LIMIT: 50,
        FACET_OPERATORS: Object.freeze({ or: 'OR', and: 'AND' }),
        FACET_GROUP_OPERATORS: Object.freeze({ or: 'OR', and: 'AND' }),
        defaultFacetOrder: ['publisher', 'format', 'catalog', 'categories', 'keywords', 'dataScope', 'country', 'dataServices', 'scoring', 'license'],
        scoringFacets: {
          useScoringFacets: true, // TODO: Make use of this property #2764
          defaultScoringFacets: {
            excellentScoring: {
              id: 'excellentScoring',
              title: 'Excellent',
              count: 0,
              minScoring: 351,
              maxScoring: 405,
            },
            goodScoring: {
              id: 'goodScoring',
              title: 'Good',
              count: 0,
              minScoring: 221,
              maxScoring: 350,
            },
            sufficientScoring: {
              id: 'sufficientScoring',
              title: 'Sufficient',
              count: 0,
              minScoring: 121,
              maxScoring: 220,
            },
            badScoring: {
              id: 'badScoring',
              title: 'Any',
              count: 0,
              minScoring: 0,
              maxScoring: 120,
            },
          },
        },
      },
    },
    catalogs: {
      useSort: true, // TODO: Make use of this property #2764
      useCatalogCountries: true,
      defaultCatalogImagePath: '/flags',
      defaultCatalogCountryID: 'eu',
      defaultCatalogID: 'european-union-open-data-portal',
      facets: {
        useCatalogFacets: true,
        showClearButton: false,
        showFacetsTitle: false,
        cutoff: 5,
        MIN_FACET_LIMIT: 50,
        MAX_FACET_LIMIT: 100,
        FACET_OPERATORS: Object.freeze({ or: 'OR', and: 'AND' }),
        FACET_GROUP_OPERATORS: Object.freeze({ or: 'OR', and: 'AND' }),
        defaultFacetOrder: ['country'],
      },
    },
    datasetDetails: {
      header: {
        navigation: "top",
        hidePublisher: false,
        hideDate: false
      },
      keywords: {
        isVisible: true,
        showTitle: false,
        collapsed: false,  // displayAll
      },
      description: {
        enableMarkdownInterpretation: true,
      },
      distributions: {
        displayAll: false,
        displayCount: 7,
        incrementSteps: [10, 50],
        descriptionMaxLines: 3,
        descriptionMaxChars: 250,
        showValidationButton: false, // TODO: Make use of this property #2764
      },
      downloadAs: {
        enable: true,
        proxyUrl: 'https://piveau-corsproxy-piveau.apps.osc.fokus.fraunhofer.de',
        url: 'https://piveau-fifoc-piveau.apps.osc.fokus.fraunhofer.de/v1/convert',
        conversionFormats: [
          { sourceFileFormat: 'HTML', targetFileFormat: [ 'html', 'pdf', 'docx', 'json', 'odt', 'rtf' ]},
          { sourceFileFormat: 'CSV', targetFileFormat: [ 'csv', 'docx', 'html', 'json', 'odt', 'rtf', 'xls', 'xlsx', 'xml']},
          { sourceFileFormat: 'JSON', targetFileFormat: [ 'json', 'xml', ]},
          { sourceFileFormat: 'ODT', targetFileFormat: [ 'odt', 'docx', 'html', 'json', 'rtf' ]},
          { sourceFileFormat: 'DOCX', targetFileFormat: [ 'docx', 'pptx', 'odt', 'pdf', 'txt', 'html', 'json', 'odt', 'rtf']},
          { sourceFileFormat: 'XLSX', targetFileFormat: [ 'xlsx', 'csv',]},
          { sourceFileFormat: 'XLS', targetFileFormat: [ 'xls', 'csv',]},
          { sourceFileFormat: 'PDF', targetFileFormat: [ 'pdf', 'txt',]}
        ]
      },
      similarDatasets: {
        breakpoints: {
          verySimilar: { start: 0, end: 20 },
          similar: { start: 20, end: 25 },
          lessSimilar: { start: 25, end: 35 },
        },
      },
      pages: {
        isVisible: false,
        displayAll: false,
        displayCount: 7,
        incrementSteps: [10, 50],
        descriptionMaxLines: 3,
        descriptionMaxChars: 250,
      },
      visualisations: {
        isVisible: false,
        displayAll: false,
        displayCount: 7,
        incrementSteps: [10, 50],
        descriptionMaxLines: 3,
        descriptionMaxChars: 250,
      },
      dataServices: {
        isVisible: false,
        displayAll: false,
        displayCount: 7,
        incrementSteps: [10, 50],
        descriptionMaxLines: 3,
        descriptionMaxChars: 250,
      },
      isUsedBy: {
        isVisible: false,
      },
      relatedResources: {
        isVisible: false,
      },
      bulkDownload: {
        buttonPosition: "top",
        MAX_FILE_TITLE_LENGTH: 80,
        MAX_REQUESTS_COUNT: 5, // TODO: Make use of this property #2764
        INTERVAL_MS: 10, // TODO: Make use of this property #2764
        TIMEOUT_MS: 10000,
      },
      quality: {
        useQualityData: true,
        useQualityDistributionData: true,
        useDQVDataDropdown: true,
        formatsDQVData: [
          'rdf',
          'ttl',
          'n3',
          'nt',
          'jsonld',
        ],
        displayAll: false,
        numberOfDisplayedQualityDistributions: 5,
        csvLinter: {
          enable: true,
          displayAll: false,
          numberOfDisplayedValidationResults: 5,
        },
      }
    },
    maps: {
      mapVisible: true,
      useAnimation: true,
      location: [[52.526, 13.314], 10],
      spatialType: 'Point',
      height: '400px',
      width: '100%',
      mapContainerId: 'mapid',
      urlTemplate: 'https://gisco-services.ec.europa.eu/maps/wmts/1.0.0/WMTSCapabilities.xml/wmts/OSMCartoComposite/EPSG3857/{z}/{x}/{y}.png',
      geoBoundsId: 'ds-search-bounds',
      sender: {
        startBounds: [[34.5970, -9.8437], [71.4691, 41.4843]],
        height: '200px',
        width: '100%',
        mapContainerId: 'modalMap',
      },
      receiver: {
        startBounds: [[34.5970, -9.8437], [71.4691, 41.4843]],
        height: '250px',
        width: '100%',
        mapContainerId: 'mapid',
        attributionPosition: 'topright',
      },
      options: {
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1IjoiZmFiaWFwZmVsa2VybiIsImEiOiJja2x3MzlvZ3UwNG85MnBseXJ6aGI2MHdkIn0.bFs2g4bPMYULlvDSVsetJg',
        attribution: '&copy; <a href="https://ec.europa.eu/eurostat/web/gisco/">Eurostat - GISCO</a>',
      },
      mapStyle: {
        color: 'red',
        fillColor: 'red',
        fillOpacity: 0.5,
        weight: 2,
        radius: 1,
      },
    },
    dataProviderInterface: {
      useService: true,
      basePath: '/dpi',
      specification: 'dcatap',
      annifIntegration: false,
      enableFileUploadReplace: false,
      buttons: {
        Dataset: true,
        Catalogue: false,
      },
      doiRegistrationService: {
        persistentIdentifierType: 'eu-ra-doi',
      },
    },
  },
  languages: {
    useLanguageSelector: true, // TODO: Make use of this property by passing it to the Header-Footer in App.vue #2766
    locale: 'en',
    fallbackLocale: 'en',
  },
  themes: {
    header: 'dark',
  },
  tracker: {
    // TODO: Implement disable tracker option based on condition #2767
    isPiwikPro: true, // true: PiwikPro | false: Matomo
    siteId: '',
    trackerUrl: ''
  },
};

export { glueConfig, i18n };
```

</details>


## 4. Add FormKit

<details><summary>Open</summary>
<br>

#### 4.1 Import and use FormKit in `main.ts`

```js
import { plugin as FormKitPlugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'
import config from '../formkit.config.ts';

app.use(FormKitPlugin, defaultConfig(config));
```

#### 4.2 Add `formkit.config.ts` to root directory

```js
import { DefaultConfigOptions } from '@formkit/vue';
import { inputDefinitions } from '@piveau/piveau-hub-ui-modules';

const config: DefaultConfigOptions = {
    inputs: inputDefinitions
}

export default config
```
</details>


## 5. Replace `vue.config.js` by `vite.config.ts`


<details><summary>Open</summary>
<br>

```ts
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { lstatSync } from 'node:fs';
import path from 'path';
import config from './config';

const isSymlink = (pkg: string) => {
  const packagePath = path.resolve('..', '..', 'node_modules', pkg);
  try {
    return lstatSync(packagePath).isSymbolicLink();
  } catch {
    return false;
  }
}

let buildMode;
if (process.env.NODE_ENV === 'production') {
  buildMode = process.env.BUILD_MODE === 'test' ? 'test' : 'build';
} else {
  buildMode = 'dev';
}

const buildConfig = {
  BASE_PATH: config[buildMode].assetsPublicPath,
  SERVICE_URL: config[buildMode].serviceUrl,
};

export default defineConfig({
  base: buildConfig.BASE_PATH,
  plugins: [
    vue(
      { template: { compilerOptions: { whitespace: 'preserve' } } }
    ),
  ],
  server: {
    port: 8080
  },
  define: {},
  resolve: {
    alias: [
      {
        find: 'vue',
        replacement: '@vue/compat',
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      },
      {
        find: '@modules-scss',
        replacement: isSymlink('@piveau/piveau-hub-ui-modules') ?
          path.resolve(__dirname, '..', '..', 'node_modules', '@piveau/piveau-hub-ui-modules', 'dist', 'scss')
          : path.resolve(__dirname, 'node_modules', '@piveau/piveau-hub-ui-modules', 'dist', 'scss')
      },
      {
        find: /^~(.*)$/,
        replacement: '$1',
      },
      {
        find: 'lodash',
        replacement: 'lodash-es',
      },
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
      },
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    preserveSymlinks: false
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'app.[hash].js',
      }
    }
  },
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
});
```
</details>


## 6. Remove `Vue` object

The `Vue` object is no longer available in Vue 3.
This is a list of known usages in our UI that needs to be replaced.

<details><summary>Open</summary>
<br>

#### 6.1 Remove Vue imports

```js
import Vue from "vue"
```

#### 6.2 Replace `Vue.` occurences

> _Note: There may be more usages in your project, use the search function to search for `Vue.`!_

```js
Vue.set(variable, property, value)    ==> variable[property] = value

Vue.extend()                          ==> defineComponent()

Vue.component()                       ==> app.component()

Vue.i18n                              ==> this.i18n.global

Vue.prototype.$env                    ==> app.config.globalProperties.$env

Vue.prototype.<globalProperty>        ==> app.config.globalProperties.<globalProperty>
```
</details>


## 7. Update Keycloak

Update the Keycloak Service.

<details><summary>Open</summary>

#### 7.1 Update `keycloak-js` package

```js
  "keycloak-js": "22.0.3",
```

#### 7.2 Remove vueKeycloak import from piveau-hub-ui-modules in `main.ts`

```js
import {
  vueKeycloak,
} from '@piveau/piveau-hub-ui-modules';
```

#### 7.3 Import local `keycloakService.js` in `main.ts`

```js
import vueKeycloak from './services/keycloakService';
```

#### 7.4 Create local `src/services/keycloakService.js` to overwrite keycloak service

```js
// @ts-nocheck
/* eslint-disable */
import { reactive } from 'vue';
import Keycloak from 'keycloak-js';
import qs from 'qs';
import axios from 'axios';
import {
  store
} from '@piveau/piveau-hub-ui-modules';

let installed = false;
let rtpToken = null;

export default {
  install(app, params = {}) {
    if (installed) return;
    installed = true;

    const defaultParams = {
      config: window.__BASEURL__ ? `${window.__BASEURL__}/config` : '/config',
      init: { onLoad: 'login-required' },
    };
    const options = Object.assign({}, defaultParams, params);
    if (assertOptions(options).hasError) throw new Error(`Invalid options given: ${assertOptions(options).error}`);

    const watch = reactive({
      ready: false,
      authenticated: false,
      userName: null,
      fullName: null,
      token: null,
      rtpToken: null,
      tokenParsed: null,
      logoutFn: null,
      loginFn: null,
      login: null,
      createLoginUrl: null,
      createLogoutUrl: null,
      createRegisterUrl: null,
      register: null,
      accountManagement: null,
      createAccountUrl: null,
      loadUserProfile: null,
      loadUserInfo: null,
      subject: null,
      idToken: null,
      idTokenParsed: null,
      realmAccess: null,
      resourceAccess: null,
      refreshToken: null,
      refreshTokenParsed: null,
      timeSkew: null,
      responseMode: null,
      responseType: null,
      hasRealmRole: null,
      hasResourceRole: null,
      getRtpToken: null,
    });

    getConfig(options.config)
    .then((config) => {
      init(config, watch, options);
      Object.defineProperty(app.config.globalProperties, '$keycloak', {
        get() {
          return watch;
        },
      });
    })
    .catch((err) => {
      console.error(err);
    });
  },
};

function init(config, watch, options) {
  const ctor = sanitizeConfig(config);
  const keycloak = new Keycloak(ctor);

  keycloak.onReady = function (authenticated) {
    updateWatchVariables(authenticated);
    watch.ready = true;
    typeof options.onReady === 'function' && options.onReady(keycloak, watch);
  };

  keycloak.onAuthSuccess = function () {
    // Check token validity every 10 seconds (10 000 ms) and, if necessary, update the token.
    // Refresh token if it's valid for less then 60 seconds
    const updateTokenInterval = setInterval(() => keycloak.updateToken(60)
    .then((hasRefreshed) => {
      if (hasRefreshed) {
        // When the auth token refreshes, 'invalidate' the stored rtpToken
        // to force getting a new rtpToken the next time
        rtpToken = null;
      }
    })
    .catch(() => {
      rtpToken = null;
      keycloak.clearToken();
    }), 10000);

    watch.logoutFn = () => {
      clearInterval(updateTokenInterval);
    };
  };

  keycloak.onAuthRefreshSuccess = function () {
    updateWatchVariables(true);
  };

  keycloak.init(options.init)
  .catch((err) => {
    typeof options.onInitError === 'function' && options.onInitError(err);
  });

  let updateTokenTimeout = null;

  function getRtpToken({ autoRefresh = false, refreshToken = null} = {}) {
    const rtpConfig = options.config.rtp;
    const baseUrl = options.config.url;
    const realm = options.config.realm;
    const token = keycloak.token;
    const endpoint = `${baseUrl}/realms/${realm}/protocol/openid-connect/token`;
    const requestBody = {
      grant_type: rtpConfig.grand_type,
      audience: rtpConfig.audience,
      ...refreshToken ? { refresh_token: refreshToken } : {},
    };

    return new Promise((resolve, reject) => {
      if (rtpToken && !refreshToken) {
        resolve(rtpToken)
        return;
      }

      axios.post(endpoint, qs.stringify(requestBody), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((response) => {
        rtpToken = response?.data?.access_token;
        const refreshInterval = response?.data?.expires_in * 1000 * 0.8;

        if (autoRefresh) {
          if (updateTokenTimeout) clearTimeout(updateTokenTimeout);
          updateTokenTimeout = setTimeout(async () => {
            await getRtpToken({ autoRefresh: true, refreshToken: response.data.refresh_token });
          }, refreshInterval);
        }
        updateWatchVariables(true);
        resolve(rtpToken);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  function loginFn(options) {
    keycloak.login(options)
    .then(() => {
      store.dispatch('auth/setKeycloak', keycloak);
      store.dispatch('auth/authLogin', keycloak.authenticated);
    })
    .catch((err) => {
      console.error(`Error keycloak login: ${JSON.stringify(err)}`);
    });
  }

  function logoutFn(options) {
    keycloak.logout(options);
  }

  function updateWatchVariables(isAuthenticated = false) {
    watch.authenticated = isAuthenticated;
    watch.loginFn = loginFn;
    watch.login = keycloak.login;
    watch.createLoginUrl = keycloak.createLoginUrl;
    watch.logoutFn = logoutFn;
    watch.logout = keycloak.logout;
    watch.createLogoutUrl = keycloak.createLogoutUrl;
    watch.createRegisterUrl = keycloak.createRegisterUrl;
    watch.register = keycloak.register;
    if (isAuthenticated) {
      watch.accountManagement = keycloak.accountManagement;
      watch.createAccountUrl = keycloak.createAccountUrl;
      watch.hasRealmRole = keycloak.hasRealmRole;
      watch.hasResourceRole = keycloak.hasResourceRole;
      watch.loadUserProfile = keycloak.loadUserProfile;
      watch.loadUserInfo = keycloak.loadUserInfo;
      watch.token = keycloak.token;
      watch.rtpToken = rtpToken;
      watch.subject = keycloak.subject;
      watch.idToken = keycloak.idToken;
      watch.idTokenParsed = keycloak.idTokenParsed;
      watch.realmAccess = keycloak.realmAccess;
      watch.resourceAccess = keycloak.resourceAccess;
      watch.refreshToken = keycloak.refreshToken;
      watch.refreshTokenParsed = keycloak.refreshTokenParsed;
      watch.timeSkew = keycloak.timeSkew;
      watch.responseMode = keycloak.responseMode;
      watch.responseType = keycloak.responseType;
      watch.tokenParsed = keycloak.tokenParsed;
      watch.userName = keycloak.tokenParsed.preferred_username;
      watch.fullName = keycloak.tokenParsed.name;
      watch.getRtpToken = getRtpToken
    }
  }
}

function assertOptions(options) {
  const {
    config, init, onReady, onInitError,
  } = options;
  if (typeof config !== 'string' && !_isObject(config)) {
    return { hasError: true, error: `'config' option must be a string or an object. Found: '${config}'` };
  }
  if (!_isObject(init) || typeof init.onLoad !== 'string') {
    return { hasError: true, error: `'init' option must be an object with an 'onLoad' property. Found: '${init}'` };
  }
  if (onReady && typeof onReady !== 'function') {
    return { hasError: true, error: `'onReady' option must be a function. Found: '${onReady}'` };
  }
  if (onInitError && typeof onInitError !== 'function') {
    return { hasError: true, error: `'onInitError' option must be a function. Found: '${onInitError}'` };
  }
  return {
    hasError: false,
    error: null,
  };
}

function _isObject(obj) {
  return obj !== null && typeof obj === 'object' && Object.prototype.toString.call(obj) !== '[object Array]';
}

function getConfig(config) {
  if (_isObject(config)) return Promise.resolve(config);
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', config);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(Error(xhr.statusText));
        }
      }
    };
    xhr.send();
  });
}

function sanitizeConfig(config) {
  const renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => ({
    [newProp]: old,
    ...others,
  });
  return Object.keys(config).reduce((previous, key) => {
    if (['authRealm', 'authUrl', 'authClientId'].includes(key)) {
      const cleaned = key.replace('auth', '');
      const newKey = cleaned.charAt(0).toLowerCase() + cleaned.slice(1);
      return renameProp(key, newKey, previous);
    }
    return previous;
  }, config);
}
```
</details>


## 8. Remove Dependency Injection

Our old Dependency Injection is outdated and was replaced. Remove the old code fragments regarding our Dependency Injection.

<details><summary>Open</summary>
<br>

> _Note: Remove `dependencies` property and `useService()` store action method and it´s usages!_

```js
export default {
  dependencies: ["<Service>"],
  ...
  methods: {
    ...mapActions("datasets", [
      "useService",
    ]),
 ...
}
```
</details>


## 9. Remove outdated content from piveau-hub-ui

At this point, the acutal Vue 3 migration is done. 

Restore a clean state of the repo by performing the following actions in preparation for Installation & Test:

<details><summary>Open</summary>

### 9.1 Remove all remaining occurences of:

- `babel`
- `cypress`
- `webpack`
- `vue/cli`

### 9.2 Delete package-lock file

- `package-lock.json`

### 9.3 Delete npm packages

- `node_modules`
</details>


## 10. Installation & Test

Check if there are still unsolved issues, by installing the packages and running the application.

<details><summary>Open</summary>

### 10.1 Install npm packages

```bash
npm install
```

### 10.2 Test application

```bash
npm run dev
```

### 10.3 Check console for errors & warnings

The `@vue/compat` package should show warnings for Vue 2 related behaviour in your project, that is deprecated in Vue 3. 

Fix all the errors and warnings and add instructions to this Migration Guide if it was not included.

</details>


## 11. Remove Vue compat package and use Vue 3

The `@vue/compat` package which was used during the migration can now be removed so that the actual Vue 3 version will be used.

<details><summary>Open</summary>

### 11.1 Remove `@vue/compat` package from `package.json` and `vite.config.ts`

```js
"@vue/compat": "^3.1.0",
```

```js
{
  find: 'vue',
  replacement: '@vue/compat',
},
```

### 11.2 Install npm packages again

> _Note: You may need to delete the package-lock file and the npm packages again!_
```bash
npm install
```

### 11.3 Test application again

```bash
npm run dev
```

If no errors or warnings are shown and the application is running as before, the upgrade to Vue 3 was successful!

</details>

## 12. Changes to runtime-config.js

<details><summary>Open</summary>

The string values defined in runtime-config.js (in the config folder) have changed (among other changes, they now 
start with `$Vite_` instead of `$VUE_APP_`) use the latest version of this file in Vanilla-hub-ui and
adapt variable definitions in your deployment accordingly.

All variables now start with `$VITE_` instead of `$VUE_APP_`. Additionally, we have the following
changes (read as "before --> new"):

```
$VITE_FILEUPLOAD_URL --> $VITE_API_FILE_UPLOAD_URL
$VITE_SPARQL_URL --> $VITE_API_SPARQL_URL
$VITE_CORSPROXY_API_URL --> $VITE_API_CORSPROXY_API_URL
$VITE_CONTENT_DATASETDETAILS_PROPERTIES --> $VITE_CONTENT_DATASET_DETAILS_PROPERTIES
$VITE_CONTENT_DATASETDETAILS_EMBED_ENABLE --> $VITE_CONTENT_DATASET_DETAILS_EMBED_ENABLE
$VITE_CONTENT_DATASETDETAILS_EMBED_DEFAULT_WIDTH --> $VITE_CONTENT_DATASET_DETAILS_EMBED_DEFAULT_WIDTH
$VITE_CONTENT_DATASETDETAILS_EMBED_DEFAULT_HEIGHT --> $VITE_CONTENT_DATASET_DETAILS_EMBED_DEFAULT_HEIGHT
$VITE_CONTENT_DATASETDETAILS_EMBED_MIN_RANGE --> $VITE_CONTENT_DATASET_DETAILS_EMBED_MIN_RANGE
$VITE_CONTENT_DATASETDETAILS_EMBED_MAX_RANGE --> $VITE_CONTENT_DATASET_DETAILS_EMBED_MAX_RANGE
$VITE_CONTENT_DATASETDETAILS_HEADER_NAVIGATION --> $VITE_CONTENT_DATASET_DETAILS_HEADER_NAVIGATION
$VITE_CONTENT_DATASETDETAILS_HEADER_HIDE_PUBLISHER --> $VITE_CONTENT_DATASET_DETAILS_HEADER_HIDE_PUBLISHER
$VITE_CONTENT_DATASETDETAILS_HEADER_HIDE_DATE --> $VITE_CONTENT_DATASET_DETAILS_HEADER_HIDE_DATE
$VITE_CONTENT_DATASETDETAILS_KEYWORDS_SHOW_TITLE --> $VITE_CONTENT_DATASET_DETAILS_KEYWORDS_SHOW_TITLE
$VITE_CONTENT_DATASETDETAILS_DESCRIPTION_ENABLE_MARKDOWN_INTERPRETATION --> $VITE_CONTENT_DATASET_DETAILS_DESCRIPTION_ENABLE_MARKDOWN_INTERPRETATION
$VITE_CONTENT_DATASETDETAILS_DISTRIBUTIONS_DISPLAY_ALL --> $VITE_CONTENT_DATASET_DETAILS_DISTRIBUTIONS_DISPLAY_ALL
$VITE_CONTENT_DATASETDETAILS_DISTRIBUTIONS_DISPLAY_COUNT --> $VITE_CONTENT_DATASET_DETAILS_DISTRIBUTIONS_DISPLAY_COUNT
$VITE_CONTENT_DATASETDETAILS_DISTRIBUTIONS_INCREMENT_STEPS --> $VITE_CONTENT_DATASET_DETAILS_DISTRIBUTIONS_INCREMENT_STEPS
$VITE_CONTENT_DATASETDETAILS_DISTRIBUTIONS_DESCRIPTION_MAX_LINES --> $VITE_CONTENT_DATASET_DETAILS_DISTRIBUTIONS_DESCRIPTION_MAX_LINES
$VITE_CONTENT_DATASETDETAILS_DISTRIBUTIONS_DESCRIPTION_MAX_CHARS --> $VITE_CONTENT_DATASET_DETAILS_DISTRIBUTIONS_DESCRIPTION_MAX_CHARS
$VITE_CONTENT_DATASETDETAILS_DISTRIBUTIONS_SHOW_VALIDATION_BUTTON --> $VITE_CONTENT_DATASET_DETAILS_DISTRIBUTIONS_SHOW_VALIDATION_BUTTON
$VITE_CONTENT_DATASETDETAILS_DOWNLOAD_AS_ENABLE --> $VITE_CONTENT_DATASET_DETAILS_DOWNLOAD_AS_ENABLE
$VITE_CONTENT_DATASETDETAILS_DOWNLOAD_AS_PROXY_URL --> $VITE_CONTENT_DATASET_DETAILS_DOWNLOAD_AS_PROXY_URL
$VITE_CONTENT_DATASETDETAILS_DOWNLOAD_AS_URL --> $VITE_CONTENT_DATASET_DETAILS_DOWNLOAD_AS_URL
$VITE_CONTENT_DATASETDETAILS_DOWNLOAD_AS_CONVERSION_FORMATS --> $VITE_CONTENT_DATASET_DETAILS_DOWNLOAD_AS_CONVERSION_FORMATS
$VITE_CONTENT_DATASETDETAILS_PAGES_IS_VISIBLE --> $VITE_CONTENT_DATASET_DETAILS_DATA_SERVICES_IS_VISIBLE
$VITE_CONTENT_DATASETDETAILS_PAGES_DISPLAY_ALL --> $VITE_CONTENT_DATASET_DETAILS_DATA_SERVICES_DISPLAY_ALL
$VITE_CONTENT_DATASETDETAILS_PAGES_DISPLAY_COUNT --> $VITE_CONTENT_DATASET_DETAILS_DATA_SERVICES_DISPLAY_COUNT
$VITE_CONTENT_DATASETDETAILS_PAGES_INCREMENT_STEPS --> $VITE_CONTENT_DATASET_DETAILS_DATA_SERVICES_INCREMENT_STEPS
$VITE_CONTENT_DATASETDETAILS_PAGES_DESCRIPTION_MAX_LINES --> $VITE_CONTENT_DATASET_DETAILS_DATA_SERVICES_DESCRIPTION_MAX_LINES
$VITE_CONTENT_DATASETDETAILS_PAGES_DESCRIPTION_MAX_CHARS --> $VITE_CONTENT_DATASET_DETAILS_DATA_SERVICES_DESCRIPTION_MAX_CHARS
$VITE_CONTENT_DATASETDETAILS_VISUALISATIONS_IS_VISIBLE --> $VITE_CONTENT_DATASET_DETAILS_DATA_SERVICES_IS_VISIBLE
$VITE_CONTENT_DATASETDETAILS_VISUALISATIONS_DISPLAY_ALL --> $VITE_CONTENT_DATASET_DETAILS_DATA_SERVICES_DISPLAY_ALL
$VITE_CONTENT_DATASETDETAILS_VISUALISATIONS_DISPLAY_COUNT --> $VITE_CONTENT_DATASET_DETAILS_DATA_SERVICES_DISPLAY_COUNT
$VITE_CONTENT_DATASETDETAILS_VISUALISATIONS_INCREMENT_STEPS --> $VITE_CONTENT_DATASET_DETAILS_DATA_SERVICES_INCREMENT_STEPS
$VITE_CONTENT_DATASETDETAILS_VISUALISATIONS_DESCRIPTION_MAX_LINES --> $VITE_CONTENT_DATASET_DETAILS_DATA_SERVICES_DESCRIPTION_MAX_LINES
$VITE_CONTENT_DATASETDETAILS_VISUALISATIONS_DESCRIPTION_MAX_CHARS --> $VITE_CONTENT_DATASET_DETAILS_DATA_SERVICES_DESCRIPTION_MAX_CHARS
$VITE_CONTENT_DATASETDETAILS_BULKDOWNLOAD_BUTTON_POSITION --> $VITE_CONTENT_DATASET_DETAILS_BULK_DOWNLOAD_BUTTON_POSITION
$VITE_CONTENT_DATASETDETAILS_BULKDOWNLOAD_MAX_FILE_TITLE_LENGTH --> $VITE_CONTENT_DATASET_DETAILS_BULK_DOWNLOAD_MAX__FILE__TITLE__LENGTH
$VITE_CONTENT_DATASETDETAILS_BULKDOWNLOAD_MAX_REQUESTS_COUNT --> $VITE_CONTENT_DATASET_DETAILS_BULK_DOWNLOAD_MAX__REQUESTS__COUNT
$VITE_CONTENT_DATASETDETAILS_BULKDOWNLOAD_INTERVAL_MS --> $VITE_CONTENT_DATASET_DETAILS_BULK_DOWNLOAD_INTERVAL__MS
$VITE_CONTENT_DATASETDETAILS_BULKDOWNLOAD_TIMEOUT_MS --> $VITE_CONTENT_DATASET_DETAILS_BULK_DOWNLOAD_TIMEOUT__MS
$VITE_CONTENT_DATASETDETAILS_QUALITY_CSV_LINTER_ENABLE --> $VITE_CONTENT_DATASET_DETAILS_QUALITY_CSV_LINTER_ENABLE
```

</details>

## References

- https://v3-migration.vuejs.org/
- https://vitejs.dev/guide/
- https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/
- https://router.vuejs.org/guide/migration/
- https://vue-i18n.intlify.dev/guide/migration/vue3.html
- https://formkit.com/getting-started/installation
- https://vuejs.org/guide/components/provide-inject.html
