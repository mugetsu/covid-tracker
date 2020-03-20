<template>
  <div>
    <div 
      class="search"
      :class="{
        'is-open': openSuggestion
      }">
      <div class="search-container">
        <div class="countries-wrapper">
          <input
            ref="countries"
            type="text"
            :value="country"
            placeholder="Country"
            @keydown.enter="enter"
            @keydown.down="down"
            @keydown.up="up"
            @input="change"
          />
        </div>
        <div
          class="provinces-wrapper"
          :class="{
            'is-show': hasSelected && provinces.length && provinces[0].province
          }">
          <select
            ref="provinces"
            @change="onChange">
            <option 
              label="Select State"
              value=""
              selected
              disabled />
            <option 
              v-for="(item, index) in provinces"
              :key="index"
              :label="item.province"
              :value="item.id" />
          </select>
        </div>
        <button
          ref="search"
          :class="{ 'is-disabled': !hasSelected }"
          :disabled="!hasSelected"
          @click="onSearch">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="30" height="30"
            viewBox="0 0 172 172"
            style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M74.53333,17.2c-31.59642,0 -57.33333,25.73692 -57.33333,57.33333c0,31.59642 25.73692,57.33333 57.33333,57.33333c13.73998,0 26.35834,-4.87915 36.24766,-12.97839l34.23203,34.23203c1.43802,1.49778 3.5734,2.10113 5.5826,1.57735c2.0092,-0.52378 3.57826,-2.09284 4.10204,-4.10204c0.52378,-2.0092 -0.07957,-4.14458 -1.57735,-5.5826l-34.23203,-34.23203c8.09924,-9.88932 12.97839,-22.50768 12.97839,-36.24766c0,-31.59642 -25.73692,-57.33333 -57.33333,-57.33333zM74.53333,28.66667c25.39937,0 45.86667,20.4673 45.86667,45.86667c0,25.39937 -20.46729,45.86667 -45.86667,45.86667c-25.39937,0 -45.86667,-20.46729 -45.86667,-45.86667c0,-25.39937 20.4673,-45.86667 45.86667,-45.86667z"></path></g></g>
          </svg>
        </button>
      </div>
      <ul class="dropdown-menu">
        <li
          v-for="(suggestion, index) in matches"
          :key="index"
          v-bind:class="{ 'is-active': isActive(index) }"
          @click="suggestionClick(index)"
        >
          <span>{{ suggestion }}</span>
        </li>
      </ul>
    </div>
    <div class="overview-wrapper" :class="{ 'is-open': hasSearched }">
      <Overview :data="result" @close="hasSearched = !hasSearched" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Overview from '~/components/Overview'

export default {
  name: 'Search',
  components: {
    Overview
  },
  computed: {
    ...mapGetters([
      'countries',
      'result'
    ]),
    setSelection: {
      get() {
        return this.selection
      },
      set(newSelect) {
        const selected = this.countries[newSelect]
        this.country = newSelect
        this.provinces = selected
        if (!selected[0].province) this.locationId = selected[0].id
      } 
    },
    matches() {
      const countries = Object.keys(this.countries)
      const lowerCased = this.country.toLowerCase()
      return countries.filter(str => {
        return str.toLowerCase().indexOf(lowerCased) >= 0
      })
    },
    openSuggestion() {
      return (
        this.country !== '' && this.matches.length != 0 && this.open
      )
    }
  },
  data() {
    return {
      open: false,
      current: 0,
      selection: '',
      country: '',
      provinces: [],
      locationId: null,
      tempValue: null,
      hasSelected: false,
      hasSearched: false
    }
  },
  methods: {
    isEmpty(obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object
    },
    enter() {
      this.setSelection = this.matches[this.current]
      this.tempValue = this.country
      this.open = false
      this.hasSelected = true
      this.hasSearched = false
      this.$gtag('event', 'enter', {
        event_category: 'input',
        event_label: 'input enter',
        value: this.country
      })
      this.$nextTick(_ => {
        if (this.$refs.provinces) this.$refs.provinces.focus()
      })
    },
    up() {
      if (this.current > 0) this.current--
    },
    down() {
      if (this.current < this.matches.length - 1) this.current++
    },
    isActive(index) {
      return index === this.current
    },
    change(e) {
      if (!this.open) {
        this.open = true
        this.current = 0
      }
      this.country = e.target.value
      this.tempValue = !e.target.value ? null : e.target.value
      if (this.tempValue === null) {
        this.provinces = []
        this.hasSelected = false
        this.hasSearched = false
      }
    },
    suggestionClick(index) {
      this.setSelection = this.matches[index]
      this.tempValue = this.country
      this.open = false
      this.hasSelected = true
      this.hasSearched = false
      if (this.$refs.provinces) this.$refs.provinces.focus()
      this.$gtag('event', 'click', {
        event_category: 'select',
        event_label: 'select click',
        value: this.country
      })
    },
    onSearch() {
      this.$store
        .dispatch('getOverviewByCountry', this.locationId)
        .then(_ => {
          this.hasSearched = true
          this.$gtag('event', 'click', {
            event_category: 'search',
            event_label: 'search click',
            value: this.locationId
          })
        })

    },
    onChange(e) {
      this.hasSearched = false
      this.locationId = e.target.value
      this.$refs.search.focus()
    }
  }
}
</script>


<style lang="scss" scoped>
.search {
  position: absolute;
  left: 50%;
  bottom: 56px;
  z-index: 2;
  padding: 0;
  width: calc(100% - 48px);
  transform: translateX(-50%);

  &.is-open {

    .countries-wrapper {
      border-radius: 0 0 4px 4px;
    }

    .dropdown-menu {
      display: block;
      border-radius: 4px 4px 0 0;
    }
  }

  button {
    position:relative;
    top: 0px;
    border: none;
    color: #f2f2f2;
    border-radius: 4px;
    padding: 8px 16px;
    width: 100%;
    font-size: 18px;
    background-color: #3232ff;
    box-shadow: 0px 6px 2px -1px rgba(0, 0, 0, 0.2);
    opacity: 1;
    transition: 0.5s ease;

    &.is-disabled {
      opacity: 0.2;
      box-shadow: none;
      cursor: not-allowed;
    }
  }

  .countries-wrapper,
  .provinces-wrapper {
    border-radius: 4px;
    margin: 0 auto 12px;
    padding: 12px 16px;
    background-color: #ffffff;
    box-shadow: 0px 6px 2px -1px rgba(0, 0, 0, 0.2);

    input,
    select {
      border: 0;
      padding: 0;
      display: block;
      font-size: 24px;
      width: 100%;
      background-color: transparent;
    }
  }

  .provinces-wrapper {
    display: none;

    &.is-show {
      display: block;
    }
  }

  .dropdown-menu {
    position: absolute;
    top: -1px;
    margin: 0;
    padding: 0;
    display: none;
    max-height: 240px;
    width: 100%;
    overflow: auto;
    transform: translateY(-100%);
    background-color: #ffffff;

    li {
      padding: 8px;
      font-size: 20px;

      &.is-active {
        background-color: #dddddd;
      }
    }
  }
}

.overview-wrapper {
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  display: flex;
  justify-content: stretch;
  width: 100%;
  height: 100%;

  &.is-open {
    z-index: 9;
  }
}
</style>