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
  methods: {
    createMap(token) {
      const self = this
      const mapboxgl = require('mapbox-gl/dist/mapbox-gl')
      mapboxgl.accessToken = token

      let totals
      let markers = {}
      let markersOnScreen = {}
      let point_counts = []
      const colors = ['#ffa332', '#66a266', '#b20000']

      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [122, 13],
        zoom: 1.6
      })

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
              '#ffa500',
              1,
              '#ffa500'
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
            'circle-color': '#ffe4b2',
            'circle-radius': 7,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#ffe4b2'
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
              zoom: zoom
            })
          })

        self.$gtag('event', 'click', {
          event_category: 'clustered',
          event_label: 'clustered click',
          value: clusterId
        })
      })

      map.on('click', 'unclustered-point', function(e) {
        let coordinates = e.features[0].geometry.coordinates.slice()
        const country = e.features[0].properties.country
        const province = e.features[0].properties.province
        const title = (province ? `${province}, ` : '') + country
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
              <p class="popup_title">${title}</p>
              <div class="popup_item item_confirmed">
                <span>Confirmed</span>
                <span class="value">${cc}</span>
              </div>
              <div class="popup_item item_recovered">
                <span>Recovered</span>
                <span class="value">${rc}</span>
              </div>
              <div class="popup_item item_dead">
                <span>Dead</span>
                <span class="value">${dc}</span>
              </div>
            </div>
          `)
          .addTo(map)
        
        self.$gtag('event', 'click', {
          event_category: 'unclustered',
          event_label: 'unclustered click',
          value: title
        })
      })

      map.on('mouseenter', 'clusters', _ => map.getCanvas().style.cursor = 'pointer')
      map.on('mouseleave', 'clusters', _ => map.getCanvas().style.cursor = '')
      map.on('mouseenter', 'unclustered-point', _ => map.getCanvas().style.cursor = 'pointer')
      map.on('mouseleave', 'unclustered-point', _ => map.getCanvas().style.cursor = '')
    }
  },
  mounted() {
    if (process.env.accessToken) this.createMap(process.env.accessToken)
  }
}
</script>

<style lang="scss" scoped>
/deep/ #map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;

  .mapboxgl-ctrl-bottom-left {
    .mapboxgl-ctrl {
      margin: 0 0 16px 24px;
    }
  }

  .mapboxgl-ctrl-attrib {
    &.mapboxgl-compact {
      margin: 0 24px 14px 0;
    }
  }
}

/deep/ .popup {
  margin: 0 16px 0 8px;

  &_title {
    margin-top: 4px;
    margin-bottom: 8px;
    font-size: 16px;
  }

  &_item {

    span {
      font-weight: 700;
      font-size: 14px;

      &:first-child {
        font-weight: 300;
      }
    }

    &.item_confirmed {

      .value {
        color: #ffa500;
      }
    }

    &.item_recovered {

      .value {
        color: #66a266;
      }
    }

    &.item_dead {

      .value {
        color: #b20000;
      }
    }
  }
}
</style>