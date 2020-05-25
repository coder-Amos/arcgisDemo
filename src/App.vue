<template>
  <div id="app">
    
<!-- <arcgis-one /> -->
<!-- <arcgis-two></arcgis-two> -->
<arcgis-three></arcgis-three>

  </div>
</template>

<script>
// import ArcgisOne from './components/ArcgisOne'
// import ArcgisTwo from './components/ArcgisTwo'
import ArcgisThree from './components/ArcgisThree'

export default {
  name: 'app',
  components: {
    // ArcgisOne
    // ArcgisTwo
    ArcgisThree
  },
  methods:{
   
  }
}
</script>

<style>
  #map{
    width: 95%;
    height: 900px;
  }
</style>
