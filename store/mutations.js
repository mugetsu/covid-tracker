export default {
  SET_DATA: (state, data) => {
    const {
      confirmed,
      deaths,
      recovered,
      latest
    } = data
    const dataCollection = {
      type: 'FeatureCollection',
      features: []
    }
    const toCollection = (state, locations, collection) => {
      locations.forEach((location, index) => {
        const cluster_id = location.country_code + (location.province ? `_${location.province}` : '') + `_${index}`
        collection.features.push({
          type: 'Feature',
          properties: {
            cluster_id: cluster_id,
            state: state,
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
    }
    toCollection(0, deaths.locations, dataCollection)
    toCollection(1, confirmed.locations, dataCollection)
    toCollection(2, recovered.locations, dataCollection)
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
  SET_DEATHS: (state, deaths) => {
    const { locations } = deaths
    const deathsCollection = {
      type: 'FeatureCollection',
      features: []
    }
    locations.forEach((location, index) => {
      const cluster_id = location.country_code + (location.province ? `_${location.province}` : '') + `_${index}`
      deathsCollection.features.push({
        type: 'Feature',
        properties: {
          cluster_id: cluster_id,
          state: 0,
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
    state.deaths = deathsCollection
  },
  SET_LATEST: (state, latest) => {
    state.latest = latest
  },
  SET_RECOVERED: (state, recovered) => {
    state.recovered = recovered
  }
}