<template>
  <div class="map-container">
    <div id="map" class="map"></div>
  </div>
</template>

<script>
export default {
  name: 'Map',
  props: {
    data: Object
  },
  data() {
    return {}
  },
  methods: {
    createMap(token) {
      const mapboxgl = require('mapbox-gl/dist/mapbox-gl')
      mapboxgl.accessToken = token

      const colors = ['#ffa332', '#66a266', '#b20000']

      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [122, 13],
        zoom: 3
      })

      let markers = {}
      let markersOnScreen = {}
      let point_counts = []
      let totals

      const addLayers = map => {
        map.addSource('covid', {
          type: 'geojson',
          data: this.data,
          cluster: true,
          clusterRadius: 50,
          clusterProperties: {
            confirmed: ['+', ['get', 'confirmed_count']],
            recovered: ['+', ['get', 'recovered_count']],
            dead: ['+', ['get', 'dead_count']]
          }
        })

        map.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'covid',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#ffa332',
              2,
              '#ff9719',
              4,
              '#ff8c00'
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              100,
              30,
              750,
              40
            ]
          }
        })

        map.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'covid',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
          }
        })

        map.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'covid',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': '#ffa332',
            'circle-radius': 7,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#ffa332'
          }
        })
      }

      map.on('style.load', function() {
        addLayers(map)
      })

      map.on('click', 'clusters', function(e) {
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        })
        var clusterId = features[0].properties.cluster_id
        map
          .getSource('covid')
          .getClusterExpansionZoom(clusterId, function(err, zoom) {
            if (err) return

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: map.getZoom() + 1
            })
          })
      })

      map.on('click', 'unclustered-point', function(e) {
        let coordinates = e.features[0].geometry.coordinates.slice()
        const country = e.features[0].properties.country
        const province = e.features[0].properties.province
        const title = country + (province ? ` - ${province}` : '')
        const cc = e.features[0].properties.confirmed_count
        const rc = e.features[0].properties.recovered_count
        const dc = e.features[0].properties.dead_count

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`
            <div class="popup">
              <p class="popup_title">Case / ${title}</p>
              <div class="popup_item item_confirmed">
                <span>Confirmed</span>
                <span>${cc}</span>
              </div>
              <div class="popup_item item_recovered">
                <span>Recovered</span>
                <span>${rc}</span>
              </div>
              <div class="popup_item item_dead">
                <span>Dead</span>
                <span>${dc}</span>
              </div>
            </div>
          `)
          .addTo(map)
      })

      map.on('mouseenter', 'clusters', function() {
        map.getCanvas().style.cursor = 'pointer'
      })

      map.on('mouseleave', 'clusters', function() {
        map.getCanvas().style.cursor = ''
      })
    }
  },
  mounted() {
    if (process.env.accessToken) this.createMap(process.env.accessToken)
  }
}
</script>

<style lang="scss" scoped>
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

/deep/ .popup {
  &_item {
    span {
      &:first-child {
        font-weight: 300;
      }
    }
    &.item_confirmed {
      span:last-child {
        color: #ffa332;
      }
    }
    &.item_recovered {
      span:last-child {
        color: #66a266;
      }
    }
    &.item_dead {
      span:last-child {
        color: #b20000;
      }
    }
  }
}
</style>