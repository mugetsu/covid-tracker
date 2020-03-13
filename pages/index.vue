<template>
  <div>
    <Map :data="$store.state.data" />
  </div>
</template>

<script>
import Map from '~/components/Map'

export default {
  async fetch ({ app: { $api }, store, params }) {
    const { data } = await $api.get('/all')
    store.commit('SET_DATA', data)
  },
  components: {
    Map
  }
}
</script>
