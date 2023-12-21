<template>
  <form @submit.prevent="search()">
    <div class="input-group">
      <div class="input-group-prepend">
        <!-- <input class="form-control" name="term"> -->
        <input class="search-input form-control"
              type="text"
              :placeholder="
                `${selected === 'site'
                  ? $t('message.header.searchInputPlaceholder')
                  : $t('message.header.subnav.search') + ' ' + $t('message.header.searchOptions.datasets') + '...'}`"
              v-model="q"
              aria-label="Search"
        >
      </div>
      <!-- <select class="form-control violet" name="searchdomain" v-model="selected" aria-label="Search filter" role="listbox">
        <option value="site" selected>{{ $t('message.header.searchOptions.siteContent') }}</option>
        <option value="data">{{ $t('message.header.searchOptions.datasets') }}</option>
      </select> -->
      <div class="input-group-append ">
        <button
          ref="searchButton"
          type="submit"
          class="btn btn-search edp-btn edp-btn--primary"
        >
          <span>{{ $t('message.footer.links.search') }}</span>
          <font-awesome-icon :icon="['fas', 'search']" class="edp-icon edp-icon__search" />
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'SearchBar',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      q: '',
      selected: 'site',
    };
  },
  i18n: {
    messages: process.i18n,
  },
  computed: {
    searchPath() {
      return this.selected === 'site'
        ? `/${this.$route.query.locale}/search?term=${this.q}&searchdomain=${this.selected}`
        : `/data/datasets?query=${this.q}&locale=${this.$route.query.locale}`;
    },
  },
  methods: {
    search() {
      window.location.href = this.searchPath;
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>

  .round {
    border-radius: 4px 0px 0px 4px!important;
  }

  .round-right {
    border-radius: 0px 4px 4px 0px!important;
  }

  .violet {
    background-color: #D5D6F7;
  }

  .search-input {
    margin-right: 6px;
    width: 346px;
  }

  .btn-search {
    background-color: #202272;
    border-color: #202272;
    span {
      margin-right: 24px;
    }
  }

  .input-group-append {
    margin-left: 0px !important;
}

</style>
