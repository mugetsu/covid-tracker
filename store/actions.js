export default {
  async nuxtServerInit({ commit }, ctx) {
    await this.$axios.get('/all')
      .then(res => {
        if (res.status === 200) {
          const {
            confirmed,
            deaths,
            latest,
            recovered
          } = res.data
          commit('SET_CONFIRMED', confirmed)
          commit('SET_DEATHS', deaths)
          commit('SET_LATEST', latest)
          commit('SET_RECOVERED', recovered)
        }
      })
      .catch(err => {
        console.log('API error.', err)
      })
  }
}
