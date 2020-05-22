<template>
  <div style="overflow:hidden;width:100%;height:100%">
    <div id="viewDiv"></div>
  </div>
</template>
<script>
/* eslint-disable */
import esriLoader from "esri-loader";
export default {
  name: "ArcgisTwo",
  data() {
    return {};
  },
  mounted() {
    // this.FeatureLayer();
    // this.createFillSymbol()
    // this.addRender();
    this.popupBox();
  },
  methods: {
    //给底图添加图层，突出显示某些信息
    FeatureLayer() {
      esriLoader
        .loadModules([
          "esri/Map",
          "esri/views/MapView",
          "esri/layers/FeatureLayer"
        ])
        .then(([Map, MapView, FeatureLayer]) => {
          let map = new Map({
            // basemap : "topo-vector",
            basemap: "streets-navigation-vector"
          });
          let view = new MapView({
            container: "viewDiv",
            map: map,
            center: [-118.71511, 34.09042],
            zoom: 11
          });

          let trailheadsLayer = new FeatureLayer({
            url:
              "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
          });
          let trailsLayer = new FeatureLayer({
            url:
              "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
            definitionExpression: "ELEV_GAIN < 250"
          });
          let parksLayer = new FeatureLayer({
            url:
              "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
          });
          map.add(trailheadsLayer);
          map.add(trailsLayer);
          map.add(parksLayer);
        });
    },
    createFillSymbol(value, color) {
      return {
        value: value,
        symbol: {
          color: color,
          type: "simple-fill",
          style: "solid",
          outline: {
            style: "none"
          }
        },
        label: value
      };
    },
    //添加样式要素图层，使用渲染器
    addRender() {
      esriLoader
        .loadModules([
          "esri/Map",
          "esri/views/MapView",
          "esri/layers/FeatureLayer"
        ])
        .then(([Map, MapView, FeatureLayer]) => {
          let map = new Map({
            basemap: "topo-vector"
            // basemap : "streets-navigation-vector"
          });
          let view = new MapView({
            container: "viewDiv",
            map: map,
            center: [-118.71511, 34.09042],
            zoom: 11
          });
          let trailheadsRenderer = {
            type: "simple",
            symbol: {
              type: "picture-marker",
              url:
                "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
              width: "18px",
              height: "18px"
            }
          };
          let trailheadsLabels = {
            symbol: {
              type: "text",
              color: "#FFFFFF",
              haloColor: "#5E8D74",
              haloSize: "2px",
              font: {
                size: "12px",
                family: "noto-sans",
                style: "italic",
                weight: "normal"
              }
            },
            labelPlacement: "above-center",
            labelExpressionInfo: {
              expression: "$feature.TRL_NAME"
            }
          };
          let trailsRenderer = {
            type: "simple",
            symbol: {
              color: "#BA55D3",
              type: "simple-line",
              style: "solid"
            },
            visualVariables: [
              {
                type: "size",
                field: "ELEV_GAIN",
                minDataValue: 0,
                maxDataValue: 2300,
                minSize: "3px",
                maxSize: "7px"
              }
            ]
          };
          var bikeTrailsRenderer = {
            type: "simple",
            symbol: {
              type: "simple-line",
              style: "short-dot",
              color: "#FF91FF",
              width: "1px"
            }
          };
          let openSpacesRenderer = {
            type: "unique-value",
            field: "TYPE",
            uniqueValueInfos: [
              this.createFillSymbol("Natural Areas", "#9E559C"),
              this.createFillSymbol("Regional Open Space", "#A7C636"),
              this.createFillSymbol("Local Park", "#149ECE"),
              this.createFillSymbol("Regional Recreation Park", "#ED5151")
            ]
          };
          let trailheadsLayer = new FeatureLayer({
            url:
              "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
            renderer: trailheadsRenderer,
            labelingInfo: [trailheadsLabels]
          });
          let bikeTrailsLayer = new FeatureLayer({
            url:
              "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
            renderer: bikeTrailsRenderer,
            definitionExpression: "USE_BIKE = 'YES'"
          });
          let trailsLayer = new FeatureLayer({
            url:
              "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
            definitionExpression: "ELEV_GAIN < 250",
            renderer: trailsRenderer,
            opacity: 0.75
          });
          let openspaces = new FeatureLayer({
            url:
              "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
            renderer: openSpacesRenderer,
            opacity: 0.2
          });
          map.add(trailheadsLayer);
          map.add(trailsLayer, 0);
          map.add(bikeTrailsLayer, 1);
          map.add(openspaces, 0);
        });
    },

    //给每一个图层添加描述的弹出框
    popupBox() {
      esriLoader
        .loadModules([
          "esri/Map",
          "esri/views/MapView",
          "esri/layers/FeatureLayer"
        ])
        .then(([Map, MapView, FeatureLayer]) => {
          let map = new Map({
            basemap: "topo-vector"
            // basemap : "streets-navigation-vector"
          });
          let view = new MapView({
            container: "viewDiv",
            map: map,
            center: [-118.71511, 34.09042],
            zoom: 11
          });
          let trailheadsRenderer = {
            type: "simple",
            symbol: {
              type: "picture-marker",
              url:
                "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
              width: "18px",
              height: "18px"
            }
          };
          let trailheadsLabels = {
            symbol: {
              type: "text",
              color: "#FFFFFF",
              haloColor: "#5E8D74",
              haloSize: "2px",
              font: {
                size: "12px",
                family: "noto-sans",
                style: "italic",
                weight: "normal"
              }
            },
            labelPlacement: "above-center",
            labelExpressionInfo: {
              expression: "$feature.TRL_NAME"
            }
          };
          let trailsRenderer = {
            type: "simple",
            symbol: {
              color: "#BA55D3",
              type: "simple-line",
              style: "solid"
            },
            visualVariables: [
              {
                type: "size",
                field: "ELEV_GAIN",
                minDataValue: 0,
                maxDataValue: 2300,
                minSize: "3px",
                maxSize: "7px"
              }
            ]
          };
          var bikeTrailsRenderer = {
            type: "simple",
            symbol: {
              type: "simple-line",
              style: "short-dot",
              color: "#FF91FF",
              width: "1px"
            }
          };
          let openSpacesRenderer = {
            type: "unique-value",
            field: "TYPE",
            uniqueValueInfos: [
              this.createFillSymbol("Natural Areas", "#9E559C"),
              this.createFillSymbol("Regional Open Space", "#A7C636"),
              this.createFillSymbol("Local Park", "#149ECE"),
              this.createFillSymbol("Regional Recreation Park", "#ED5151")
            ]
          };
          let popupTrailheads = {
            title: "足迹信息",
            content:
              "<b>足迹:</b> {TRL_NAME}<br><b>城市:</b> {CITY_JUR}<br><b>街道:</b> {X_STREET}<br><b>公园:</b> {PARKING}<br><b>海拔:</b> {ELEV_FT} ft"
          };
          let popupTrails = {
            title: "Trail Information",
            content: function() {
              return "This is {TRL_NAME} with {ELEV_GAIN} ft of climbing.";
            }
          };
          let popupOpenspaces = {
            title: "{PARK_NAME}",
            content: [
              {
                type: "fields",
                fieldInfos: [
                  {
                    fieldName: "AGNCY_NAME",
                    label: "Agency",
                    isEditable: true,
                    tooltip: "",
                    visible: true,
                    format: null,
                    stringFieldOption: "textbox"
                  },
                  {
                    fieldName: "TYPE",
                    label: "Type",
                    isEditable: true,
                    tooltip: "",
                    visible: true,
                    format: null,
                    stringFieldOption: "textbox"
                  },
                  {
                    fieldName: "ACCESS_TYP",
                    label: "Access",
                    isEditable: true,
                    tooltip: "",
                    visible: true,
                    format: null,
                    stringFieldOption: "textbox"
                  },
                  {
                    fieldName: "GIS_ACRES",
                    label: "Acres",
                    isEditable: true,
                    tooltip: "",
                    visible: true,
                    format: {
                      places: 2,
                      digitSeparator: true
                    },
                    stringFieldOption: "textbox"
                  }
                ]
              }
            ]
          };
          let popupOpenspacesPieChart = {
            title: "{PARK_NAME}",
            content: [
              {
                type: "media",
                mediaInfos: [
                  {
                    title: "<b>Park Rating</b>",
                    type: "pie-chart",
                    caption: "",
                    value: {
                      theme: "Grasshopper",
                      fields: ["TOTAL_GOOD", "TOTAL_POOR"],
                      normalizeField: null,
                      tooltipField: "Rating"
                    }
                  }
                ]
              }
            ]
          };
          let trailheadsLayer = new FeatureLayer({
            url:
              "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
            renderer: trailheadsRenderer,
            labelingInfo: [trailheadsLabels],
            outFields: [
              "TRL_NAME",
              "CITY_JUR",
              "X_STREET",
              "PARKING",
              "ELEV_FT"
            ],
            popupTemplate: popupTrailheads
          });
          let bikeTrailsLayer = new FeatureLayer({
            url:
              "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
            renderer: bikeTrailsRenderer,
            definitionExpression: "USE_BIKE = 'YES'"
          });
          let trailsLayer = new FeatureLayer({
            url:
              "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
            definitionExpression: "ELEV_GAIN < 250",
            renderer: trailsRenderer,
            opacity: 0.75,
            outFields: ["TRL_NAME", "ELEV_GAIN"],
            popupTemplate: popupTrails
          });
          let openspaces = new FeatureLayer({
            url:
              "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
            renderer: openSpacesRenderer,
            opacity: 0.2,
            outFields: ["TYPE", "PARK_NAME", "TOTAL_GOOD", "TOTAL_POOR"],
            popupTemplate: popupOpenspacesPieChart
          });
          map.add(trailheadsLayer);
          map.add(trailsLayer, 0);
          map.add(bikeTrailsLayer, 1);
          map.add(openspaces, 0);
        });
    }
  }
};
</script>
<style>
@import "https://js.arcgis.com/4.11/esri/themes/light/main.css";
#viewDiv {
  width: 100vw;
  height: 99vh;
  overflow: hidden;
}
* {
  margin: 0;
  padding: 0;
}
</style>