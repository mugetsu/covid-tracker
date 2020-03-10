export default {
  SET_CONFIRMED: (state, confirmed) => {
    const { locations } = confirmed
    const confirmedCollection = {
      type: 'FeatureCollection',
      features: []
    }
    locations.forEach(location => {
      confirmedCollection.features.push({
        type: 'Feature',
        properties: {
          state: 'confirmed',
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
    locations.forEach(location => {
      deathsCollection.features.push({
        type: 'Feature',
        properties: {
          state: 'dead',
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