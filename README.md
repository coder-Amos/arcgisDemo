# arcgisdemo
引入arcgis的步骤：
安装:npm install --save esri-loader
引入css样式：@import url('https://js.arcgis.com/4.11/esri/themes/light/main.css');

调用arcgis js的方法--使用官方提供的esriLoader包
 esriLoader.loadModules([
          "esri/Map",
          "esri/views/MapView",
          "其他模块"
        ])
        .then(([Map, MapView,其他模块]) => {
          详细配置
        })
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
