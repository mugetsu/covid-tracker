export default {
  async nuxtServerInit({ commit }, ctx) {
    await Promise
      .all([
        this.$axios.get(process.env.NODE_ENV !== 'production' ? 'latest.json' : '/latest'),
        this.$axios.get(process.env.NODE_ENV !== 'production' ? 'locations.json' : '/all')
      ])
      .then(res => {
        commit('SET_LATEST', res[0].data.latest)
        commit('SET_DATA', res[1].data)
        commit('SET_COUNTRIES', res[1].data)
      })
      .catch(err => {
        console.log('API error.', err)
      })
  },
  // getCasesByCountry({ state, commit }, payload) {
  //   const country_case = state.data.features.filter(feature => {
  //     if (payload.country) {
  //       if (payload.province) {
  //         return feature.properties.country === payload.country && feature.properties.province === payload.province
  //       } else {
  //         return feature.properties.country === payload.country
  //       }
  //     }
  //   })
  //   commit('SET_COUNTRY_CASE', country_case)
  // },
  async getResultByCountry({ commit }, id) {
    await this.$axios
      .get(
        process.env.NODE_ENV !== 'production' ? 'location-14.json' : `/locations/${id}`
      )
      .then(res => {
        if (res.status === 200) {
          const { location } = res.data
          commit('SET_RESULT', location)
        }
      })
      .catch(err => {
        console.log('API error.', err)
      })
  }
}
