<template>
  <div class="app">
    <div class="app-snackbar position-fixed fixed-bottom m-3 m-md-5 py-5 d-flex justify-content-center w-100">
      <app-snackbar />
    </div>
    <!-- <cookie-consent :piwik-instance="$piwik" /> -->
    <vue-progress-bar />
    <div class="site-wrapper">
      <piveau-header
        :show-catalogues="true"
        :show-metadata-quality="false"
        :enable-authentication="authEnabled"
        :authenticated="isAuthenticated"
        @login="login"
        @logout="logout"
      />

      <router-view
          class="content"
          :key="`${$route.fullPath}`"
      />
      <piveau-footer
        :enable-authentication="authEnabled"
        :authenticated="isAuthenticated"
        @login="login"
        @logout="logout"
      >
      </piveau-footer>
      <!-- <div class="bg-primary text-light p-3">
        Put a footer here. Made with <span class="text-danger">♥</span> by <a href="https://www.piveau.eu" class="text-light">piveau</a>.
      </div> -->
    </div>
    <dpi-menu v-if="isAuthenticated"></dpi-menu>
  </div>

</template>

<script>
/* eslint-disable no-underscore-dangle */
import { mapGetters, mapActions } from 'vuex';
import { isNumber } from 'lodash';
// import CookieConsent from '@deu/deu-cookie-consent';
// import '@deu/deu-cookie-consent/dist/deu-cookie-consent.css';
import {
  DpiMenu,
  usePiwikSuspendFilter,
} from '@piveau/piveau-hub-ui-modules';

export default {
  name: 'app',
  components: {
    // CookieConsent,
    DpiMenu,
  },
  mixins: [
    usePiwikSuspendFilter,
  ],
  metaInfo() {
    return {
      titleTemplate(chunk) {
        return chunk ? `${chunk} - ${this.$env.metadata.title}` : this.$env.metadata.title;
      },
      meta: [
        { name: 'description', vmid: 'description', content: this.$env.metadata.description },
        { name: 'keywords', vmid: 'keywords', content: this.$env.metadata.keywords },
      ],
      htmlAttrs: {
        lang: this.$route.query.locale,
      },
    };
  },
  data() {
    return {
      tracker: null,
      matomoURL: this.$env.tracker.trackerUrl,
      piwikId: this.$env.tracker.siteId,
      lastRoute: null,
      keycloak: this.$keycloak,
      showSparql: this.$env.routing.navigation.showSparql,
    };
  },
  computed: {
    ...mapGetters('auth', [
      'securityAuth',
      'getRTPToken',
      'getKeycloak',
    ]),
    authEnabled() {
      return this.$env?.authentication?.useService && this.$env.authentication?.login?.useLogin;
    },
    isAuthenticated() {
      return this.authEnabled && this.keycloak?.authenticated;
    }
  },
  methods: {
    ...mapActions('auth', [
      'authLogin',
      'authLogout',
      'rtpToken',
      'setKeycloak',
    ]),
    resume() {
      if (typeof this.$piwik?.resume === "function") this.$piwik.resume();
    },
    isNumber,
    login() {
      this.$keycloak.loginFn();
    },
    logout() {
      this.$keycloak.logoutFn();
    },
    handleFollowClick(url) {
      if (typeof this.$piwik?.resume === "function") this.$piwik.trackOutlink(url);
    },
  },
};
</script>

<style lang="scss">
// Normalizes default css rules. See: https://github.com/necolas/normalize.css
@import './styles/utils/normalize.css';

// @font-face {
//   font-family: "Ubuntu";
//   src: local("Ubuntu"), url(../public/static/fonts/Ubuntu/Ubuntu-Regular.ttf) format("truetype");
// }

// Hides 'editorial content' tab.
// todo: remove this when it is configurable in modules.
#myTab > div.d-flex.cursor-pointer > li:nth-child(3) > a {
  display: none;
}

* {
  box-sizing: border-box;
}

.site-wrapper header {
  display: initial;
}

.container-fluid {
  max-width: 1340px !important;
}
</style>

<style lang="scss" scoped>

.app {
  background-color: #fff;
}

.site-wrapper {
  border: 0;
  max-width: none;
  box-shadow: none;
  display: initial;

  .content {
    padding: 30px 30px 0 30px;
    margin-top: 15px;
    margin-bottom: 15px;
    background-color: white;
  }
}

.app-snackbar {
  z-index: 9999;
  pointer-events: none;
}
</style>
