export default {
  async nuxtServerInit({ commit }, ctx) {
    await Promise.all([
      this.$axios.get(
        process.env.NODE_ENV !== 'production'
          ? 'latest.json'
          : `http://${process.env.HOST}:${process.env.PORT}/api/latest`
      ),
      this.$axios.get(
        process.env.NODE_ENV !== 'production'
          ? 'locations.json'
          : `http://${process.env.HOST}:${process.env.PORT}/api/locations`
      )
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
  async getOverviewByCountry({ commit }, id) {
    await this.$axios
      .get(
        process.env.NODE_ENV !== 'production'
          ? 'location-16.json'
          : `http://${process.env.HOST}:${process.env.PORT}/api/locations/${id}`
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
