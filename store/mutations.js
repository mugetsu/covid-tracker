export default {
  SET_DATA: (state, data) => {
    const {
      confirmed,
      deaths,
      recovered
      // latest
    } = data
    const dataCollection = {
      type: 'FeatureCollection',
      features: []
    }
    // const toCollection = (status, locations, collection) => {
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
    // }
    // toCollection('confirmed', confirmed.locations, dataCollection)
    // toCollection('recovered', recovered.locations, dataCollection)
    // toCollection('dead', deaths.locations, dataCollection)
    state.data = dataCollection
  },
  SET_CONFIRMED: (state, confirmed) => {
    const { locations } = confirmed
    const confirmedCollection = {
      type: 'FeatureCollection',
      features: []
    }
    locations.forEach((location, index) => {
      const cluster_id = location.country_code + (location.province ? `_${location.province}` : '') + `_${index}`
      confirmedCollection.features.push({
        type: 'Feature',
        properties: {
          cluster_id: cluster_id,
          state: 1,
          country: location.country,
          country_code: location.country_code,
          history: location.history,
          latest: location.latest,
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
    state.confirmed = confirmedCollection
  },
  SET_RECOVERED: (state, recovered) => {
    state.recovered = recovered
  },
  SET_DEATHS: (state, deaths) => {
    state.deaths = deaths
  },
  SET_LATEST: (state, latest) => {
    state.latest = latest
  }
}