<template>
  <div class="wrap-footer">
    <footer>
      <Search />
      <!-- <p>© 2020 COVID-19 Tracker</p> -->
    </footer>
  </div>
</template>

<script>
import Search from '~/components/Search'

export default {
  name: 'Footer',
  components: {
    Search
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.wrap-footer {
  position: relative;
  z-index: 1;
  padding: 0 16px;
  flex-shrink: 0;

  footer {
    font-weight: 300;
    font-size: 1rem;
    text-align: right;
    text-transform: uppercase;
    color: #ffffff;
  }
}
</style>