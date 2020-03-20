<template>
  <div class="overview">
    <div class="close" @click="onClose">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
        <g opacity="0.3">
          <path d="M1.5 1.5L15 15" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M15 1.5L1.5 15" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </g>
      </svg>
    </div>
    <div class="content">
      <p class="title">{{ title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Overview',
  props: {
    data: Object
  },
  computed: {
    title() {
      const o = this.data
      return o.province ? `${o.province}, ${o.country}` : o.country
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    onClose() {
      this.$emit('close')
    }
  },
  mounted() {
    if (this.data.country) this.isOpen = true
  }
}
</script>

<style lang="scss" scoped>
.overview {
  width: 100%;
  background-color: #ffffff;

  .close {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 16px;
    height: 16px;
    cursor: pointer;
    z-index: 1;
    transition: all .3s;
    fill: rgba(0,0,0,.5);
  }

  .content {
    padding: 0 24px;
    color: #000000;
  }

  .title {
    border-bottom: 1px solid #cccccc;
    margin: 32px 0 12px;
    padding-bottom: 8px;
    font-size: 32px;
    font-weight: 300;
  }
}
</style>