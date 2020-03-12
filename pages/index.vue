<template>
  <div>
    <Map :data="data" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Map from '~/components/Map'

export default {
  loading: false,
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
