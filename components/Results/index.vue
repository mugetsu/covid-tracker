<template>
  <div class="results">
    <div
      v-if="showChart"
      class="chart-wrapper">
      <client-only>
        <LineChart
          :chart-data="logarithmicData"
          :options="chartOptions" />
      </client-only>
    </div>
    <div class="cases-wrapper">
      <p
        v-for="(item, index) in items"
        :key="index"
        class="cases">
        {{ item.label }}
        <AnimatedNumber
          v-if="showValue"
          :value="item.value"
          :formatValue="formatNumber"
          :duration="duration"
          :style="`color: ${item.color}`" />
      </p>
    </div>
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
    showValue: Boolean,
    chartData: Object,
    showChart: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    logarithmicData() {
      const cd = this.chartData
      const labels = Object.keys(cd.confirmed_history)
      return {
        labels: labels,
        datasets: [
          {
            data: Object.values(cd.confirmed_history),
            label: 'Confirmed',
            borderColor: '#ffa500',
            fontColor: '#ffffff',
            fill: false
          },
          {
            data: Object.values(cd.recovered_history),
            label: 'Recovered',
            borderColor: '#66a266',
            fontColor: '#ffffff',
            fill: false
          },
          {
            data: Object.values(cd.dead_history),
            label: 'Deaths',
            borderColor: '#b20000',
            fontColor: '#ffffff',
            fill: false
          }
        ]
      }
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        legend: false,
        // legend: {
        //   position: 'bottom',
        //   labels: {
        //     boxWidth: 10,
        //     fontColor: '#ffffff'
        //   }
        // },
        scales: {
          xAxes: [{
            ticks: {
              fontColor: '#ffffff'
            }
          }],
          yAxes: [{
            ticks: {
              type: 'logarithmic',
              fontColor: '#ffffff'
            }
          }]
        }
      }
    }
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

  .chart-wrapper {
    position: relative;
    display: inline-block;
    margin-bottom: 24px;
    width: 100%;
    vertical-align: top;

    @media only screen and (min-width: 768px) {
      margin-right: 24px;
      width: 50%;

      & ~ .cases-wrapper {
        display: inline-block;
        margin-top: 0;
        vertical-align: top;
      }
    }
  }

  .cases-wrapper {
    margin-top: 16px;

    .cases {
      margin-bottom: 12px;

      span {
        font-weight: 700;
      }
    }
  }
}
</style>