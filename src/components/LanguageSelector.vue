<!-- LANGUAGE SELECTOR -->

<template>
  <select class="language-selector form-control" v-model="locale" aria-label="Selected language" role="listbox">
    <option v-for="lang in Object.keys(languages)" :key="lang" :value="lang">
      {{ languages[lang] }}
    </option>
  </select>
</template>

<script>
import isEmpty from 'lodash/isEmpty';

export default {
  name: 'language-selector',
  components: {
  },
  props: {
    initialLocale: {
      type: String,
      default: 'en',
    },
    fallbackLocale: {
      type: String,
      default: 'en',
    },
    languageObject: {
      default: {},
    },
    overrideLocale: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      languages: isEmpty(this.languageObject) ? {
        bg: 'Български (bg)',
        cs: 'čeština (cs)',
        da: 'dansk (da)',
        de: 'Deutsch (de)',
        el: 'Ελληνικά (el)',
        en: 'English (en)',
        es: 'español (es)',
        et: 'eesti (et)',
        fr: 'français (fr)',
        ga: 'Gaeilge (ga)',
        hr: 'Hrvatski (hr)',
        hu: 'Magyar (hu)',
        it: 'italiano (it)',
        lt: 'lietuvių (lt)',
        lv: 'latviešu (lv)',
        mt: 'Malti (mt)',
        nl: 'Nederlands (nl)',
        pl: 'polski (pl)',
        pt: 'português (pt)',
        ro: 'română (ro)',
        sk: 'slovenčina (sk)',
        sl: 'slovenščina (sl)',
        fi: 'suomi (fi)',
        sv: 'svenska (sv)',
      } : this.languageObject,
    };
  },
  computed: {
    locale: {
      get() {
        return this.overrideLocale || this.getLocale() || this.fallbackLocale;
      },
      set(locale) {
        this.$root.$i18n.locale = locale;
        // Wait until router is ready before changing it
        // Necessary when routing to lazy-loaded components
        // Fixes https://gitlab.fokus.fraunhofer.de/viaduct/piveau-ui/piveau-ui/issues/210
        this.$router.onReady(() => {
          if (locale !== this.$route.query.locale) {
            this.$router.push({ query: { ...this.$route.query, locale } });
          }
        });
      },
    },
  },
  methods: {
    initLocale() {
      this.$router.onReady(() => {
        this.locale = this.getLocale();
      });
    },
    getLocale() {
      if (this.$route.query.locale) return this.$route.query.locale;
      // eslint-disable-next-line max-len
      if (navigator && this.languages[navigator?.language.substring(0, 2)]) return navigator.language.substring(0, 2);
      if (this.languages[this.$env.languages.locale]) return this.$env.languages.locale;
      if (this.languages[this.$env.languages.fallbackLocale]) return this.$env.languages.fallbackLocale;
      return Object.keys(this.languages)[0];
    },
  },
  beforeUpdate() {
    this.initLocale();
  },
  mounted() {
    this.initLocale();
  },
};
</script>

<style lang="scss" scoped>
  // @import '../../node_modules/bootstrap/scss/bootstrap.scss';

  .language-selector {
    width: 150px;
    padding-right: 56px !important;
  }

  .form-control {
    height: calc(2.25rem + 2px);
  }
</style>
