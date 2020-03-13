<template>
  <div>
    <Map :data="data" />
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
      'data'
    ])
  },
  data() {
    return {}
  }
}
</script>
