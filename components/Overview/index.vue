<template>
  <div class="overview">
    <div class="title">
      {{ title }}
      <a class="close" href="#" @click.prevent="onClose">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
          <g opacity="0.3">
            <path d="M1.5 1.5L15 15" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M15 1.5L1.5 15" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </g>
        </svg>
      </a>
    </div>
    <div class="content">
      <div class="section cases">
        <p>Known Cases</p>
        <Latest :data="latest" :invert="true" />
      </div>
      <div class="section chart">
        <p>Daily</p>
        <p class="sub">Click chart to view daily cases</p>
        <client-only>
          <apexchart height="350" type="line" :options="chartOptions" :series="series"></apexchart>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Latest from '~/components/Latest'

export default {
  name: 'Overview',
  components: {
    Latest
  },
  computed: {
    ...mapGetters([
      'result'
    ]),
    title() {
      const o = this.result
      return o.province ? `${o.province}, ${o.country}` : o.country
    },
    latest() {
      return this.result.latest
    },
    chartOptions() {
      return {
        chart: {
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#ffa500", "#b20000", "#66a266"],
        stroke: {
          width: [4, 4, 4]
        },
        xaxis: {
          type: "datetime",
          labels: {
            format: "dd MMM"
          }
        },
        yaxis: {
          opposite: true,
          labels: {
            align: 'right',
            offsetX: -20
          }
        },
        legend: {
          show: false,
          horizontalAlign: "left"
        }
      }
    },
    series() {
      const timelineConfirmed = Object.entries(this.result.timelines.confirmed.timeline).map(o => o)
      const timelineDeaths = Object.entries(this.result.timelines.deaths.timeline).map(o => o)
      const timelineRecovered = Object.entries(this.result.timelines.recovered.timeline).map(o => o)
      return [
        {
          name: "Confirmed",
          data: timelineConfirmed
        },
        {
          name: "Deaths",
          data: timelineDeaths
        },
        {
          name: "Recovered",
          data: timelineRecovered
        }
      ]
    }
  },
  data() {
    return {}
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
    formatDate(val) {
      const d = new Date(val)
      const dtf = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      })
      const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(d)
      return {
        month: mo,
        date: da,
        year: ye
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.overview {
  border-radius: 4px;
  padding: 24px;
  width: 624px;
  height: 100%;
  background-color: #ffffff;

  @media only screen and (min-width: 768px) {
    height: auto;
  }

  .close {
    position: absolute;
    top: 50%;
    right: 0;
    width: 16px;
    height: 16px;
    display: block;
    cursor: pointer;
    z-index: 1;
    transform: translateY(calc(-50% - 16px));
    transition: all .3s;
    fill: rgba(0,0,0,.5);
    
    svg {
      cursor: pointer;
    }
  }

  .content {
    color: #000000;
  }

  .title {
    position: relative;
    border-bottom: 1px solid #cccccc;
    margin: 32px 0 12px;
    padding-bottom: 8px;
    font-size: 32px;

    @media only screen and (min-width: 768px) {
      margin: 0 0 12px;
    }
  }

  .section {
    margin-top: 24px;
    
    &:first-of-type {
      margin-top: 0;
    }

    & > p {
      margin-bottom: 8px;
      font-size: 24px;
      font-weight: 300;

      &.sub {
        font-size: 14px;
        color: #666666;
      }
    }
  }

  .cases {
    /deep/ .latest {
      position: relative;

      ul {
        margin: 0;

        li {
          display: inline-flex;
          margin-left: 12px;

          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
  }

  .chart {
    max-width: 624px;

    & > p {
      & + div {
        border: 1px solid #cccccc;
        border-radius: 4px;
        margin-top: 12px;
      }
    }
  }
}
</style>