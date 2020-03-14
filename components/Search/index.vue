<template>
  <div 
    class="search"
    :class="{
      'open': openSuggestion
    }">
    <div class="search-container">
      <div class="countries-wrapper">
        <input
          ref="countries"
          type="text"
          v-model="country"
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
          'is-show': hasSelected && provinces && provinces.length
        }">
        <select ref="provinces">
          <option 
            label="Province"
            value=""
            selected
            disabled />
          <option 
            v-for="(province, index) in provinces"
            :key="index"
            :label="province"
            :value="province" />
        </select>
      </div>
      <button
        :disabled="!hasSelected"
        @click="onSearch">Search</button>
    </div>
    <ul class="dropdown-menu">
      <li
        v-for="(suggestion, index) in matches"
        :key="index"
        v-bind:class="{'active': isActive(index)}"
        @click="suggestionClick(index)"
      >
        <span>{{ suggestion }}</span>
      </li>
    </ul>
    <div
      v-if="hasSelected && country_case.length"
      class="search-results">
      <p class="">Cases</p>
      <Results
        :items="results"
        :duration="duration"
        :show-value="!!country_case.length" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AnimatedNumber from 'animated-number-vue'
import Results from '~/components/Results'

export default {
  name: 'Search',
  components: {
    Results,
    AnimatedNumber
  },
  props: {
    suggestions: {
      type: Object,
      required: true
    },
    selection: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'country_case'
    ]),
    setSelection: {
      get() {
        return this.selection
      },
      set(newSelect) {
        this.country = newSelect
        this.provinces = this.suggestions[newSelect].filter(_ => _)
      } 
    },
    matches() {
      const countries = Object.keys(this.suggestions)
      const lowerCased = this.country.toLowerCase()
      return countries.filter(str => {
        return str.toLowerCase().indexOf(lowerCased) >= 0
      })
    },
    openSuggestion() {
      return (
        this.country !== '' && this.matches.length != 0 && this.open === true
      )
    },
    results() {
      const cases = this.country_case || []
      return [
        {
          label: 'Confirmed / ',
          value: cases.length ? cases[0].properties.confirmed_count : 0,
          color: '#ffa500'
        },
        {
          label: 'Recovered / ',
          value: cases.length ? cases[0].properties.recovered_count : 0,
          color: '#66a266'
        },
        {
          label: 'Deaths / ',
          value: cases.length ? cases[0].properties.dead_count : 0,
          color: '#b20000'
        }
      ]
    }
  },
  data() {
    return {
      open: false,
      current: 0,
      country: '',
      provinces: [],
      tempValue: null,
      hasSelected: false,
      duration: 1000
    }
  },
  methods: {
    enter() {
      this.setSelection = this.matches[this.current]
      this.tempValue = this.country
      this.open = false
      this.hasSelected = true
      this.$nextTick(_ => {
        if (this.$refs.provinces) this.$refs.provinces.focus()
      })
      this.$gtag('event', 'enter', {
        event_category: 'input',
        event_label: 'input enter',
        value: this.country
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
      this.tempValue = !e.target.value ? null : e.target.value
      if (this.tempValue === null) {
        this.provinces = []
        this.hasSelected = false
      }
    },
    suggestionClick(index) {
      this.setSelection = this.matches[index]
      this.tempValue = this.country
      this.open = false
      this.hasSelected = true
      this.$nextTick(_ => {
        if (this.$refs.provinces) this.$refs.provinces.focus()
      })
      this.$gtag('event', 'click', {
        event_category: 'select',
        event_label: 'select click',
        value: this.country
      })
    },
    onSearch() {
      this.$store.dispatch('getCasesByCountry', {
        country: this.country,
        province: this.$refs.provinces.value
      })
      this.$gtag('event', 'click', {
        event_category: 'search',
        event_label: 'search click',
        value: `${this.country}${this.$refs.provinces.value ? ', ' + this.$refs.provinces.value : ''}`
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.search {
  position: relative;

  &.open {

    .dropdown-menu {
      display: block;
    }
  }

  .countries-wrapper {
    display: block;

    input {
      margin: 0;
      padding: 12px 16px 14px;
      border: 1px solid #ffffff;
      border-radius: 4px;
      width: calc(100% - 32px);
      font-size: 24px;
      color: #ffffff;
      background-color: transparent;

      &::placeholder {
        color: #cccccc;
      }
    }
  }

  .provinces-wrapper {
    position: relative;
    display: none;
    margin-top: 16px;

    &:after {
      content: "";
      width: 0;
      height: 0;
      border: 4px solid transparent;
      border-color: #fff transparent transparent transparent;
      position: absolute;
      top: 50%;
      right: 10px;
    }

    &.is-show {
      display: block;
    }

    select {
      padding: 12px 16px 14px;
      border: 1px solid #ffffff;
      border-radius: 4px;
      font-size: 24px;
      color: #ffffff;
      width: 100%;
      background-color: transparent;
      appearance: none;
    }
  }

  button {
    border-radius: 4px;
    margin-top: 16px;
    padding: 12px 16px 14px;
    font-size: 24px;
    width: 100%;
    background-color: #ffffff;
    cursor: pointer;
  }

  .dropdown-menu {
    position: absolute;
    top: 60px;
    display: none;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
    margin: 0;
    padding: 0;
    max-height: 24vh;
    width: 100%;
    overflow: auto;
    background-color: #ffffff;

    li {
      display: block;
      padding: 12px 8px;
      font-size: 18px;
      color: #343332;

      &.active {
        background-color: #dddddd;
      }
    }
  }

  .search-results {
    font-size: 24px;

    & > p{
      margin-top: 24px;
      margin-bottom: 12px;
      font-weight: 700;
      letter-spacing: 1px;
      color: #cccccc;
      text-transform: uppercase;
    }
  }
}
</style>