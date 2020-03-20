<template>
  <div class="page" :class="{ 'is-open': isOpen }">
    <div class="map-wrapper">
      <Map :data="data" />
    </div>
    <Latest :data="latest" size="large" />
    <Search />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Latest from '~/components/Latest'
import Map from '~/components/Map'
import Search from '~/components/Search'

export default {
  components: {
    Latest,
    Map,
    Search
  },
  computed: {
    ...mapGetters([
      'data',
      'latest'
    ])
  },
  data() {
    return {
      isOpen: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
}
</script>

<style lang="scss" scoped>
.page {
  position: absolute;
  display: flex;
  justify-content: stretch;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &.is-open {
    .map-wrapper {
      transform: translate3d(0, 92%, 0);
    }
  }
}

.map-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: #191a1a;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  transform: translate3d(0, 0%, 0);
  transition: transform 0.8s ease;
}
</style>