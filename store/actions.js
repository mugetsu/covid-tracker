export default {
  async getData({ commit }, ctx) {
    await this.$axios.get('/all')
      .then(res => {
        if (res.status === 200) {
          commit('SET_DATA', res.data)
        }
      })
      .catch(err => {
        console.log('API error.', err)
      })
  }
}
