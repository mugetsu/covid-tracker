export default {
  async nuxtServerInit({ commit }, ctx) {
    await this.$axios.get('/all')
      .then(res => {
        if (res.status === 200) {
          const {
            confirmed,
            recovered,
            deaths
            // latest
          } = res.data
          commit('SET_DATA', res.data)
          commit('SET_CONFIRMED', confirmed)
          commit('SET_RECOVERED', recovered)
          commit('SET_DEATHS', deaths)
          // commit('SET_LATEST', latest)
        }
      })
      .catch(err => {
        console.log('API error.', err)
      })
  }
}
