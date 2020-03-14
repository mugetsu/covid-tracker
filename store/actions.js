export default {
  async nuxtServerInit({ commit }, ctx) {
    await this.$axios.get(
      process.env.NODE_ENV !== 'production' ? 'covid.json' : '/all'
    )
      .then(res => {
        if (res.status === 200) {
          const {
            confirmed,
            latest
          } = res.data
          commit('SET_DATA', res.data)
          commit('SET_LATEST', latest)
          commit('SET_COUNTRIES', confirmed)
        }
      })
      .catch(err => {
        console.log('API error.', err)
      })
  },
  getCasesByCountry({ state, commit }, payload) {
    const country_case = state.data.features.filter(feature => {
      if (payload.country) {
        if (payload.province) {
          return feature.properties.country === payload.country && feature.properties.province === payload.province
        } else {
          return feature.properties.country === payload.country
        }
      }
    })
    commit('SET_COUNTRY_CASE', country_case)
  }
}
