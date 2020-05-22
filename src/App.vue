<template>
  <div id="app">
    
<!-- <arcgis-one /> -->
<arcgis-two></arcgis-two>

  </div>
</template>

<script>
// import ArcgisOne from './components/ArcgisOne'
import ArcgisTwo from './components/ArcgisTwo'

export default {
  name: 'app',
  components: {
    // ArcgisOne
    ArcgisTwo
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
