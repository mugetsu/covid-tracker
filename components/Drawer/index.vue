<template>
  <div class="drawer">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Drawer',
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      activeItem: this.index,
      items: []
    }
  },
  methods: {
    changeItem(newIndex) {
      if (this.activeItem === newIndex) return
      this.items[this.activeItem].deactivate()
      this.items[newIndex].activate()
      this.activeItem = newIndex
      this.$gtag('event', 'drawer', {
        eventAction: 'change',
        eventLabel: 'drawer change',
        eventValue: this.items[this.activeItem].title
      })
    }
  },
  mounted() {
    if (this.items.length) {
      this.items[this.activeItem].isActive = true
    }
  }
}
</script>


<style lang="scss" scoped>
.drawer {
  display: flex;
  flex-direction: column;
  height: 92vh;
}
</style>