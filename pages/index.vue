<template>
  <div>
    <Map :data="$store.state.data" />
  </div>
</template>

<script>
import Map from '~/components/Map'

export default {
  async fetch ({ app: { $axios }, store, params }) {
    const { data } = await $axios.get(`${process.env.apiUrl}/all`)
    store.commit('SET_DATA', data)
  },
  components: {
    Map
  }
}
</script>
