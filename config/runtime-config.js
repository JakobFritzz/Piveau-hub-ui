/**
 * Configuration template file to bind specific properties from user-config.js to environment variables.
 *
 * This object MUST be structurally identical to the standard user-config.sample.js file.
 * Each value MUST start with the $VUE_APP_ prefix and SHOULD be followed by their path, e.g.
 *
 * api: { baseUrl: '$VUE_APP_API_BASE_URL' }
 *
 * Their corresponding environment variable keys MUST equal that value without the $ character, e.g.
 *
 * VUE_APP_API_BASE_URL: '/base'
 */

export default {
  api: {
    baseUrl: '$VUE_APP_API_BASE_URL',
    hubUrl: '$VUE_APP_API_HUB_URL',
    qualityBaseUrl: '$VUE_APP_API_QUALITY_BASE_URL',
    similarityBaseUrl: '$VUE_APP_API_SIMILARITY_BASE_URL',
    fileUploadUrl: '$VUE_APP_FILEUPLOAD_URL',
    sparqlUrl: '$VUE_APP_SPARQL_URL',
    gazetteerBaseUrl: '$VUE_APP_API_GAZETTEER_BASE_URL',
    catalogBaseUrl: '$VUE_APP_API_CATALOG_BASE_URL',
    vueAppCorsproxyApiUrl: '$VUE_APP_CORSPROXY_API_URL',
  },
  authentication: {
    useService: '$VUE_APP_AUTHENTICATION_USE_SERVICE',
    login: {
      useLogin: '$VUE_APP_AUTHENTICATION_LOGIN_USE_LOGIN',
      loginTitle: '$VUE_APP_AUTHENTICATION_LOGIN_LOGIN_TITLE',
      loginURL: '$VUE_APP_AUTHENTICATION_LOGIN_LOGIN_URL',
      loginRedirectUri: '$VUE_APP_AUTHENTICATION_LOGIN_LOGIN_REDIRECT_URI',
      logoutTitle: '$VUE_APP_AUTHENTICATION_LOGIN_LOGOUT_TITLE',
      logoutURL: '$VUE_APP_AUTHENTICATION_LOGIN_LOGOUT_URL',
      logoutRedirectUri: '$VUE_APP_AUTHENTICATION_LOGIN_LOGOUT_REDIRECT_URI',
    },
    keycloak: {
      realm: '$VUE_APP_AUTHENTICATION_KEYCLOAK_REALM',
      url: '$VUE_APP_AUTHENTICATION_KEYCLOAK_URL',
      'ssl-required': '$VUE_APP_AUTHENTICATION_KEYCLOAK_SSL_REQUIRED',
      clientId: '$VUE_APP_AUTHENTICATION_KEYCLOAK_CLIENT_ID',
      'public-client': '$VUE_APP_AUTHENTICATION_KEYCLOAK_PUBLIC_CLIENT',
      'verify-token-audience': '$VUE_APP_AUTHENTICATION_KEYCLOAK_VERIFY_TOKEN_AUDIENCE',
      'use-resource-role-mappings': '$VUE_APP_AUTHENTICATION_KEYCLOAK_USE_RESOURCE_ROLE_MAPPINGS',
      'confidential-port': '$VUE_APP_AUTHENTICATION_KEYCLOAK_CONFIDENTIAL_PORT'
    },
    keycloakInit: {
      pkceMethod: '$VUE_APP_AUTHENTICATION_KEYCLOAK_INIT_PKCE_METHOD',
    },
    rtp: {
      grand_type: '$VUE_APP_AUTHENTICATION_RTP_GRAND_TYPE',
      audience: '$VUE_APP_AUTHENTICATION_RTP_AUDIENCE'
    },
    authToken: '$VUE_APP_AUTHENTICATION_AUTH_TOKEN',
  },
  routing: {
    routerOptions: {
      base: '$VUE_APP_ROUTING_ROUTER_OPTIONS_BASE',
      mode: '$VUE_APP_ROUTING_ROUTER_OPTIONS_MODE'
    },
    navigation: {
      showSparql: '$VUE_APP_ROUTING_NAVIGATION_SHOW_SPARQL'
    }
  },
  metadata: {
    title: '$VUE_APP_METADATA_TITLE',
    description: '$VUE_APP_METADATA_DESCRIPTION',
    keywords: '$VUE_APP_METADATA_KEYWORDS',
  },
  content: {
    datasets: {
      facets: {
        useDatasetFacetsMap: '$VUE_APP_CONTENT_DATASETS_FACETS_USE_DATASET_FACETS_MAP',
        cutoff: '$VUE_APP_CONTENT_DATASETS_FACETS_CUTOFF',
        showClearButton: '$VUE_APP_CONTENT_DATASETS_FACETS_SHOW_CLEAR_BUTTON',
        showFacetsTitle: '$VUE_APP_CONTENT_DATASETS_FACETS_SHOW_FACETS_TITLE',
        defaultFacetOrder: '$VUE_APP_CONTENT_DATASETS_FACETS_DEFAULT_FACET_ORDER'
      }
    },
    catalogs: {
      facets: {
        useDatasetFacetsMap: '$VUE_APP_CONTENT_CATALOGS_FACETS_USE_DATASET_FACETS_MAP',
        cutoff: '$VUE_APP_CONTENT_CATALOGS_FACETS_CUTOFF',
        showClearButton: '$VUE_APP_CONTENT_CATALOGS_FACETS_SHOW_CLEAR_BUTTON',
        showFacetsTitle: '$VUE_APP_CONTENT_CATALOGS_FACETS_SHOW_FACETS_TITLE',
        defaultFacetOrder: '$VUE_APP_CONTENT_CATALOGS_FACETS_DEFAULT_FACET_ORDER'
      }
    },
    datasetDetails: {
      properties: "$VUE_APP_CONTENT_DATASETDETAILS_PROPERTIES",
      header: {
        navigation: '$VUE_APP_CONTENT_DATASETDETAILS_HEADER_NAVIGATION',
        hidePublisher: '$VUE_APP_CONTENT_DATASETDETAILS_HEADER_HIDE_PUBLISHER',
        hideDate: '$VUE_APP_CONTENT_DATASETDETAILS_HEADER_HIDE_DATE'
      },
      keywords: {
        showTitle: '$VUE_APP_CONTENT_DATASETDETAILS_KEYWORDS_SHOW_TITLE',
        isVisible: '$VUE_APP_CONTENT_DATASETDETAILS_KEYWORDS_IS_VISIBLE',
        collapsed: '$VUE_APP_CONTENT_DATASETDETAILS_KEYWORDS_COLLAPSED'
      },
      description: {
        enableMarkdownInterpretation: '$VUE_APP_CONTENT_DATASETDETAILS_DESCRIPTION_ENABLE_MARKDOWN_INTERPRETATION'
      },
      distributions: {
        displayAll: '$VUE_APP_CONTENT_DATASETDETAILS_DISTRIBUTIONS_DISPLAY_ALL',
        displayCount: '$VUE_APP_CONTENT_DATASETDETAILS_DISTRIBUTIONS_DISPLAY_COUNT',
        incrementSteps: '$VUE_APP_CONTENT_DATASETDETAILS_DISTRIBUTIONS_INCREMENT_STEPS',
        descriptionMaxLines: '$VUE_APP_CONTENT_DATASETDETAILS_DISTRIBUTIONS_DESCRIPTION_MAX_LINES',
        descriptionMaxChars: '$VUE_APP_CONTENT_DATASETDETAILS_DISTRIBUTIONS_DESCRIPTION_MAX_CHARS',
        showValidationButton: '$VUE_APP_CONTENT_DATASETDETAILS_DISTRIBUTIONS_SHOW_VALIDATION_BUTTON',
      },
      pages: {
        isVisible: '$VUE_APP_CONTENT_DATASETDETAILS_PAGES_IS_VISIBLE',
        displayAll: '$VUE_APP_CONTENT_DATASETDETAILS_PAGES_DISPLAY_ALL',
        displayCount: '$VUE_APP_CONTENT_DATASETDETAILS_PAGES_DISPLAY_COUNT',
        incrementSteps: '$VUE_APP_CONTENT_DATASETDETAILS_PAGES_INCREMENT_STEPS',
        descriptionMaxLines: '$VUE_APP_CONTENT_DATASETDETAILS_PAGES_DESCRIPTION_MAX_LINES',
        descriptionMaxChars: '$VUE_APP_CONTENT_DATASETDETAILS_PAGES_DESCRIPTION_MAX_CHARS',
      },
      visualisations: {
        isVisible: '$VUE_APP_CONTENT_DATASETDETAILS_VISUALISATIONS_IS_VISIBLE',
        displayAll: '$VUE_APP_CONTENT_DATASETDETAILS_VISUALISATIONS_DISPLAY_ALL',
        displayCount: '$VUE_APP_CONTENT_DATASETDETAILS_VISUALISATIONS_DISPLAY_COUNT',
        incrementSteps: '$VUE_APP_CONTENT_DATASETDETAILS_VISUALISATIONS_INCREMENT_STEPS',
        descriptionMaxLines: '$VUE_APP_CONTENT_DATASETDETAILS_VISUALISATIONS_DESCRIPTION_MAX_LINES',
        descriptionMaxChars: '$VUE_APP_CONTENT_DATASETDETAILS_VISUALISATIONS_DESCRIPTION_MAX_CHARS',
      },
      bulkDownload: {
        buttonPosition: '$VUE_APP_CONTENT_DATASETDETAILS_BULKDOWNLOAD_BUTTON_POSITION',
        MAX_FILE_TITLE_LENGTH: '$VUE_APP_CONTENT_DATASETDETAILS_BULKDOWNLOAD_MAX_FILE_TITLE_LENGTH',
        MAX_REQUESTS_COUNT: '$VUE_APP_CONTENT_DATASETDETAILS_BULKDOWNLOAD_MAX_REQUESTS_COUNT',
        INTERVAL_MS: '$VUE_APP_CONTENT_DATASETDETAILS_BULKDOWNLOAD_INTERVAL_MS',
        TIMEOUT_MS: '$VUE_APP_CONTENT_DATASETDETAILS_BULKDOWNLOAD_TIMEOUT_MS',
      },
      quality: {
        csvLinter: {
          enable: '$VUE_APP_CONTENT_DATASETDETAILS_QUALITY_CSV_LINTER_ENABLE',
        },
      },
      downloadAs: {
        enable: '$VUE_APP_CONTENT_DATASETDETAILS_DOWNLOAD_AS_ENABLE',
        proxyUrl: '$VUE_APP_CONTENT_DATASETDETAILS_DOWNLOAD_AS_PROXY_URL',
        url: '$VUE_APP_CONTENT_DATASETDETAILS_DOWNLOAD_AS_URL',
        conversionFormats: '$VUE_APP_CONTENT_DATASETDETAILS_DOWNLOAD_AS_CONVERSION_FORMATS',
      }
    },
    maps: {
      useAnimation: '$VUE_APP_CONTENT_MAPS_USE_ANIMATION',
      urlTemplate: '$VUE_APP_CONTENT_MAPS_URL_TEMPLATE',
      options: {
        id: '$VUE_APP_CONTENT_MAPS_OPTIONS_ID',
        accessToken: '$VUE_APP_CONTENT_MAPS_OPTIONS_ACCESS_TOKEN',
        attribution: '$VUE_APP_CONTENT_MAPS_OPTIONS_ATTRIBUTION'
      },
      location: '$VUE_APP_CONTENT_MAPS_LOCATION',
      spatialType: '$VUE_APP_CONTENT_MAPS_SPATIAL_TYPE',
      height: '$VUE_APP_CONTENT_MAPS_HEIGHT',
      width: '$VUE_APP_CONTENT_MAPS_WIDTH',
      mapContainerId: '$VUE_APP_CONTENT_MAPS_MAP_CONTAINER_ID',
      mapStyle: {
        color: '$VUE_APP_CONTENT_MAPS_MAP_STYLE_COLOR',
        fillColor: '$VUE_APP_CONTENT_MAPS_MAP_STYLE_FILL_COLOR',
        fillOpacity: '$VUE_APP_CONTENT_MAPS_MAP_STYLE_FILL_OPACITY',
        weight: '$VUE_APP_CONTENT_MAPS_MAP_STYLE_WEIGHT',
        radius: '$VUE_APP_CONTENT_MAPS_MAP_STYLE_RADIUS',
      },
      sender: {
        startBounds: '$VUE_APP_CONTENT_MAPS_SENDER_START_BOUNDS',
        height: '$VUE_APP_CONTENT_MAPS_SENDER_HEIGHT',
        width: '$VUE_APP_CONTENT_MAPS_SENDER_WIDTH',
        mapContainerId: '$VUE_APP_CONTENT_MAPS_SENDER_MAP_CONTAINER_ID',
      },
      receiver: {
        startBounds: '$VUE_APP_CONTENT_MAPS_RECEIVER_START_BOUNDS',
        height: '$VUE_APP_CONTENT_MAPS_RECEIVER_HEIGHT',
        width: '$VUE_APP_CONTENT_MAPS_RECEIVER_WIDTH',
        mapContainerId: '$VUE_APP_CONTENT_MAPS_RECEIVER_MAP_CONTAINER_ID',
        attributionPosition: '$VUE_APP_CONTENT_MAPS_RECEIVER_ATTRIBUTION_POSITION',
      },
    },
    dataProviderInterface: {
      useService: '$VUE_APP_CONTENT_DATA_PROVIDER_INTERFACE_USE_SERVICE',
      basePath: '$VUE_APP_CONTENT_DATA_PROVIDER_INTERFACE_BASE_PATH',
      annifIntegration: '$VUE_APP_CONTENT_DATA_PROVIDER_INTERFACE_ANNIF_INTEGRATION',
      enableFileUploadReplace: '$VUE_APP_CONTENT_DATA_PROVIDER_INTERFACE_ENABLE_FILE_UPLOAD_REPLACE',
      specification: '$VUE_APP_CONTENT_DATA_PROVIDER_INTERFACE_SPECIFICATION',
      buttons: {
        Dataset: '$VUE_APP_CONTENT_DATA_PROVIDER_INTERFACE_BUTTONS_DATASET',
        Catalogue: '$VUE_APP_CONTENT_DATA_PROVIDER_INTERFACE_BUTTONS_CATALOGUE'
      },
      doiRegistrationService: {
        persistentIdentifierType: '$VUE_APP_CONTENT_DATA_PROVIDER_INTERFACE_DOI_REGISTRATION_SERVICE_PERSISTENT_IDENTIFIER_TYPE',
      },
    },
  },
  languages: {
    useLanguageSelector: '$VUE_APP_LANGUAGES_USE_LANGUAGE_SELECTOR',
    locale: '$VUE_APP_LANGUAGES_LOCALE',
    fallbackLocale: '$VUE_APP_LANGUAGES_FALLBACK_LOCALE'
  },
  tracker: {
    isPiwikPro: '$VUE_APP_TRACKER_IS_PIWIK_PRO',
    siteId: '$VUE_APP_TRACKER_SITE_ID',
    trackerUrl: '$VUE_APP_TRACKER_TRACKER_URL'
  },
}
