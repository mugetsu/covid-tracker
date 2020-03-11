<template>
  <div>
    <Map :confirmed="confirmed" />
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
      'confirmed'
    ])
  },
  data() {
    return {}
  }
}
</script>
