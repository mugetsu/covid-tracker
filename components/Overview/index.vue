<template>
  <div class="overview">
    <div class="title">
      {{ result.title }}
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
        <ul class="list">
          <li>
            <p>Known Cases</p>
            <Latest :data="result.latest" :invert="true" />
          </li>
          <li class="rates rates--mortality">
            <p>Mortality Rate</p>
            <p class="percentage">{{ result.mortality_rate }}%</p>
          </li>
          <!-- <li class="rates rates--recovered">
            <p>Recovered Rate</p>
            <p class="percentage">{{ result.recovered_rate }}%</p>
          </li> -->
        </ul>
      </div>
      <div class="section chart">
        <p>Timeline</p>
        <p class="sub">Click / Drag chart to view series data</p>
        <client-only>
          <apexchart height="320" type="line" :options="chartOptions" :series="result.series"></apexchart>
        </client-only>
      </div>
      <div class="section timeline">
        <p>Daily</p>
        <ul>
          <li
            v-for="(item, index) in timeline"
            :key="index">
            <span class="timestamp">{{ item.timestamp.month }} {{ item.timestamp.date }}, {{ item.timestamp.year }}</span>
            <span class="summary" v-html="item.summary" />
          </li>
        </ul>
        <div class="pagination">
          <button
            class="controls prev"
            :class="{ 'is-disabled': currentPage <= 1 }"
            :disabled="currentPage <= 1"
            @click="previous">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              width="40" height="40"
              viewBox="0 0 172 172"
              style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#000000"><path d="M86,14.33333c-39.5815,0 -71.66667,32.08517 -71.66667,71.66667c0,39.5815 32.08517,71.66667 71.66667,71.66667c39.5815,0 71.66667,-32.08517 71.66667,-71.66667c0,-39.5815 -32.08517,-71.66667 -71.66667,-71.66667zM78.83333,122.34217l-10.75,-10.75l25.59217,-25.59217l-25.59217,-25.59217l10.75,-10.75l36.34217,36.34217z"></path></g></g>
            </svg>
          </button>
          <span>{{ currentPage }} / {{ totalPage }}</span>
          <button
            class="controls next"
            :class="{ 'is-disabled': currentPage >= totalPage }"
            :disabled="currentPage >= totalPage"
            @click="next">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              width="40" height="40"
              viewBox="0 0 172 172"
              style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#000000"><path d="M86,14.33333c-39.5815,0 -71.66667,32.08517 -71.66667,71.66667c0,39.5815 32.08517,71.66667 71.66667,71.66667c39.5815,0 71.66667,-32.08517 71.66667,-71.66667c0,-39.5815 -32.08517,-71.66667 -71.66667,-71.66667zM78.83333,122.34217l-10.75,-10.75l25.59217,-25.59217l-25.59217,-25.59217l10.75,-10.75l36.34217,36.34217z"></path></g></g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const Latest = () => import('~/components/Latest')

export default {
  name: 'Overview',
  components: {
    Latest
  },
  computed: {
    ...mapGetters([
      'result'
    ]),
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
        colors: ['#ffa500', '#b20000', '#66a266'],
        stroke: {
          width: [4, 4, 4]
        },
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd MMM'
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
          horizontalAlign: 'left'
        }
      }
    },
    getTimeline() {
      return this.result.timeline
    },
    totalDaily() {
      return this.result.timeline.length
    },
    totalPage() {
      return Math.ceil(this.totalDaily / this.perPage)
    }
  },
  data() {
    return {
      perPage: 6,
      currentPage: 1,
      timeline: []
    }
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
    paginate(a, perPage, page) {
      return a.slice(perPage * (page - 1), perPage * page)
    },
    previous() {
      if (this.currentPage >= 1) {
        this.timeline = this.paginate(this.getTimeline, this.perPage, --this.currentPage)
      }
    },
    next() {
      if (this.currentPage <= this.totalDaily) {
        this.timeline = this.paginate(this.getTimeline, this.perPage, ++this.currentPage)
      }
    }
  },
  mounted() {
    this.timeline = this.paginate(this.getTimeline, this.perPage, 1)
  }
}
</script>

<style lang="scss" scoped>
.overview {
  border-radius: 4px;
  padding: 0 24px 24px;
  width: 624px;
  height: 100%;
  background-color: #ffffff;
  overflow: auto;

  @media only screen and (min-width: 768px) {
    height: 602px;
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
    transform: translateY(calc(-50% - 4px));
    transition: all .3s;
    fill: rgba(0,0,0,.5);
    
    svg {
      cursor: pointer;
    }
  }

  .content {
    margin-bottom: 24px;
    color: #000000;
  }

  .title {
    position: sticky;
    top: 0;
    z-index: 10;
    border-bottom: 1px solid #cccccc;
    margin: 0 0 12px;
    padding: 32px 26px 8px 0;
    font-size: 32px;
    background: #ffffff;
  }

  .section {
    margin-top: 16px;
    
    &:first-of-type {
      margin-top: 0;
    }

    & > p {
      font-size: 24px;
      font-weight: 300;

      &.sub {
        margin-top: 8px;
        font-size: 14px;
        color: #666666;
      }
    }

    .list {
      margin: 0 -16px;
      padding: 0;

      @media only screen and (min-width: 768px) {
        display: flex;
        justify-content: flex-start;
      }

      li {
        display: block;
        margin-top: 16px;
        padding: 0 16px;

        @media only screen and (min-width: 768px) {
          margin-top: 0;
        }

        &:first-child {
          margin-top: 0;
        }

        & > p {
          font-size: 24px;
          font-weight: 300;
        }
      }
    }
  }

  .cases {
    /deep/ .latest {
      position: relative;

      ul {
        display: flex;
        margin: 0 0 0 -12px;
        flex-wrap: wrap;

        li {
          display: inline-flex;
          margin-left: 12px;
          margin-top: 8px;
        }
      }
    }
  }

  .rates {

    &--mortality {
      font-weight: 700;

      .percentage {
        margin-top: 8px;
        color: #b20000;
      }
    }

    &--recovered {
      font-weight: 700;

      .percentage {
        margin-top: 8px;
        color: #66a266;
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

  /deep/ .timeline {

    ul {
      margin: 8px 0 0;
      padding: 0;
    }

    li {
      display: flex;
      padding: 8px;
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;

      &:nth-child(even) {
        background-color: #f1f1f1;
      }
    }

    .timestamp {
      padding-right: 16px;
      font-weight: 300;
      color: #666666;
      min-width: 100px;
    }

    .confirmed {
      font-weight: 700;
      color: #ffa500;
    }

    .deaths {
      font-weight: 700;
      color: #b20000;
    }

    .recovered {
      font-weight: 700;
      color: #66a266;
    }

    .pagination {
      text-align: center;

      span {
        display: inline-block;
        margin: 8px 0;
        line-height: 40px;
        vertical-align: top;
      }
    }
    
    .controls {
      border: 0;
      margin: 8px 4px;
      padding: 0;
      width: 40px;
      height: 40px;
      display: inline-block;
      vertical-align: top;
      background: none;
      cursor: pointer;
      outline: none;

      &.is-disabled {
        opacity: 0.6;
      }

      &.prev {

         svg {
           transform: rotate(-180deg);
         }
      }
    }
  }
}
</style>