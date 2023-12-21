// @ts-nocheck

// Import IE Promise polyfill
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// import '@babel/polyfill';
import 'es6-promise/auto';
import $ from 'jquery';
import { sync } from 'vuex-router-sync';
import VueProgressBar from 'vue-progressbar';
import VueI18n from 'vue-i18n';
import VueFormulate from '@braid/vue-formulate';
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Meta from 'vue-meta';
import injector from 'vue-inject';
import VeeValidate from 'vee-validate';


import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome, faChevronDown, faBars, faTimes, faSearch, faExternalLinkAlt, faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
  faComments,
} from '@fortawesome/free-regular-svg-icons';
import {
  faFacebook, faTwitter, faYoutube,
  faFacebookSquare, faTwitterSquare, faLinkedin, faYoutubeSquare,
} from '@fortawesome/free-brands-svg-icons';

library.add([
  faHome, faChevronDown, faBars, faTimes, faSearch, faExternalLinkAlt, faComments, faUser,
  faFacebook, faTwitter, faYoutube,
  faFacebookSquare, faTwitterSquare, faLinkedin, faYoutubeSquare,
]);


import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

import UniversalPiwik from '@piveau/piveau-universal-piwik';
// import AppToast from '@/components/AppToast';
// Import v-select
// Import i18n validation messages for vueformulate
// import {
// ca, cs, da, nl, de, en, fr, hu, it, lt, nb, pl, pt, ru, sr, sk, es, tr, sv,
// } from '@braid/vue-formulate-i18n';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGoogle,
  faGooglePlus,
  faGooglePlusG,
  faFacebook,
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import {
  faComment,
  faExternalLinkAlt,
  faPlus,
  faMinus,
  faArrowDown,
  faArrowUp,
  faInfoCircle,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VuePositionSticky from 'vue-position-sticky';
// Import main user configurations (glueConfig) and i18n configurations
import { glueConfig as GLUE_CONFIG, i18n as I18N_CONFIG } from '../config/user-config';
import runtimeConfig from '../config/runtime-config';
import router from './router';
import App from './App';

import vueKeyCloak from "./services/keycloakService"

import {
  dateFilters,
  AppSnackbar,
  AppConfirmationDialog,
  // VueKeyCloak,
  bulkDownloadCorsProxyService ,
  corsProxyService,
  runtimeConfigurationService,
  store,
  InfoSlot,
  ConditionalInput,
  AutocompleteInput,
  CustomNumber,
  CustomURL,
  UniqueIdentifierInput,
  FileUpload,
  DatePicker,
  DateTimePicker,
  configureModules,
  SelectedFacetsOverview
} from '@piveau/piveau-hub-ui-modules';
import '@piveau/piveau-hub-ui-modules/styles';

Vue.config.devtools = true;

Vue.use(runtimeConfigurationService, runtimeConfig, { baseConfig: GLUE_CONFIG, debug: false });
const env = Vue.prototype.$env;

configureModules({
  services: GLUE_CONFIG.services,
  serviceParams: {
    baseUrl: env.api.baseUrl,
    qualityBaseUrl: env.api.qualityBaseUrl,
    similarityBaseUrl: env.api.similarityBaseUrl,
    similarityEndpoint: env.api.similarityEndpoint,
    gazetteerBaseUrl: env.api.gazetteerBaseUrl,
    hubUrl: env.api.hubUrl,
    keycloak: env.authentication.keycloak,
    rtp: env.authentication.rtp,
    useAuthService: env.authentication.useService,
    authToken: env.authentication.authToken,
    defaultScoringFacets: env.content.datasets.facets.scoringFacets.defaultScoringFacets,
  }
});


Vue.component('piveau-header', Header);
Vue.component('piveau-footer', Footer);

Vue.component('InfoSlot', InfoSlot);
Vue.component('ConditionalInput', ConditionalInput);
Vue.component('AutocompleteInput', AutocompleteInput);
Vue.component('UniqueIdentifierInput', UniqueIdentifierInput);
Vue.component('FileUpload', FileUpload);
Vue.component('DatePicker', DatePicker);
Vue.component('DateTimePicker', DateTimePicker);
Vue.component('CustomNumber', CustomNumber);
Vue.component('CustomURL', CustomURL)

// Vue.component('AppToast', AppToast);
Vue.component('AppSnackbar', AppSnackbar);
Vue.component('AppConfirmationDialog', AppConfirmationDialog);

// DEU Redesign Components
Vue.component('SelectedFacetsOverview', SelectedFacetsOverview);

// eslint-disable-next-line @typescript-eslint/no-var-requires
import VueCookie from 'vue-cookie';

Vue.use(VueCookie);

Vue.use(VueFormulate, {
  // plugins: [ca, cs, da, nl, de, en, fr, hu, it, lt, nb, pl, pt, ru, sr, sk, es, tr, sv],
  validationNameStrategy: vm => vm.context.label,
  // Define our custom slot component(s)
  slotComponents: {
    label: 'InfoSlot',
  },
  // Define any props we want to pass to our slot component
  slotProps: {
    label: ['info', 'collapsed'],
  },
  components: {
    ConditionalInput,
  },
  library: {
    fileupload: {
      classification: 'text',
      component: 'FileUpload',
    },
    'conditional-input': {
      classification: 'text',
      component: 'ConditionalInput',
      slotProps: {
        component: ['data'],
      },
    },
    'autocomplete-input': {
      classification: 'text',
      component: 'AutocompleteInput',
      slotProps: {
        component: ['voc', 'multiple'],
      },
    },
    'custom-url': {
      classification: 'text',
      component: 'CustomURL',
      slotProps: {
        component: ['context'],
      },
    },
    'custom-number': {
      classification: 'text',
      component: 'CustomNumber',
      slotProps: {
        component: ['context'],
      },
    },
    'unique-identifier-input': {
      classification: 'text',
      component: 'UniqueIdentifierInput',
    },
    'date-picker': {
      classification: 'date',
      component: 'DatePicker',
    },
    'datetime-picker': {
      classification: 'datetime-local',
      component: 'DateTimePicker',
    },
  },
});

Vue.use(corsProxyService, env.api.vueAppCorsproxyApiUrl);

Vue.use(bulkDownloadCorsProxyService, GLUE_CONFIG, env.api.vueAppCorsproxyApiUrl);

const { isPiwikPro, siteId, trackerUrl } = env.tracker;
Vue.use(UniversalPiwik, {
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


// Configured language
const LOCALE = env.languages.locale;
const FALLBACKLOCALE = env.languages.fallbackLocale;

Vue.use(VueI18n);
// eslint-disable-next-line
export const i18n = new VueI18n({
  locale: LOCALE,
  fallbackLocale: FALLBACKLOCALE,
  messages: I18N_CONFIG,
  silentTranslationWarn: true,
});

// Make i18n globally available
Vue.i18n = i18n;

// Set locale for dateFilters
dateFilters.setLocale(LOCALE);

// Vue-meta setup
Vue.use(Meta, {
  refreshOnceOnNavigation: true,
  debounceWait: 100,
});

// Bootstrap requirements to use js-features of bs-components
import 'popper.js';

import 'bootstrap';

import './styles/styles.scss';


$(() => {
  $('[data-toggle="popover"]').popover({ container: 'body' });
  $('[data-toggle="tooltip"]').tooltip({ container: 'body' });
});

import '@fortawesome/fontawesome-free/css/all.css';

// OpenStreetMaps popup styles
import 'leaflet/dist/leaflet.css';

import '@piveau/dcatap-frontend/dist/dcatap-frontend.css';

// Vue-progressbar setup
const progressBarOptions = {
  thickness: '5px',
  autoRevert: false,
  transition: {
    speed: '1.0s',
    opacity: '0.5s',
    termination: 1000,
  },
};
Vue.use(VueProgressBar, progressBarOptions);

// Vee-validate (form validation) setup
Vue.use(VeeValidate, { errorBagName: 'vee_validator_errors' });

// Vue-inject setup
Vue.use(injector, { components: true });

// Vue.use(PiveauHeaderFooter);

Vue.use(VuePositionSticky);

// Sync store and router
sync(store, router);

// Add Font Awesome Icons
library.add(faGoogle, faGooglePlus, faGooglePlusG, faFacebook, faFacebookF, faInstagram, faTwitter, faLinkedinIn, faComment, faExternalLinkAlt, faPlus, faMinus, faArrowDown, faArrowUp, faInfoCircle, faExclamationTriangle);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

// Creates the root Vue instance
const createVueApp = () => {
  const app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
  });

  return app;
};

// Loads keycloak and if it fails it still loads the Vue app.

if (env.authentication.useService) {
  Vue.use(vueKeyCloak, {
    config: {
      rtp: env.authentication.rtp,
      ...env.authentication.keycloak,
    },
    init: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      ...env.authentication.keycloakInit,
    },
    onReady: () => {
      console.log("Keycloak loaded")
      createVueApp().$mount('#app');
    },
    onInitError: () => {
      console.log("Error loading keycloak")
      createVueApp().$mount('#app');
    }
  });
} else {
  createVueApp().$mount('#app');
}
