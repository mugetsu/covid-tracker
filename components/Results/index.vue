<template>
  <div class="results">
    <p
      v-for="(item, index) in items"
      :key="index"
      class="cases">
      {{ item.label }}
      <animated-number
        v-if="showValue"
        :value="item.value"
        :formatValue="formatNumber"
        :duration="duration"
        :style="`color: ${item.color}`" />
    </p>
  </div>
</template>

<script>
import AnimatedNumber from 'animated-number-vue'

export default {
  name: 'Results',
  components: {
    AnimatedNumber
  },
  props: {
    items: Array,
    duration: Number,
    showValue: Boolean
  },
  methods: {
    formatNumber(s) {
      return s.toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>


<style lang="scss" scoped>
.results {

  .cases {
    margin-bottom: 12px;

    span {
      font-weight: 700;
    }
  }
}
</style>