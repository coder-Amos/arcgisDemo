<template>
  <div id="distance">
    <div class="buttons"> 
<button id="btn1">直线距离</button>
    <button id="btn2">面积</button>
    </div>
    
    <div id="viewDiv"></div>
  </div>
</template>
<script>
/* eslint-disable */
import esriLoader from "esri-loader";

export default {
  name: "Distance",
  data() {
    return {
      method:''
    };
  },
  mounted(){
    this.lineDistance()
  },
  methods: {
    //计算直线距离
    lineDistance() {
      const doules = [
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/WebTileLayer",
        "esri/symbols/Font",
        "esri/symbols/TextSymbol",
        "esri/Graphic",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/layers/GraphicsLayer",
        "esri/tasks/GeometryService",
        "esri/tasks/support/LengthsParameters",
        "esri/geometry/Polyline",
        "esri/geometry/Point",
        "esri/tasks/support/AreasAndLengthsParameters",
        "esri/widgets/Sketch/SketchViewModel",
        "dojo/dom",
        "dojo/on",
        "dojo/domReady!"
      ];

      esriLoader
        .loadModules(doules)
        .then(
          ([
            Map,
            MapView,
            WebTileLayer,
            Font,
            TextSymbol,
            Graphic,
            SimpleMarkerSymbol,
            GraphicsLayer,
            GeometryService,
            LengthsParameters,
            Polyline,
            Point,
            AreasAndLengthsParameters,
            SketchViewModel,
            dom,
            on
          ]) => {
            const tiledLayer = new WebTileLayer({
              urlTemplate:
                "http://{subDomain}.tianditu.gov.cn/DataServer?T=vec_w&x={col}&y={row}&l={level}&tk=03787cc3dd77d29e4fef34ec22d8d0d6",
              subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"]
            });

            const tiledLayer_poi = new WebTileLayer({
              urlTemplate:
                "http://{subDomain}.tianditu.gov.cn/DataServer?T=cva_w&x={col}&y={row}&l={level}&tk=03787cc3dd77d29e4fef34ec22d8d0d6",
              subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"]
            });

            var map = new Map({
              basemap: {
                baseLayers: [tiledLayer, tiledLayer_poi]
              }
            });

            var view = new MapView({
              container: "viewDiv",
              map: map,
              center: [102.707983, 25.0491],
              zoom: 8
            });

            // ArcGIS GeometryServer 服务
            var geometryUrl =
              "http://192.168.0.133:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer";
            var graphicLyr = new GraphicsLayer({ id: "lyr1" });
            map.add(graphicLyr);

            var sketch = new SketchViewModel({
              layer: graphicLyr,
              view: view
            });
            var defaultFont = new Font({
              size: "12px",
              weight: "bold"
            });

            var defaultMarkSymbol = new SimpleMarkerSymbol({
              style: "circle",
              color: "red",
              size: "7px",
              outline: {
                color: [255, 0, 0],
                width: 1
              }
            });

            var totalDis = 0;
            var totalLenGraphic;
            sketch.on("create", (evt)=> {
              if (this.method == "长度测量") {
                handleLengthMeasure(evt);
              } else if (this.method == "面积测量") {
                handleAreaMeasure(evt);
              }
            });

            var inputPt = [];
            function handleLengthMeasure(evt){
              if (evt.toolEventInfo && evt.toolEventInfo.type == "vertex-add") {
                var pt = {
                  type: "point",
                  x: evt.toolEventInfo.added[0],
                  y: evt.toolEventInfo.added[1],
                  spatialReference: view.spatialReference
                };
                handleLengthPt(pt);
              }
            }

            function handleLengthPt(pt) {
              inputPt.push(pt);
              var textSymbol;
              if (inputPt.length == 1) {
                textSymbol = new TextSymbol({
                  text: "起点",
                  font: defaultFont,
                  color: [255, 0, 0],
                  xoffset: 0,
                  yoffset: -20
                });
                graphicLyr.add(
                  new Graphic({ geometry: pt, symbol: textSymbol })
                );
              }
              graphicLyr.add(
                new Graphic({ geometry: pt, symbol: defaultMarkSymbol })
              );
              if (inputPt.length >= 2) {
                // 设置单位
                var params = new LengthsParameters();
                // 米
                params.distanceUnit = GeometryService.UNIT_METER;
                params.calculationType = "preserveShape";

                var geoservice = new GeometryService(geometryUrl);
                var p1 = inputPt[inputPt.length - 2];
                var p2 = inputPt[inputPt.length - 1];
                var polyline = new Polyline({
                  spatialReference: view.spatialReference
                });
                polyline.addPath([
                  [p1.x, p1.y],
                  [p2.x, p2.y]
                ]);
                params.polylines = [polyline];

                geoservice.lengths(params).then((distance) =>{
                  var dis = parseFloat(distance.lengths[0]);
                  totalDis += dis;
                  var betweendis = (dis/1000).toFixed(2) + "公里";
                  var distext = new TextSymbol({
                    text: betweendis,
                    font: defaultFont,
                    color: [255, 0, 0],
                    xoffset: 40,
                    yoffset: -3
                  });
                  graphicLyr.add(
                    new Graphic({ geometry: p2, symbol: distext })
                  );
                  if (totalLenGraphic) {
                    graphicLyr.remove(totalLenGraphic);
                  }
                  var total = totalDis;
                  var totalSymbol = new TextSymbol({
                    text: "总长度：" + (total/1000).toFixed(2) + "公里",
                    font: defaultFont,
                    color: [255, 0, 0],
                    xoffset: 40,
                    yoffset: -20
                  });
                  totalLenGraphic = new Graphic({
                    geometry: p2,
                    symbol: totalSymbol
                  });
                  graphicLyr.add(totalLenGraphic);
                });
              }
            }

            function handleAreaMeasure(evt) {
              if (evt.state == "complete") {
                // 设置单位
                var params = new AreasAndLengthsParameters();
                // 米
                params.lengthUnit = GeometryService.UNIT_METER;
                // 平方米
                params.areaUnit = GeometryService.UNIT_SQUARE_METERS;
                params.calculationType = "preserveShape";

                var geometry = evt.graphic.geometry;
                var geoservice = new GeometryService({ url: geometryUrl });
                geoservice.simplify([geometry]).then(function(simplifiedGeo) {
                  params.polygons = simplifiedGeo;
                  geoservice.areasAndLengths(params).then(function(result) {
                    var font = new Font({
                      size: "18px"
                    });
                    var areaRes = new TextSymbol({
                      text: (result.areas[0]/1000).toFixed(2)+ "平方公里",
                      font: font,
                      color: [255, 0, 0]
                    });
                    var pt = new Point({
                      x: geometry.centroid.x,
                      y: geometry.centroid.y,
                      spatialReference: view.spatialReference
                    });
                    graphicLyr.add(
                      new Graphic({ geometry: pt, symbol: areaRes })
                    );
                    console.log(result);
                  });
                });
              }
            }
            on(dom.byId("btn1"), "click", _ => {
              this.method = "长度测量";

              sketch.create("polyline", { mode: "click" });
            });
            on(dom.byId("btn2"), "click", _ => {
              this.method = "面积测量";
              sketch.create("polygon", { mode: "click" });
            });
          }
        );
    }
  }
};
</script>
<style>
@import "https://js.arcgis.com/4.15/esri/themes/light/main.css";
* {
  padding: 0;
  margin: 0;
}
#viewDiv {
  width: 100vw;
  height: 99vh;
}
#distance {
  width: 100%;
  height: 99%;
  overflow: hidden;
}
.buttons button{
  width: 60px;
  height: 30px;
  line-height: 20px;
  text-align: center;
  background-color: #478cc7;
  color: #fff;
  border: 1px solid #ccc;
  margin: 20px;
  cursor: pointer;
}
.buttons{
  position: absolute;
  right: 2vw;
  top: 3vh;
  z-index: 2999;
}
</style>