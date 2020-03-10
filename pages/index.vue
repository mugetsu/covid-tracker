<template>
  <div>
    <Map
      :confirmed="confirmed"
      :dead="deaths" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Map from '~/components/Map'

export default {
  components: {
    Map
  },
  computed: {
    ...mapGetters([
      'confirmed',
      'deaths'
    ])
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">
</style>
