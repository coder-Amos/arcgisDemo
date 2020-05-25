<template>
  <div id="arcgisthree">
    <div id="viewDiv"></div>
  </div>
</template>
<script>
/* eslint-disable */

import esriLoader from "esri-loader";
export default {
  name: "ArcgisThree",
  data() {
    return {};
  },
  mounted() {
    this.drawGraphics();
  },
  methods: {
    //绘制图形并计算面积
    drawGraphics() {
      esriLoader
        .loadModules([
          "esri/Map",
          "esri/views/MapView",
          "esri/Graphic",
          "esri/layers/GraphicsLayer"
        ])
        .then(([Map, MapView, Graphic, GraphicsLayer]) => {
          let map = new Map({
            basemap: "topo-vector"
          });
          let view = new MapView({
            map: map,
            container: "viewDiv",
            // 昆明市
            center: [102.707983, 25.0491],
            zoom: 11
          });

          let graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);
          let point = {
            type: "point",
            longitude: 102.707983, 
            latitude: 25.0491
          };

          let simpleMarkerSymbol = {
            type: "simple-marker",
            color: [226, 119, 40], // orange
            style:'dash',
            outline: {
              color: [255, 255, 255], // white
              width: 1
            }
          };

          let pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol
          });
          let simpleLineSymbol = {
            type: "simple-line",
            color: [226, 119, 40], // orange
            width: 2
          };

          let polyline = {
            type: "polyline",
            paths: [
              [102.696564, 25.02396],
              [102.707983, 25.0491]
            ]
          };

          let polylineGraphic = new Graphic({
            geometry: polyline,
            symbol: simpleLineSymbol
          });
          let polygon = {
         type: "polygon",
         rings: [
           [102.682959, 24.994478],
           [102.707001, 25.036751],
           [102.708588, 25.022989],
           [102.707983, 25.0491]
           
         ]
       };

       let simpleFillSymbol = {
         type: "simple-fill",
         color: [227, 139, 79, 0.8],  // orange, opacity 80%
         outline: {
           color: [255, 255, 255],
           width: 1
         }
       };

       let polygonGraphic = new Graphic({
         geometry: polygon,
         symbol: simpleFillSymbol
       });

      
          graphicsLayer.add(pointGraphic);
          graphicsLayer.add(polylineGraphic);
          graphicsLayer.add(polygonGraphic);
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
#viewDiv {
  width: 100vw;
  height: 99vh;
}
</style>