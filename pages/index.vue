<template>
  <div class="page" :class="{ 'is-open': isOpen }">
    <LazyHydrate ssr-only :trigger-hydration="!!latest">
      <Latest :data="latest" size="large" />
    </LazyHydrate>
    <LazyHydrate when-idle>
      <Search @search="onToggle" />
    </LazyHydrate>
    <LazyHydrate ssr-only :trigger-hydration="isOpen">
      <div class="overview-wrapper">
        <div class="overview-background">
          <Overview @close="onToggle" />
        </div>
      </div>
    </LazyHydrate>
    <LazyHydrate when-idle>
      <div class="map-wrapper">
        <Map :data="data" />
      </div>
    </LazyHydrate>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LazyHydrate from 'vue-lazy-hydration'
const Latest = () => import('~/components/Latest')
const Search = () => import('~/components/Search')
const Overview = () => import('~/components/Overview')
const Map = () => import('~/components/Map')

export default {
  components: {
    LazyHydrate,
    Latest,
    Search,
    Overview,
    Map
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
  methods: {
    onToggle() {
      this.isOpen = !this.isOpen
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

    /deep/ .overview-wrapper {
      z-index: 10;
      transform: scale(1);
      
      .overview-background {
        opacity: 1;

        .overview {
          animation: blowUpOverview .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
        }
      }

      & + .map-wrapper {
        animation: blowUpMap .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
      }
    }
  }
}

.map-wrapper {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-color: #191a1a;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  transform: scale(1);
  transition: transform 0.8s ease;
}

/deep/ .overview-wrapper {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  transform: scale(0);
  transition: 0.4s ease;

  .overview-background {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    opacity: 0;
    transition: opacity 0.5s ease;

    .overview {
      animation: blowOutOverview .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
    }
  }

  & + .map-wrapper {
    transition: 0.5s ease;
    animation: blowOutMap .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
  }
}

@keyframes blowUpOverview {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes blowUpMap {
  0% {
    transform: scale(1);
  }
  99.9% {
    transform: scale(2);
  }
  100% {
    transform: scale(0);
  }
}

@keyframes blowOutOverview {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

@keyframes blowOutMap {
  0% {
    transform:scale(2);
  }
  100% {
    transform:scale(1);
  }
}
</style>