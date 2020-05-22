const esriBase = 'https://yngts005.yndlr.gov.cn/arcgis'
// let esriBase = "https://gis04.arcgis.portal.com/arcgis";
const esriSpatialAnalysis = '/rest/services/System/SpatialAnalysisTools/GPServer'
const esriGeoAnalytics = '/rest/services/System/GeoAnalyticsTools/GPServer'

const requestUrls = {
  mapGalleryUrls: {
    baseUrl: 'https://ivportal.yndlr.gov.cn/arcgis/sharing/rest/'
  },
  arcgisUrls: {
    css: 'http://9.77.248.33/arcgisapi/3.21/esri/css/esri.css',
    initJs: 'http://9.77.248.33/arcgisapi/3.21/init.js',
    gemotry: 'https://yngtc002.yndlr.gov.cn/arcgis/rest/services/Utilities/Geometry/GeometryServer/project'
  },
  ht_arcgisUrls: {
    css: 'http://192.168.0.250/arcgis/api/3.21/3.21compact/esri/css/esri.css',
    initJs: 'http://192.168.0.250/arcgis/api/3.21/3.21compact/init.js',
    geometry: 'http://192.168.0.133:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer/project'
  },

  esri: {
    esriBase: esriBase,
    generateToken: esriBase + '/sharing/rest/generateToken',
    esriSpatialAnalysisBase: esriBase + esriSpatialAnalysis,
    esriGeoAnalyticsBase: esriBase + esriGeoAnalytics,
    esriUserContentBase: esriBase + '/sharing/rest/content',
    esriUserContent: esriBase + '/sharing/rest/content/users/arcgis',
    esriContentSearch: esriBase + '/sharing/rest/search',
    esriUser: esriBase + '/sharing/rest/community/users/',
    esriShareBase: esriBase + '/sharing/rest/',
    esriHosted: esriBase + '/rest/services/Hosted/',
    geometryProject: esriBase + '/rest/services/Utilities/Geometry/GeometryServer/project'
  }
}

/**
 * 地图相关常量(map.vue)
 */
const mapUtils = {
  baseMapUrl:
        'https://yngtc002.yndlr.gov.cn/arcgis/rest/services/YNBaseMapService/MapServer',
  queryRegionEnvelopUrl:
        'https://yngtc002.yndlr.gov.cn/arcgis/rest/services/SJTDGH/TDGHJBXZ_SJ/MapServer/49',
  geo2mapRequire: [
    'esri/graphic',
    'esri/geometry/Polygon',
    'esri/SpatialReference',
    'esri/Color',
    'esri/symbols/SimpleFillSymbol',
    'esri/symbols/SimpleLineSymbol',
    'esri/InfoTemplate',
    'esri/tasks/ProjectParameters',
    'esri/tasks/GeometryService',
    'esri/layers/GraphicsLayer',
    'esri/geometry/Point',
    'dojo/domReady!'
  ],
  geoPoint2mapRequire: [
    'esri/graphic',
    'esri/geometry/Point',
    'esri/SpatialReference',
    'esri/Color',
    'esri/symbols/SimpleFillSymbol',
    'esri/symbols/SimpleLineSymbol',
    'esri/InfoTemplate',
    'esri/tasks/ProjectParameters',
    'esri/tasks/GeometryService',
    'esri/layers/GraphicsLayer',
    'esri/symbols/SimpleMarkerSymbol',
    'dojo/domReady!'
  ],
  galleryRequire: [
    'dojo/dom',
    'dijit/registry',
    'dojo/dom-style',
    'esri/request',
    'dojo/domReady!'
  ],
  searchRequire: [
    'dojo/dom',
    'esri/dijit/Search',
    'dojo/on',
    'dojo/dom-construct',
    'dojo/domReady!'
  ],
  toolbarRequire: ['dojo/dom', 'dojo/dom-style', 'dojo/on', 'dojo/domReady!'],
  drawShapeRequire: [
    'esri/symbols/SimpleFillSymbol',
    'esri/symbols/SimpleLineSymbol',
    'esri/toolbars/draw',
    'esri/Color',
    'esri/graphic',
    'esri/layers/FeatureLayer',
    'dojo/domReady!'
  ],
  dojoRequire: [
    'dojo/on',
    'dojo/query',
    'dojo/dom',
    'dojo/dom-construct',
    'esri/dijit/Measurement',
    'dijit/registry',
    'dojo/domReady!'
  ],
  esriRequires: [
    'esri/basemaps',
    'esri/map',
    'esri/graphicsUtils',
    'esri/dijit/BasemapGallery',
    'esri/renderers/SimpleRenderer',
    'dojo/on',
    'dojo/query',
    'dojo/dom',
    'dojo/dom-style',
    'esri/layers/ArcGISTiledMapServiceLayer',
    'esri/layers/ArcGISDynamicMapServiceLayer',
    'esri/layers/FeatureLayer',
    'esri/layers/GraphicsLayer',
    'esri/SpatialReference',
    'esri/layers/ArcGISImageServiceLayer',
    'esri/layers/MapImageLayer',
    'esri/geometry/Polygon',
    'esri/graphic',
    'dojo/dom-construct',
    'esri/geometry/Extent',
    'esri/tasks/GeometryService',
    'esri/tasks/ProjectParameters',
    'esri/symbols/SimpleFillSymbol',
    'esri/symbols/SimpleLineSymbol',
    'esri/InfoTemplate',
    'esri/toolbars/draw',
    'esri/Color',
    'esri/request',
    'dijit/registry',
    'esri/dijit/OverviewMap',
    'dojo/domReady!'
  ]
}

export {
  requestUrls,
  mapUtils
}
