<template>
  <div
    class="drawer-item"
    :class="{
      'is-active': isActive
    }"
    @click="onClick">
    <h2 class="drawer-item-title">{{ title }}</h2>
    <div class="drawer-item-content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DrawerItem',
  props: {
    title: String
  },
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    activate() {
      this.isActive = true
    },
    deactivate() {
      this.isActive = false
    },
    onClick() {
      this.$parent.changeItem(this.$parent.items.indexOf(this))
    }
  },
  created() {
    this.$parent.items.push(this)
  }
}
</script>

<style lang="scss" scoped>
.drawer-item {
  display: flex;
  flex-direction: column;
  height: 12.8%;
  width: 100vw;
  margin-bottom: -4px;
  background-color: #343332;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.5);
  transition: .5s ease;
  overflow: hidden;

  &.is-active {
    height: 100%;
  }
  
  .drawer-item-title,
  .drawer-item-content {
    padding: 0 24px;
    white-space: nowrap;
    color: #ffffff;
  }

  .drawer-item-title {
    margin-top: 32px;
    margin-bottom: 24px;
    font-size: 42px;
  }

  .drawer-item-content {
    height: 100%;
    color: #f2f2f2;
    overflow: auto;
  }
}
</style>
