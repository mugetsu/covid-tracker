<template>
  <mapbox
    :accessToken="accessToken"
    :mapOptions="{
      style: mapStyle,
      center: [67.4692816, 30.0313007],
      zoom: 3
    }"
    @map-load="loaded"
  />
</template>

<script>
import Mapbox from 'mapbox-gl-vue'

export default {
  name: 'Map',
  components: {
    Mapbox
  },
  props: {
    confirmed: Object,
    dead: Object
  },
  data() {
    return {
      accessToken:
        'pk.eyJ1IjoicXVlZW5zaWRlMDQiLCJhIjoiY2s3bG1rNjMzMDk4czNscG1yZHU3NDRiMyJ9.PB6Uq1rIDULWXJp7T8ypng',
      mapStyle: 'mapbox://styles/mapbox/light-v10'
    }
  },
  methods: {
    loaded(map) {
      map.addSource('confirmed', {
        type: 'geojson',
        data: this.confirmed,
        cluster: true,
        clusterMaxZoom: 20,
        clusterRadius: 50
      })

      map.addSource('dead', {
        type: 'geojson',
        data: this.dead,
        cluster: true,
        clusterMaxZoom: 20,
        clusterRadius: 50
      })

      map.addLayer({
        id: 'confirmed-clusters',
        type: 'circle',
        source: 'confirmed',
        filter: ['==', 'state', 'confirmed'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'latest'],
            '#FF6347',
            100,
            '#FFA500',
            750,
            '#FF4500'
          ],
          'circle-radius': [
            'step',
            ['get', 'latest'],
            20,
            100,
            30,
            750,
            40
          ]
        }
      })

      map.addLayer({
        id: 'confirmed-cluster-count',
        type: 'symbol',
        source: 'confirmed',
        filter: ['has', 'latest'],
        layout: {
          'text-field': '{latest}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      })

      map.addLayer({
        id: 'confirmed-unclustered-point',
        type: 'circle',
        source: 'confirmed',
        filter: ['!', ['has', 'latest']],
        paint: {
          'circle-color': '#FF4500',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#FF4500'
        }
      })

      map.on('click', 'clusters', function(e) {
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        })
        var clusterId = features[0].properties.cluster_id
        map
          .getSource('confirmed')
          .getClusterExpansionZoom(clusterId, function(err, zoom) {
            if (err) return

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom
            })
          })
      })
    }
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