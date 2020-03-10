<template>
  <div class="wrapper">
    <div class="wrap-header">
      <Header />
    </div>
    <div class="main-content">
      <nuxt />
    </div>
    <div class="wrap-footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    Footer
  },
  head () {
    return {
      title: 'COVID-19 Tracker',
      meta: [
        { hid: 'og:description', name: 'og:description', content: 'tracks COVID-19 around the world.' },
        { hid: 'description', name: 'description', content: 'tracks COVID-19 around the world.' }
      ]
    }
  }
}
</script>

<style lang="scss">
html {
  display: flex;
  font-size: 62.5%;
}

body {
  margin: 0;
  width: 100%;
  font-family: 'Roboto', ;
  font-size: 14px;
  font-weight: 400;
  color: #000000;
  letter-spacing: 0.1rem;
  background-color: #ffffff;
}

.wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.wrap-header,
.wrap-footer {
  padding: 0 16px;
  flex-shrink: 0;
}

.main-content {
  display: flex;
  flex-grow: 1;
}
</style>
