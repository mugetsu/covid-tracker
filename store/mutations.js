export default {
  SET_DATA: (state, data) => {
    const {
      confirmed,
      deaths,
      recovered
    } = data
    const dataCollection = {
      type: 'FeatureCollection',
      features: []
    }
    confirmed.locations.forEach((location, index) => {
      const recovered_locations = recovered.locations[index]
      const dead_locations = deaths.locations[index]
      let recovered_count = 0
      let dead_count = 0
      if (
        location.coordinates.long === recovered_locations.coordinates.long
        && location.coordinates.lat === recovered_locations.coordinates.lat
      ) {
        recovered_count = recovered_locations.latest
      }
      if (
        location.coordinates.long === dead_locations.coordinates.long
        && location.coordinates.lat === dead_locations.coordinates.lat
      ) {
        dead_count = dead_locations.latest
      }
      dataCollection.features.push({
        type: 'Feature',
        properties: {
          country: location.country,
          country_code: location.country_code,
          confirmed_count: location.latest,
          recovered_count: recovered_count,
          dead_count: dead_count,
          province: location.province
        },
        geometry: {
          type: 'Point',
          coordinates: [
            location.coordinates.long,
            location.coordinates.lat
          ]
        }
      })
    })
    state.data = dataCollection
  },
  SET_LATEST: (state, latest) => {
    state.latest = latest
  },
  SET_TIMELINE: (state, timeline) => {
    const {
      confirmed,
      deaths
    } = timeline
    const dataTimeline = []
    confirmed.locations.forEach((location, index) => {
      const dead_locations = deaths.locations[index]
      const confirmed_history = Object.entries(location.history)
      let dead_history_count = 0
      for (const [i, value] of confirmed_history.entries()) {
        const key = value[0]
        const count = value[1]
        if (
          location.country_code === dead_locations.country_code
          && dead_locations.history.hasOwnProperty(key)
        ) {
          dead_history_count = dead_locations.history[key]
        }
        dataTimeline.push({
          date: key,
          cases: []
        })
        // {
        //   country_code: location.country_code,
        //   confirmed: count,
        //   deaths: dead_history_count
        // }
      }
    })
    state.timeline = dataTimeline
  }
}