<template>
  <div class="results">
    <div class="cases-wrapper">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="cases">
        <div
          v-if="item.label === 'Confirmed'"
          class="case-icon">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="26" height="26"
            viewBox="0 0 172 172"
            style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M149.28546,31.29387l-11.86117,-8.0625c-3.28185,-2.22236 -7.77825,-1.36959 -9.97476,1.88642l-58.14303,85.74159l-26.71996,-26.71996c-2.79087,-2.79087 -7.33894,-2.79087 -10.12981,0l-10.15565,10.15565c-2.79087,2.79087 -2.79087,7.33894 0,10.15565l41.08774,41.08774c2.29988,2.29988 5.91767,4.05709 9.17368,4.05709c3.25601,0 6.53786,-2.04146 8.65685,-5.11658l69.97837,-103.23618c2.22235,-3.25601 1.36959,-7.72656 -1.91226,-9.94892z"></path></g></g></svg>
        </div>
        <div
          v-if="item.label === 'Recovered'"
          class="case-icon">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="24" height="24"
            viewBox="0 0 172 172"
            style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M86,103.30033l-33.7335,-33.7335l10.13367,-10.13367l23.59983,23.59983l54.58133,-54.58133c-6.34967,-4.37883 -14.03233,-6.95167 -22.33133,-6.95167c-20.7475,0 -32.25,14.97833 -32.25,14.97833c0,0 -11.5025,-14.97833 -32.25,-14.97833c-21.77233,0 -39.41667,17.64433 -39.41667,39.41667c0,29.89217 35.20267,58.85983 45.01383,68.01167c11.30183,10.535 26.65283,24.08 26.65283,24.08c0,0 15.351,-13.545 26.65283,-24.08c9.81117,-9.15183 45.01383,-38.1195 45.01383,-68.01167c0,-8.299 -2.57283,-15.98167 -6.95167,-22.33133z"></path></g></g></svg>
        </div>
        <div
          v-if="item.label === 'Dead'"
          class="case-icon">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="24" height="24"
            viewBox="0 0 172 172"
            style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M86,14.33333c-35.6255,0 -64.5,27.27633 -64.5,60.91667c0,10.01183 2.63017,19.42167 7.16667,27.74933v26.00067h28.66667v28.66667h57.33333v-28.66667h28.66667v-26.00067c4.5365,-8.32767 7.16667,-17.7375 7.16667,-27.74933c0,-33.64033 -28.8745,-60.91667 -64.5,-60.91667zM64.5,114.66667c-7.91917,0 -14.33333,-6.41417 -14.33333,-14.33333c0,-7.91917 6.41417,-14.33333 14.33333,-14.33333c7.91917,0 14.33333,6.41417 14.33333,14.33333c0,7.91917 -6.41417,14.33333 -14.33333,14.33333zM91.73333,136.16667c-3.58333,0 -5.01667,-2.86667 -5.73333,-5.01667c-0.71667,2.15 -2.86667,5.01667 -5.73333,5.01667c-1.43333,0 -3.58333,-1.43333 -3.58333,-3.58333c0,-5.01667 5.73333,-14.33333 9.31667,-15.05c3.58333,0.71667 9.31667,10.03333 9.31667,15.05c0,2.15 -1.43333,3.58333 -3.58333,3.58333zM107.5,114.66667c-7.91917,0 -14.33333,-6.41417 -14.33333,-14.33333c0,-7.91917 6.41417,-14.33333 14.33333,-14.33333c7.91917,0 14.33333,6.41417 14.33333,14.33333c0,7.91917 -6.41417,14.33333 -14.33333,14.33333z"></path></g></g></svg>
        </div>
        <AnimatedNumber
          v-if="showValue"
          :value="item.value || 0"
          :formatValue="formatNumber"
          :duration="duration"
          :style="`color: ${item.color}`" />
      </div>
    </div>
    <div
      v-if="showChart"
      class="chart-wrapper">
      <client-only>
        <LineChart
          :chart-data="logarithmicData"
          :options="chartOptions" />
      </client-only>
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
            position: 'right',
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
      return parseFloat(s.toFixed(0)).toLocaleString('en')
    }
  }
}
</script>


<style lang="scss" scoped>
.results {

  .cases-wrapper,
  .chart-wrapper {
    position: relative;
    display: block;
    margin-bottom: 12px;
  }

  .cases {
    display: inline-block;
    vertical-align: top;
    margin-left: 24px;

    &:first-child {
      margin-left: 0;
    }

    .case-icon {
      display: inline-block;
      vertical-align: top;
      width: 24px;
      height: 24px;
    }
  }
}
</style>