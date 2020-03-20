<template>
  <div class="overview">
    <div class="content">
      <div class="title">
        {{ title }}
        <div class="close" @click="onClose">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
            <g opacity="0.3">
              <path d="M1.5 1.5L15 15" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M15 1.5L1.5 15" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
          </svg>
        </div>
      </div>
      <div class="cases">
        <p>Known Cases</p>
        <Latest :data="latest" :invert="true" />
      </div>
    </div>
  </div>
</template>

<script>
import Latest from '~/components/Latest'

export default {
  name: 'Overview',
  components: {
    Latest
  },
  props: {
    data: Object
  },
  computed: {
    title() {
      const o = this.data
      return o.province ? `${o.province}, ${o.country}` : o.country
    },
    latest() {
      return this.data.latest
    }
  },
  data() {
    return {}
  },
  methods: {
    onClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.overview {
  width: 100%;
  background-color: #ffffff;

  .close {
    position: absolute;
    top: 50%;
    right: 0;
    width: 16px;
    height: 16px;
    cursor: pointer;
    z-index: 1;
    transform: translateY(calc(-50% - 16px));
    transition: all .3s;
    fill: rgba(0,0,0,.5);
  }

  .content {
    padding: 0 24px;
    color: #000000;
  }

  .title {
    position: relative;
    border-bottom: 1px solid #cccccc;
    margin: 32px 0 12px;
    padding-bottom: 8px;
    font-size: 32px;
  }

  .cases {
    font-size: 24px;
    font-weight: 300;

    p {
      margin-bottom: 8px;
    }

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
}
</style>