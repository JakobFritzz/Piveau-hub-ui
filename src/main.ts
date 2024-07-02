// @ts-nocheck

import 'es6-promise/auto';
import $ from 'jquery';

// Vue packages
import VueProgressBar from "@aacassandra/vue3-progressbar";
import VueClickAway from "vue3-click-away";
import { plugin as FormKitPlugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'
import config from '../formkit.config.ts';
import VueCookies from 'vue3-cookies';
import VuePositionSticky from 'vue-position-sticky';
import { createHead } from '@unhead/vue';
import { Skeletor } from 'vue-skeletor';
import 'vue-skeletor/dist/vue-skeletor.css';

// Fontawesome library
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faChevronDown, faBars, faTimes, faSearch, faExternalLinkAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faTwitter, faYoutube, faFacebookSquare, faTwitterSquare, faLinkedin, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faGoogle, faGooglePlus, faGooglePlusG, faFacebook, faFacebookF, faInstagram, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faComment, faExternalLinkAlt, faPlus, faMinus, faArrowDown, faArrowUp, faInfoCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Vue setup
import { createI18n } from 'vue-i18n';
import { createApp } from 'vue';

import router from './router';
import App from './App';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import vueKeyCloak from "./services/keycloakService";
import UniversalPiwik from '@piveau/piveau-universal-piwik';

import { glueConfig as GLUE_CONFIG, i18n as I18N_CONFIG } from '../config/user-config';
import runtimeConfig from '../config/runtime-config';

import {
  dateFilters,
  AppSnackbar,
  AppConfirmationDialog,
  bulkDownloadCorsProxyService ,
  corsProxyService,
  runtimeConfigurationService,
  store,
  InfoSlot,
  ConditionalInput,
  AutocompleteInput,
  UniqueIdentifierInput,
  FileUpload,
  configureModules,
  helpers,
} from '@piveau/piveau-hub-ui-modules';
import '@piveau/piveau-hub-ui-modules/styles';


// Add Font Awesome Icons
library.add([faHome, faChevronDown, faBars, faTimes, faSearch, faExternalLinkAlt, faComments, faUser, faFacebook, faTwitter, faYoutube, faFacebookSquare, faTwitterSquare, faLinkedin, faYoutubeSquare]);
library.add(faGoogle, faGooglePlus, faGooglePlusG, faFacebook, faFacebookF, faInstagram, faTwitter, faLinkedinIn, faComment, faExternalLinkAlt, faPlus, faMinus, faArrowDown, faArrowUp, faInfoCircle, faExclamationTriangle);

// Bootstrap requirements to use js-features of bs-components
import 'popper.js';
import 'bootstrap';

import './styles/styles.scss';
import 'leaflet/dist/leaflet.css';
import '@fortawesome/fontawesome-free/css/all.css';

$(() => {
  $('[data-toggle="popover"]').popover({ container: 'body' });
  $('[data-toggle="tooltip"]').tooltip({ container: 'body' });
});


// Create the application
const app = createApp(App);

app.config.performance = true;

// Runtime Configuration Service
app.use(runtimeConfigurationService, runtimeConfig, { baseConfig: GLUE_CONFIG, debug: false });
const env = app.config.globalProperties.$env;

configureModules(app, store, {
  serviceParams: {
    baseUrl: env.api.baseUrl,
    qualityBaseUrl: env.api.qualityBaseUrl,
    similarityBaseUrl: env.api.similarityBaseUrl,
    similarityServiceName: env.api.similarityServiceName,
    gazetteerBaseUrl: env.api.gazetteerBaseUrl,
    hubUrl: env.api.hubUrl,
    keycloak: env.authentication.keycloak,
    rtp: env.authentication.rtp,
    useAuthService: env.authentication.useService,
    authToken: env.authentication.authToken,
    defaultScoringFacets: env.content.datasets.facets.scoringFacets.defaultScoringFacets,
  }
});

app.component('piveau-header', Header);
app.component('piveau-footer', Footer);
app.component('InfoSlot', InfoSlot);
app.component('ConditionalInput', ConditionalInput);
app.component('AutocompleteInput', AutocompleteInput);
app.component('UniqueIdentifierInput', UniqueIdentifierInput);
app.component('FileUpload', FileUpload);
app.component('AppSnackbar', AppSnackbar);
app.component('AppConfirmationDialog', AppConfirmationDialog);
app.component('font-awesome-icon', FontAwesomeIcon);

// Vue i18n
const LOCALE = env.languages.locale;
const FALLBACKLOCALE = env.languages.fallbackLocale;

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

// Vue Router
router.beforeEach(helpers.createStickyLocale(LOCALE || FALLBACKLOCALE))
router.app = app;
app.use(router);

// Vuex Store
app.use(store);


app.config.globalProperties.i18n = i18n;
app.use(i18n);

// Set locale for dateFilters
dateFilters.setLocale(LOCALE);

// Skeleton Loader
app.component(Skeletor.name, Skeletor);

// Vue Cookies
app.use(VueCookies);

// Vue Clickaway
app.use(VueClickAway);

// Matomo / Piwik
const { isPiwikPro, siteId, trackerUrl } = env.tracker;
app.use(UniversalPiwik, {
  router,
  isPiwikPro,
  trackerUrl,
  siteId,
  debug: process.env.NODE_ENV === 'development',
  useSuspendFeature: true,
  pageViewOptions: {
    // Set this to true as long as navigating to the /datasets/ route
    // adds a 'minScore' query to prevent duplicated tracking
    useDatasetsMinScoreFix: false,
    // Send empty dataset metadata for every page view
    // See https://gitlab.fokus.fraunhofer.de/piveau/organisation/piveau-scrum-board/-/issues/2098
    beforeTrackPageView: (to, from, tracker) => {
      if (to.name !== 'DatasetDetailsDataset') {
        tracker.trackDatasetDetailsPageView(null, null, {
          dataset_AccessRights: '',
          dataset_AccrualPeriodicity: '',
          dataset_Catalog: '',
          dataset_ID: '',
          dataset_Publisher: '',
          dataset_Title: '',
        });
      }
    },
  },
});

// Cors Proxy and Bulk Download Services
app.use(corsProxyService, env.api.corsproxyApiUrl);
app.use(bulkDownloadCorsProxyService, GLUE_CONFIG, env.api.corsproxyApiUrl);

// Form Kit
app.use(FormKitPlugin, defaultConfig(config));

// Vue Meta
const head = createHead();
app.use(head);

// Vue Progressbar
const progressBarOptions = {
  thickness: '5px',
  autoRevert: false,
  transition: {
    speed: '1.0s',
    opacity: '0.5s',
    termination: 1000,
  },
};
app.use(VueProgressBar, progressBarOptions);

// Vue Position Sticky
app.use(VuePositionSticky);

// Vue Keycloak (Vue App is mounted on success and error)
if (env.authentication.useService) {
  app.use(vueKeyCloak, {
    config: {
      rtp: env.authentication.rtp,
      ...env.authentication.keycloak,
    },
    init: {
      onLoad: 'check-sso',
      ...env.authentication.keycloakInit,
    },
    onReady: () => {
      console.log("Keycloak loaded");
      app.mount('#app');
    },
    onInitError: (error) => {
      console.log("Error loading keycloak");
      console.log(error);
      app.mount('#app');
    }
  });
} else {
  app.mount('#app');
}
