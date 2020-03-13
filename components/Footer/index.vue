<template>
  <div class="wrap-footer">
    <footer>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.wrap-footer {
  position: absolute;
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

  p {
    // margin-bottom: 30px;
  }

  a {
    display: inline-block;
    font-weight: 400;
    text-transform: uppercase;
    text-decoration: none;
    color: #ffffff;
  }
}
</style>