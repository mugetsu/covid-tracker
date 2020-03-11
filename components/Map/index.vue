<template>
  <div class="map-container">
    <div id="map" class="map"></div>
  </div>
</template>

<script>
export default {
  name: 'Map',
  props: {
    confirmed: Object
  },
  data() {
    return {
      accessToken:
        'pk.eyJ1IjoicXVlZW5zaWRlMDQiLCJhIjoiY2s3bG1rNjMzMDk4czNscG1yZHU3NDRiMyJ9.PB6Uq1rIDULWXJp7T8ypng'
    }
  },
  methods: {
    createMap() {
      const mapboxgl = require('mapbox-gl/dist/mapbox-gl')
      mapboxgl.accessToken = this.accessToken

      const oranges = ['#ffa500', '#ffae19', '#ffb732', '#ffc04c']
      const blacks = ['#000000', '#191919', '#323232', '#4c4c4c']

      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [117.2264, 31.8257],
        zoom: 3
      })

      const addLayers = map => {
        map.addSource('confirmed', {
          type: 'geojson',
          data: this.confirmed,
          cluster: true,
          clusterRadius: 50
        })

        map.addLayer({
          id: 'confirmed_cluster',
          type: 'circle',
          source: 'confirmed',
          paint: {
            'circle-color': [
              'step',
              ['get', 'latest'],
              oranges[2],
              100,
              oranges[1],
              750,
              oranges[0]
            ],
            'circle-radius': ['step', ['get', 'latest'], 15, 100, 20, 750, 25]
          }
        })

        map.addLayer({
          id: 'confirmed_cluster_count',
          type: 'symbol',
          source: 'confirmed',
          layout: {
            'text-field': '{latest}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
          }
        })

        map.addLayer({
          id: 'confirmed_unclustered_point',
          type: 'circle',
          source: 'confirmed',
          filter: ['!=', 'state', 1],
          paint: {
            'circle-color': oranges[3],
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': oranges[3]
          }
        })
      }

      map.on('style.load', function() {
        addLayers(map)
      })

      map.on('click', 'confirmed_cluster', function(e) {
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['confirmed_cluster']
        })
        var clusterId = features[0].properties.cluster_id
        map
          .getSource('confirmed')
          .getClusterExpansionZoom(clusterId, function(err, zoom) {
            if (err) return
            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: map.getZoom() + 1
            })
          })
      })
    }
  },
  mounted() {
    this.createMap()
  }
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>