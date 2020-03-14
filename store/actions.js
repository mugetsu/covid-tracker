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
    console.log(payload)
    // console.log(state.data)
  }
}
