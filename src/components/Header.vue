<template>
  <div class="mb-5">
    <nav id="piveau-header" class="navbar navbar-expand-lg bg-primary fixed-top" >
      <slot name="logo">
        <a class="navbar-brand" href="https://ki-allianz.de/"><Logo class="piveau-logo"/></a>
      </slot>
      <button class="navbar-toggler 1px" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="d-flex justify-content-end w-100">
          <ul class="navbar-nav">
            <li
              v-for="(navItem, i) in navItems"
              :key="`navItem@${i}`"
              class="nav-item nav-container"
            >
              <slot name="nav-item" v-bind:nav-item="navItem">
                <component
                  v-if="navItem.to && navItem.show === true"
                  :is="isNuxt ? 'nuxt-link' : 'router-link'"
                  :to="navItem.to"
                  class="nav-link nav-link-overwrite"
                  active-class="router-link-active"
                >
                  {{ navItem.title }}
                </component>
                <a
                  v-else-if="navItem.show === true"
                  :href="navItem.href"
                  class="nav-link nav-link-overwrite"
                >
                  {{ navItem.title }}
                </a>
              </slot>
            </li>
          </ul>
          <!--
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
            </slot>
          </div>
          -->
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
        {
          title: "Events",
          href: "https://ki-allianz.de/events/",
          show: true,
        },
        {
          title: "Magazin",
          href: "https://ki-allianz.de/magazin/",
          show: true,
        },
        {
          title: "Newsletter",
          href: "https://ki-allianz.de/newsletter/",
          show: true,
        },
        {
          title: "Presse",
          href: "https://ki-allianz.de/presse/",
          show: true,
        },
        {
          title: "Kontakt",
          href: "https://ki-allianz.de/kontakt/",
          show: true,
        }
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
    background: #ffffff !important; // Weißer Hintergrund für die Navbar
    //background: gray !important;
    //box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Schatten für leichte Hervorhebung
    border-radius: 16px;
    padding-left: 3.75rem;
    padding-right: 2.3rem;

    max-width: 1440px;
    margin: 0 auto;
    height: 80px;
  }


  #navbarNav {
    flex-direction: row;
    align-items: flex-end;
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba%280, 0, 0, 0.5%29' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
  }

  #piveau-header{
    position: relative;
  }

  .piveau-logo{
    max-height: 48px;
    width: auto;
  }

  .mb-5, .my-5{
    margin-top: 1rem !important;
    margin-left: 1rem !important;
    margin-right: 1rem !important;
  }

  .nav-container {
    height: 48px;
  }

  .nav-item {
    color: black;
  }

  .nav-link {
    color: black;
    font-weight: 700;
    font-size: 1.1rem;
    transition: 0.3s padding-bottom ease;
    padding-bottom: 3px;
    border-right: 0 solid black;

    border-bottom: 2px solid black;

    &:hover {
      color: #000AFA !important;
      border-bottom-color: #000AFA;
      padding-bottom: 5px;
      border-bottom-width: 3px;
    }
  }

  .router-link-active {
    color: #000AFA !important;

    border-bottom-color: #000AFA;
    border-bottom-width: 3px;
  }

  .nav-link-overwrite {
    padding-top: 4px !important;
    padding-left: 0 !important;
    padding-right: 0 !important;

    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
</style>
