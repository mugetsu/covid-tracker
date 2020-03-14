export default {
  async nuxtServerInit({ commit }, ctx) {
    await this.$axios.get(
      process.env.NODE_ENV !== 'production' ? 'covid.json' : '/all'
    )
      .then(res => {
        if (res.status === 200) {
          const { latest } = res.data
          commit('SET_DATA', res.data)
          commit('SET_LATEST', latest)
        }
      })
      .catch(err => {
        console.log('API error.', err)
      })
  }
}
