<template>
  <div class="wrapper">
    <div class="main-content">
      <nuxt />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
  background-color: rgba(18, 18, 18, 1);
}

p {
  margin: 0;
}

.wrapper {
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.main-content {
  display: flex;
  flex-grow: 1;
}
</style>
