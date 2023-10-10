<template>
  <div class="mb-5">
    <nav id="piveau-header" class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" >
      <slot name="logo">
        <a class="navbar-brand" href="/"><Logo class="piveau-logo"/></a>
      </slot>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="d-flex justify-content-between w-100">
          <ul class="navbar-nav">
            <li
              v-for="(navItem, i) in navItems"
              :key="`navItem@${i}`"
              class="nav-item"
            >
              <slot name="nav-item" v-bind:nav-item="navItem">
                <component
                  v-if="navItem.to && navItem.show === true"
                  :is="isNuxt ? 'nuxt-link' : 'router-link'"
                  :to="navItem.to"
                  class="nav-link"
                  active-class="router-link-active"
                >
                  {{ navItem.title }}
                </component>
                <a
                  v-else-if="navItem.show === true"
                  :href="navItem.href"
                  class="nav-link"
                >
                  {{ navItem.title }}
                </a>
              </slot>
            </li>
          </ul>
          <div class="ml-5 flex-row ml-md-auto d-md-flex" role="navigation">
            <slot name="right">
              <ul v-if="enableAuthentication" class="navbar-nav">
                <li
                  class="nav-item"
                >
                  <button class="btn btn-link text-light" @click="$emit(authenticated ? 'logout' : 'login')">
                    <font-awesome-icon icon="user" /> {{ authenticated ? $t('message.header.subnav.logout') : $t('message.header.subnav.login') }}
                  </button>
                </li>
              </ul>
              <!-- Language box -->
              <div
                  v-if="useLanguageSelector"
              >
                <div class="input-group">
                  <language-selector :languageObject="languageObject" :override-locale="overrideLocale"></language-selector>
                </div>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Logo from './Logo.vue';
import LanguageSelector from './LanguageSelector.vue';

export default {
  name: 'Piveau-Header',
  data() {
    return {
      isNuxt: false,
    };
  },
  components: {
    Logo,
    LanguageSelector,
    FontAwesomeIcon,
  },
  props: {
    project: {
      type: String,
      default: 'hub',
    },
    locale: {
      type: String,
      default: 'en',
    },
    useLanguageSelector: {
      type: Boolean,
      default: true,
    },
    navItemsHook: {
      type: Function,
      default: (navItems) => navItems,
    },
    showDatasets: {
      type: Boolean,
      default: true,
    },
    showCatalogues: {
      type: Boolean,
      default: true,
    },
    showSparql: {
      type: Boolean,
      default: false,
    },
    showMetadataQuality: {
      type: Boolean,
      default: true,
    },
    hrefDatasets: {
      type: String,
      default: undefined,
    },
    hrefCatalogues: {
      type: String,
      default: undefined,
    },
    hrefSparql: {
      type: String,
      default: undefined,
    },
    hrefMetadataQuality: {
      type: String,
      default: undefined,
    },
    languageObject: {
      type: Array,
      default() {
        return []
      }
    },
    headerBackground: {
      default: 'linear-gradient(0deg, rgba(0,154,165,1) 0%, rgba(26,52,113,1) 100%)',
    },
    overrideLocale: {
      type: String,
      default: '',
    },
    enableAuthentication: {
      type: Boolean,
      default: false,
    },
    authenticated: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    navItems() {
      const navItems = [
        /** ToDo add route to landing? Add/change weblate translation */
        {
          title: this.$t('message.header.navigation.data.datasets'),
          href: this.hrefDatasets || `/data/datasets?locale=${this.$route.query.locale}`,
          show: this.showDatasets,
        },
        {
          title: this.$t('message.header.navigation.data.catalogs'),
          href: this.hrefCatalogues || `/data/catalogues?locale=${this.$route.query.locale}`,
          show: this.showCatalogues,
        },
        {
          title: this.$t('message.header.navigation.data.sparqlsearch'),
          href: this.hrefSparql || '/sparql',
          show: this.showSparql,
        },
        /* {
          title: this.$t('message.header.navigation.data.metadataquality'),
          href: this.hrefMetadataQuality || `/mqa?locale=${this.$route.query.locale}`,
          show: this.showMetadataQuality,
        }, */
      ];

      this.adjustNavItemsToProject(navItems, this.project);

      return this.navItemsHook(navItems);
    },
  },
  created() {
    // Check if we are in Nuxt by checking nuxt-only properties in vm
    // https://nuxtjs.org/docs/concepts/context-helpers/#nuxt-the-nuxt-helper
    this.isNuxt = !!this.$nuxt;
  },
  methods: {
    adjustNavItemsToProject(navItems, project) {
      const navigationItems = navItems;
      switch (project) {
        case 'hub':
          if (!this.hrefDatasets) {
            navigationItems[0].to = { name: 'Datasets', query: { locale: this.$route.query.locale } };
          }
          if (!this.hrefCatalogues) {
            navigationItems[1].to = { name: 'Catalogues', query: { locale: this.$route.query.locale } };
          }
          if (!this.hrefSparql) {
            navigationItems[2].to = { name: 'SparqlEdit', query: { locale: this.$route.query.locale } };
          }
          break;
        case 'metrics':
          if (!this.hrefMetadataQuality) {
            navigationItems[3].to = { name: 'Dashboard', query: { locale: this.$route.query.locale } };
          }
          break;
        default:
          break;
      }
    },
  },
};

</script>

<style lang="scss" scoped>
  // @import '../styles/_variables.scss';
  @import '../styles/custom_theme.scss';

  .navbar {
    background: $primary;
  }

  #piveau-header{
    position: relative;
  }

  .piveau-logo{
    max-height: 55px;
    width: auto;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .nav-link {
    color: rgba(250, 250, 250, 0.5) !important;

    &:hover {
      color: rgba(250, 250, 250, 0.75) !important;
    }
  }

  .router-link-active {
    color: rgba(250, 250, 250, 0.9) !important;
    font-size: 1rem;

    &:hover {
      color: rgba(250, 250, 250, 0.9) !important;
    }
  }
</style>
