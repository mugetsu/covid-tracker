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
          @keydown.enter="enter"
          @keydown.down="down"
          @keydown.up="up"
          @input="change"
        />
      </div>
      <div
        class="provinces-wrapper"
        :class="{
          'is-show': provinces && provinces.length
        }">
        <select ref="provinces">
          <option 
            v-for="(province, index) in provinces"
            :key="index"
            :label="province"
            :value="province" />
        </select>
      </div>
      <button @click="onSearch">Search</button>
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
  </div>
</template>

<script>
export default {
  name: 'Search',
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
    }
  },
  data() {
    return {
      open: false,
      current: 0,
      country: '',
      provinces: ''
    }
  },
  methods: {
    enter() {
      this.setSelection = this.matches[this.current]
      this.open = false
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
    change() {
      if (!this.open) {
        this.open = true
        this.current = 0
      }
    },
    suggestionClick(index) {
      this.setSelection = this.matches[index]
      this.open = false
      this.$nextTick(_ => {
        if (this.$refs.provinces) this.$refs.provinces.focus()
      })
    },
    onSearch() {
      this.$store.dispatch('getCasesByCountry', {
        country: this.country,
        province: this.$refs.provinces.value
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
    input {
      margin: 0;
      padding: 0;
      border: 0;
      border-bottom: 1px solid #ffffff;
      color: #ffffff;
      background-color: transparent;
      outline: none;
    }
  }

  .provinces-wrapper {
    display: none;

    &.is-show {
      display: block;
    }
  }

  .dropdown-menu {
    display: none;
    width: 100%;
  }
}
</style>