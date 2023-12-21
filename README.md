![banner](./images/piveau-hub-ui-banner.png "Image Title")

# piveau-hub-ui

> Please use node version >= 16. Recommended is version 17.x.

Vanilla piveau-hub-ui uses the piveau-hub-ui-modules as a dependency.
This repository is intended as a template for setting up a new project UI.

## Project setup

### Download the repository

```bash
git clone https://gitlab.fokus.fraunhofer.de/piveau/hub/piveau-hub-ui.git
```

### Install the dependencies

```bash
cd piveau-hub-ui
npm ci
```

### Create User configuration file
Make sure you have a configuration file named `user-config.js` in the config folder.
To start with, you can make a copy of `user-config.sample.js` and rename it to `user-config.js`.

### Start the app locally
```
npm run serve
```

### Build for production
```
npm run build
```

### Run it via Docker

```
$ docker build -t piveau-hub-ui .
$ docker run -i -p 8080:8080 piveau-hub-ui
```

## Configurations

**Note:** _Just like the default configuration, Runtime configurations (or environment variables) will be loaded client-side. Therefore, it is recommended that you <ins>**SHOULD NOT**</ins> store sensitive information like passwords or tokens in environment variables. The Runtime configuration file <ins>**MUST**</ins> be structurally identical to the standard `user-config.js` file. Each value <ins>**MUST**</ins> start with the `$VUE_APP_` prefix and <ins>**SHOULD**</ins> be followed by its path. Their corresponding environment variable keys <ins>**MUST**</ins> equal that value without the `$` sign. Environment variables created by the Runtime configuration will always override the corresponding User configuration from `user-config.js` when used correctly!_

_Runtime Configurations are only applied, when running the application via [Docker](#run-it-via-docker)._




<br>

### User configurations
The User configuration file is located at `config/user-config.js` by default. It is the main project configuration file. The following table shortly describes the configurable values.

<details>

<summary>User Configuration description</summary>

<br>

# api

This property contains information about base URLs and APIs used in piveau-hub-ui.



#### baseUrl
URL to the Hub-Search API (default: `https://data.europa.eu/api/hub/search/`).


#### hubUrl
URL to the Hub-Repo API (default: `https://data.europa.eu/api/hub/repo/`).


#### qualityBaseUrl
URL to the MQA Cache API (default: `https://data.europa.eu/api/mqa/cache/`).


#### similarityBaseUrl
URL to the Similarity API (default: `https://data.europa.eu/api/similarities/`).


#### fileUploadUrl
URL to the Hub-Store API (default: `https://data.europa.eu/api/hub/store/`).


#### sparqlUrl
SPARQL Base URL (default: `https://data.europa.eu/sparql`).


#### gazetteerBaseUrl
URL to the Hub-Search Gazetteer API (default: `https://data.europa.eu/api/hub/search/gazetteer/`).


#### catalogBaseUrl
Catalog Base URL (default: `https://europeandataportal.eu/`).


#### vueAppCorsproxyApiUrl
URL to the CORS Proxy API (default: `https://piveau-corsproxy-piveau.apps.osc.fokus.fraunhofer.de`).


<br><br>


# authentication

This property contains information about authentication (Login / Logout, Keycloak) used in piveau-hub-ui.



#### useService
Enables the authentication service (default: `true`).


## login
Login / Logout configuration values

| Property          | Description        |  
| --------          | ------------------ |
| useLogin          | Enables the login (buttons) (default: `true`). |  
| loginTitle        | Title of the login button (default: `Login`).                                                                         |  
| loginURL          | Relative URL to login page (default: `/login`).                                                                         |
| loginRedirectUri  | Redirect URI used after successful login (default: `/`).                                                           |
| logoutTitle       | Title of the logout button (default: `Logout`).                                                                         |
| logoutURL         | Title of the logout button (default: `/logout`).                                                                         |
| logoutRedirectUri | Redirect URI used after successful logout (default: `/`).                                                          |


## keycloak
Keycloak configuration values (Realm, ClientID, URL, ...)

| Property                    | Description        |  
| --------                    | ------------------ |
| realm                       | The Keycloak realm (default: `piveau`).        |  
| clientId                    | The Keycloak clientID (default: `piveau-hub-ui`).     |  
| url                         | The Keycloak URL (default: `https://keycloak-piveau.apps.osc.fokus.fraunhofer.de/auth`).          |
| ssl-required                | ???                    |
| public-client               | ???                    |
| verify-token-audience       | ???                    |
| use-resource-role-mappings  | ???                    |
| confidential-port           | ???                    |

## keycloakInit
Keycloak initialization values (Realm, ClientID, URL, ...)

| Property                    | Description        |  
| --------                    | ------------------ |
| pkceMethod                  | To activate PKCE set this variable to 'S256'          |

## rtp
RTP default values

| Property                    | Description        |  
| --------                    | ------------------ |
| grand_type                  | ???                |  
| audience                    | ???                |  


#### authToken
Keycloak Authentication Token


<br><br>


# routing

This property contains information about authentication (Login / Logout, Keycloak) used in piveau-hub-ui.

## routerOptions
Vue Router configuration values

| Property                    | Description        |  
| --------                    | ------------------ |
| base                    | Base path of the application (default: `/`).                |  
| mode                    | Routing mode of the application (default: `history`).                |


## navigation
Navigation configuration values

| Property                    | Description        |  
| --------                    | ------------------ |
| showSparql                    | Enables the link to the SPARQL page (default: `true`).           |  


## pagination
Pagination configuration values

| Property                    | Description        |  
| --------                    | ------------------ |
| usePagination               | Enables the pagination (default: `true`).          |  
| usePaginationArrows               | Enables the pagination arrows for `previous` and `next` page (default: `true`).          |  
| useItemsPerPage               | Enables the items per page dropdown (default: `true`).          |  
| defaultItemsPerPage               | Default amount of items shown on one page (default: `10`).           |  
| defaultItemsPerPageOptions               | Default options for items per page dropdown (default: `[5, 10, 25, 50]`).           |  


<br><br>


# metadata

This property contains information about metadata used in piveau-hub-ui.

#### title
Title of the application (default: `piveau Hub-UI`).  

#### description
Description of the application (default: `A modern and customizable web application for data management of extensive data catalogs.`).  

#### keywords
Keywords describing the application (default: `Open Data`).  


<br><br>


# content

This property contains information about the content of views that are available in piveau-hub-ui.


## datasets
Contains configuration values that are used on the `Datasets` page.

| Property                    | Description        |  
| --------                    | ------------------ |
| useSort               | Enables the sort (default: `true`).          |
| useFeed               | Enables the RSS feed (default: `true`).          |
| useCatalogs               | Enables the usage of catalogs (default: `true`).          |
| followKeywordLinks               | Meta tag to indicate, whether search engines should crawl for subsequent links or not (default: `nofollow`).          |
| maxKeywordLength               | Maximum length of a keyword. Keywords that exceed this length will be truncated (default: `15`).       |
| facets               | _see table below_        |

#### datasets.facets

| Property                    | Description        |  
| --------                    | ------------------ |
| useDatasetFacets               | Enables the usage of dataset facets (default: `true`).           |
| useDatasetFacetsMap               | Enables the usage of dataset facets map (default: `true`).           |
| showClearButton               | Enables the facet clear button (default: `false`).          |
| showFacetsTitle               | Show title on top of the facets (default: `false`).           |
| cutoff               | Maximum amount o f available facets to be shown. Facets that exceed this amountwill be hidden (default: `5`).       |
| MIN_FACET_LIMIT               | The minimum amount of dataset facet items to be visible if collapsed (default: `10`).          |
| MAX_FACET_LIMIT               | The maximum amount of dataset facet items to be visible, overflowing facets will not be shown!!! (default: `50`).          |
| FACET_OPERATORS               | The facet operators of the dataset facets (default: `Object.freeze({ or: 'OR', and: 'AND' })`).          |
| FACET_GROUP_OPERATORS               | The facet group operators of the dataset facets (default: `Object.freeze({ or: 'OR', and: 'AND' })`).          |
| defaultFacetOrder               | The default order of the facets (default: `['publisher', 'format', 'catalog', 'categories', 'keywords', 'dataScope', 'country', 'dataServices', 'scoring', 'license']`).          |
| scoringFacets               |  _see table below_         |

#### datasets.facets.scoringFacets

| Property                    | Description        |  
| --------                    | ------------------ |
| useScoringFacets               | Enables the scoring facets (default: `true`).           |
| defaultScoringFacets               | The default scoring facets.           |
| defaultScoringFacets.excellentScoring               | The default values for the `Excellent` scoring facet (351 - 405).           |
| defaultScoringFacets.goodScoring               | The default values for the `Good` scoring facet (221 - 350).           |
| defaultScoringFacets.sufficientScoring               | The default values for the `Sufficient` scoring facet (121 - 220).           |
| defaultScoringFacets.badScoring               | The default values for the `Any` scoring facet (0 - 120).           |


## catalogs
Contains configuration values that are used on the `Catalogues` page.

| Property                    | Description        |  
| --------                    | ------------------ |
| useSort               | Enables the sort (default: `true`).          |
| useCatalogCountries               | Use this option to achieve a more generic catalog page. If set to `true`, catalogs will be based on countries and therefore look for a "catalog.country.id" value to compute, which country flag to be used. If set to `false`, catalogs will not be based on countries and therefore look for a "catalog.id" value to compute, which catalog image to be used (default: `true`).     |
| defaultCatalogImagePath               |  Set the default path to the catalog images (ROOT = "/src/assets/img"). If `useCatalogCountries` is set to `true`, this value should be equal to `/flags`. If `useCatalogCountries` is set to `false`, this value can be either an empty string to indicate, that the catalog images can be found inside `/src/assets/img` or any directory name inside `/src/assets/img` (starting with a `/`) (default: `/flags`).     |
| defaultCatalogCountryID               | Set the default `catalog.country.id` of a catalog if not available, only applicable if `useCatalogCountries` is set to `true`. Country flags can be stored inside the `/flags` directory like `/src/assets/img/flags/<catalog.country.id>.png` with their filenames being equal to their `catalog.country.id` (default: `eu`).              |
| defaultCatalogID               | Set the default `catalog.id` of a catalog if not available, only applicable if `useCatalogCountries` is set to `false`. Catalog images can be stored inside any directory in `/src/assets/img/` like `/src/assets/img/catalogs/<catalog.id>.png` with their filenames being equal to their `catalog.id` (default: `european-union-open-data-portal`).             |
| facets               | _see table below_        |

#### catalogs.facets

| Property                    | Description        |  
| --------                    | ------------------ |
| useCatalogFacets               | Enables the usage of catalog facets (default: `true`).           |
| showClearButton               | Enables the facet clear button (default: `false`).          |
| showFacetsTitle               | Show title on top of the facets (default: `false`).           |
| cutoff               | Maximum amount of available facets to be shown. Facets that exceed this amount will be hidden (default: `5`).       |
| MIN_FACET_LIMIT               | The minimum amount of catalog facet items to be visible if collapsed (default: `50`).          |
| MAX_FACET_LIMIT               | The maximum amount of catalog facet items to be visible, overflowing facets will not be shown!!! (default: `100`).          |
| FACET_OPERATORS               | The facet operators of the catalog facets (default: `Object.freeze({ or: 'OR', and: 'AND' })`).          |
| FACET_GROUP_OPERATORS               | The facet group operators of the catalog facets (default: `Object.freeze({ or: 'OR', and: 'AND' })`).          |
| defaultFacetOrder               | The default order of the facets (default: `['country']`).          |


## datasetDetails
Contains configuration values that are used on the `DatasetDetails` page.

| Property                    | Description        |  
| --------                    | ------------------ |
| header               | _see table below_        |
| keywords               | _see table below_        |
| description               | _see table below_        |
| distributions               | _see table below_        |
| downloadAs               | _see table below_        |
| similarDatasets               | _see table below_        |
| pages               | _see table below_        |
| visualisations               | _see table below_        |
| dataServices               | _see table below_        |
| isUsedBy               | _see table below_        |
| relatedResources               | _see table below_        |
| bulkDownload               | _see table below_        |
| quality               | _see table below_        |

#### datasetDetails.header

| Property                    | Description        |  
| --------                    | ------------------ |
| navigation               | Position of the dataset details navigation toolbar (default: `top`).           |
| hidePublisher               | Hides the dataset details publisher value (default: `false`).           |
| hideDate               | Hides the dataset details date (default: `false`).         |

#### datasetDetails.keywords

| Property                    | Description        |  
| --------                    | ------------------ |
| showTitle               | Enables the usage of keyword titles (default: `false`).         |
| isVisible               | Shows or hides the keywords section (default: `true`).         |
| collapsed               | Collapses the keywords in the dataset detail view (default: `false`).         |

#### datasetDetails.description

| Property                    | Description        |  
| --------                    | ------------------ |
| enableMarkdownInterpretation               | Enables the interpretation of markdown in the dataset details description (default: `false`).      |

#### datasetDetails.distributions

| Property                    | Description        |  
| --------                    | ------------------ |
| displayAll                  | Display all distributions (default: `false`).             |
| displayCount                  | Amount of visible distributions (default: `7`).             |
| incrementSteps                  | Increment step options, if `displayAll` is set to false (default: `[10, 50]`).             |
| descriptionMaxLines                  | Maximum amount of lines in a description. Descriptions that exceed this amount will be truncated (default: `3`). |
| descriptionMaxChars                  | Maximum length of a description. Descriptions that exceed this length will be truncated (default: `250`).          |
| showValidationButton                  | Enables the distribution validation button (default: `false`).             |

#### datasetDetails.downloadAs

| Property                    | Description        |  
| --------                    | ------------------ |
| enable               | Enables the Download as feature (default: `false`).             |
| proxyUrl               | URL to Corsproxy service (default: `https://piveau-corsproxy-piveau.apps.osc.fokus.fraunhofer.de`).             |
| url               | URL to Conversion service (default: `https://piveau-fifoc-piveau.apps.osc.fokus.fraunhofer.de/v1/convert`).             |
| conversionFormats               | List of possible conversion formats for each source file format.             |

#### datasetDetails.similarDatasets

| Property                    | Description        |  
| --------                    | ------------------ |
| breakpoints.verySimilar               | Breakpoint for Very Similar rating (0 - 20).             |
| breakpoints.similar               | Breakpoint for Very Similar rating (20 - 25).             |
| breakpoints.lessSimilar               | Breakpoint for Very Similar rating (25 - 35).             |

#### datasetDetails.pages

| Property                    | Description        |  
| --------                    | ------------------ |
| isVisible                  | Show the dataset details pages section (default: `false`).             |
| displayAll                  | Display all pages (default: `false`).             |
| displayCount                  | Amount of visible pages (default: `7`).             |
| incrementSteps                  | Increment step options, if `displayAll` is set to false (default: `[10, 50]`).             |
| descriptionMaxLines                  | Maximum amount of lines in a description. Descriptions that exceed this amount will be truncated (default: `3`). |
| descriptionMaxChars                  | Maximum length of a description. Descriptions that exceed this length will be truncated (default: `250`).          |

#### datasetDetails.visualisations

| Property                    | Description        |  
| --------                    | ------------------ |
| isVisible                  | Show the dataset details visualisations section (default: `false`).             |
| displayAll                  | Display all visualisations (default: `false`).             |
| displayCount                  | Amount of visible visualisations (default: `7`).             |
| incrementSteps                  | Increment step options, if `displayAll` is set to false (default: `[10, 50]`).             |
| descriptionMaxLines                  | Maximum amount of lines in a description. Descriptions that exceed this amount will be truncated (default: `3`). |
| descriptionMaxChars                  | Maximum length of a description. Descriptions that exceed this length will be truncated (default: `250`).          |

#### datasetDetails.dataServices

| Property                    | Description        |  
| --------                    | ------------------ |
| isVisible                  | Show the dataset details dataServices section (default: `false`).             |
| displayAll                  | Display all dataServices (default: `false`).             |
| displayCount                  | Amount of visible dataServices (default: `7`).             |
| incrementSteps                  | Increment step options, if `displayAll` is set to false (default: `[10, 50]`).             |
| descriptionMaxLines                  | Maximum amount of lines in a description. Descriptions that exceed this amount will be truncated (default: `3`). |
| descriptionMaxChars                  | Maximum length of a description. Descriptions that exceed this length will be truncated (default: `250`).          |

#### datasetDetails.isUsedBy

| Property                    | Description        |  
| --------                    | ------------------ |
| isVisible                  | Show the dataset details isUsedBy section (default: `false`).             |

#### datasetDetails.relatedResources

| Property                    | Description        |  
| --------                    | ------------------ |
| isVisible                  | Show the dataset details relatedResources section (default: `false`).             |

#### datasetDetails.bulkDownload

| Property                    | Description        |  
| --------                    | ------------------ |
| buttonPosition               | Position of the download button (default: `top`).         |
| MAX_FILE_TITLE_LENGTH               | Maximum length of the file name (default: `80`).         |
| MAX_REQUESTS_COUNT               | Maximum amount of requests at the same time (default: `5`).         |
| INTERVAL_MS               | Timeout interval between requests (default: `10`).         |
| TIMEOUT_MS               | Position of the download button (default: `10000`).         |

#### datasetDetails.quality

| Property                    | Description        |  
| --------                    | ------------------ |
| displayAll               | Display all distributions on the dataset details quality page (default: `false`).         |
| numberOfDisplayedQualityDistributions               | Amount of displayed distributions on the dataset details quality page (default: `5`).         |
| csvLinter.enable               | Enables the CSV linter service (default: `true`).             |
| csvLinter.displayAll               | Display all validation results of the CSV linter (default: `false`).         |
| csvLinter.numberOfDisplayedValidationResults               | Amount of displayed validation results of the CSV linter (default: `5`).         |


## maps
Contains configuration values that are used to create the map component.

| Property                    | Description        |  
| --------                    | ------------------ |
| mapVisible               | Enables the map on the `Datasets` page (default: `true`).          |
| useAnimation               | Enables the map animations (default: `true`).          |
| location               | The location which is used as center of the map (default: `[[52.526, 13.314], 10]`).          |
| spatialType               | The type of the location. (default: `Point`).          |
| height               | The height of the map (default: `400px`).          |
| width               | The width of the map (default: `100%`).          |
| mapContainerId               | The HTML id attribute of the map element. (default: `mapid`).          |
| urlTemplate               | The map API template (default: `https://gisco-services.ec.europa.eu/maps/wmts/1.0.0/WMTSCapabilities.xml/wmts/OSMCartoComposite/EPSG3857/{z}/{x}/{y}.png`).          |
| geoBoundsId               | The id used for geo operations (default: `ds-search-bounds`).          |
| sender               | _see table below_        |
| receiver               | _see table below_        |
| options               | _see table below_        |
| mapStyle               | _see table below_        |

#### maps.sender

The following properties are configuration values required by Leaflet.

| Property                    | Description        |  
| --------                    | ------------------ |
| startBounds               | The start boundaries for the map sender (default: `[[34.5970, -9.8437], [71.4691, 41.4843]]`).     |
| height               | The height of the map (default: `200px`).         |
| width               | The width of the map (default: `100%`).         |
| mapContainerId               | The HTML id attribute of the map element. (default: `modalMap`).         |

#### maps.receiver

The following properties are configuration values required by Leaflet.

| Property                    | Description        |  
| --------                    | ------------------ |
| startBounds               | The start boundaries for the map sender (default: `[[34.5970, -9.8437], [71.4691, 41.4843]]`).     |
| height               | The height of the map (default: `250px`).         |
| width               | The width of the map (default: `100%`).         |
| mapContainerId               | The HTML id attribute of the map element. (default: `mapid`).         |
| attributionPosition               | The HTML id attribute of the map element. (default: `topright`).         |

#### maps.options

The following properties are configuration values required by Leaflet.

| Property                    | Description        |  
| --------                    | ------------------ |
| id               | ??? (default: `mapbox/streets-v11`).     |
| accessToken               | The Leaflet access token (default: `pk.eyJ1IjoiZmFiaWFwZmVsa2VybiIsImEiOiJja2x3MzlvZ3UwNG85MnBseXJ6aGI2MHdkIn0.bFs2g4bPMYULlvDSVsetJg`).         |
| attribution               | The Leaflet map attribution label (default: `&copy; <a href="https://ec.europa.eu/eurostat/web/gisco/">Eurostat - GISCO</a>`).         |

#### maps.mapStyle

The following properties are configuration values required by Leaflet.

| Property                    | Description        |  
| --------                    | ------------------ |
| color               | The color of map elements (default: `red`).     |
| fillColor               | The fill color for map elements (default: `red`).         |
| fillOpacity               | The opacity of filled elements (default: `0.5`).         |
| weight               | The HTML id attribute of the map element. (default: `2`).         |
| radius               | The HTML id attribute of the map element. (default: `1`).         |


## dataProviderInterface
Contains configuration values that are used for the `DataProviderInterface`.

| Property                    | Description        |  
| --------                    | ------------------ |
| useService               | Enables the Data Provider Interface service (default: `true`).          |
| basePath               | The base path of the Data Provider Interface (default: `true`).          |
| specification               |  Defines the DCAT specification used (default: `dcatap`).          |
| annifIntegration               | Enables the usage of Annif for autocompletion in Data Provider Interface (default: `false`).          |
| enableFileUploadReplace      | Enables file replacement when editing existing distribution, instead of creating new ones (default: `false`).          |
| buttons               | _see table below_        |
| doiRegistrationService               | _see table below_        |

#### dataProviderInterface.buttons

| Property                    | Description        |  
| --------                    | ------------------ |
| Dataset               | Enables the `Create Dataset` button in the DPI menu (default: `true`).     |
| Catalogue               | Enables the `Create Catalogue` button in the DPI menu (default: `true`).         |

#### dataProviderInterface.doiRegistrationService

| Property                    | Description        |  
| --------                    | ------------------ |
| persistentIdentifierType               | Indicates the Persistent Identifier (PID) system that is used for the DOI service (default: `eu-ra-doi`).        |

<br><br>


# languages

This property contains information about languages used in piveau-hub-ui.

#### useLanguageSelector
_Note: This property is currently not used, but will be used in future versions._

Enables the Language Selector in the Header component (default: `true`).

#### locale
Default Language value (default: `en`).

#### fallbackLocale
Fallback Language value (default: `en`).


<br><br>


# services

This property contains a list of services used in piveau-hub-ui.

#### datasetService
Service resposible for querying all `Dataset` related data.

#### catalogService
Service resposible for querying all `Catalog` related data.

#### uploadService
Service resposible for uploading data created by the `DataProviderInterface` related data.

#### gazetteerService
Service resposible for querying autocomplete data.


<br><br>


# themes

This property contains information about themes used in piveau-hub-ui.

#### header
The theme of the `Header` component (default: `dark`).


<br><br>


# tracker

This property contains information tracking software used in piveau-hub-ui.

#### isPiwikPro
Switch between different tracking software tools (default: `true`). <br>

| Value   | Tracking Software     |  
|---      |-----------------------|
| true    | Piwik Pro             |  
| false   | Matomo                |  

<br>

#### siteId
ID for tracking software (default: `fed9dbb7-42d1-4ebc-a8bf-3c0b8fd03e09`).

#### trackerUrl
URL to tracking software (default: `https://opanalytics.containers.piwik.pro/`).

</details>


<br><br>




### Runtime configurations
We utilize a Vue plugin `RuntimeConfiguration` to configure a web application using environment variables without rebuilding it.

The Runtime configuration file is located at `config/runtime-config.js` by default. It is a template file, which lists all configurable environment variables that can be changed during runtime.

See [runtime-config.js](config/runtime-config.js) for all available runtime variables.

<br>

<details>

<summary>Runtime Configuration example</summary>

Let's suppose `user-config.js` looks like this:
```
const glueConfig = {
  api: {
      baseUrl: 'https://data.europa.eu/oldBaseUrl',
      hubUrl: 'https://data.europa.eu/oldHubUrl',
  }
}
```

... and `process.env` looks like this:
```
{
  NODE_ENV: 'production',
  API: {
      BASE_URL: 'https://data.europa.eu/oldBaseUrl',
  }
}
```

1. We want to change an existing property (`API.BASE_URL`) during runtime.
2. We want to make a new property (`API.HUB_URL`) that already exists in `user-config.js` available during runtime.

Let's go through the steps outlined above:

1.  Add new property `API.HUB_URL` to `runtime-config.js`:
```
export default {
  API: {
      BASE_URL: '$VUE_APP_API_BASE_URL',
      HUB_URL: '$VUE_APP_API_HUB_URL'
  }
}
```

Build and deploy the application.

2.  Set the environment variables `VUE_APP_API_BASE_URL` and `VUE_APP_API_HUB_URL`:
```
VUE_APP_API_BASE_URL=https://data.europa.eu/newBaseUrl
VUE_APP_API_HUB_URL=https://data.europa.eu/newHubUrl
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
