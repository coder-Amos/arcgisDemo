
<template>
  <div id="arcgisone">
    <div id="viewDiv"></div>
  </div>
</template>
<script>
/* eslint-disable */
import esriLoader from "esri-loader";
export default {
  name: "ArcgisOne",
  data() {
    return {};
  },
  mounted() {
    // this.draw()
    // this.ThreeDimensional();
    this.basemapChange();
  },
  methods: {
    //创建一个简单的2d地图
    draw() {
      esriLoader
        .loadModules(["esri/Map", "esri/views/MapView"])
        .then(([Map, MapView]) => {
          let map = new Map({
            // basemap : "topo-vector",
            basemap: "streets-navigation-vector"
          });
          let view = new MapView({
            container: "viewDiv",
            map: map,
            // 昆明市
            center: [102.707983, 25.0491],
            zoom: 11
          });
        });
    },
    //创建一个简单的3D地图
    ThreeDimensional() {
      esriLoader
        .loadModules(["esri/Map", "esri/views/SceneView"])
        .then(([Map, SceneView]) => {
          let map = new Map({
            // basemap: "topo-vector",
            // basemap: "streets-navigation-vector"
            basemap: "streets-relief-vector"
          });
          let view = new SceneView({
            container: "viewDiv",
            map: map,
            camera: {
              tilt: 65,
              position: {
                x: 102.707983,
                y: 25.0491,
                z: 8000
              }
            }
          });
        });
    },
    //创建一个简单地可以切换底图的2d地图
    basemapChange() {
      esriLoader
        .loadModules([
          "esri/Map",
          "esri/views/MapView",
          "esri/widgets/BasemapToggle",
          "esri/widgets/BasemapGallery"
        ])
        .then(([Map, MapView, BasemapToggle, BasemapGallery]) => {
          let map = new Map({
            // basemap : "topo-vector",
            basemap: "streets-navigation-vector"
          });
          let view = new MapView({
            container: "viewDiv",
            map: map,
            // 昆明市
            center: [102.707983, 25.0491],
            zoom: 11
          });
          let basemapToggle=new BasemapToggle({  //两个底图来回切换
            view:view,
            nextBasemap:'satellite'
          })
          var basemapGallery = new BasemapGallery({ //多个底图切换
            view: view,
            source: {
              portal: {
                url: "https://www.arcgis.com",
                // useVectorBasemaps: true 
                useVectorBasemaps: false // Load vector tile basemaps
              }
            },
            label: "选择底图"
          });
           view.ui.add(basemapToggle,'bottom-right');
           view.ui.add(basemapGallery, "top-right");
        });
    }
  }
};
</script>
<style>
@import "https://js.arcgis.com/4.11/esri/themes/light/main.css";
* {
  padding: 0;
  margin: 0;
}
#arcgisone {
  width: 100vw;
  height: 100%;
  overflow: hidden;
}
#viewDiv {
  width: 100vw;
  height: 99vh;
  margin: auto;
  border: 1px solid #ccc;
}
</style>