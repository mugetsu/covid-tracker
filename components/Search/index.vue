<template>
  <div>
    <div class="search" :class="{
      'is-open': openSuggestion,
      'has-selected': hasSelected,
      'has-province': isProvinceFocus
      }">
      <div class="search-container">
        <div class="countries-wrapper" :class="{ 'is-focused': focusedInput }">
          <input
            ref="countries"
            type="text"
            :value="country"
            placeholder="Country"
            @keydown.enter="enter"
            @keydown.down="down"
            @keydown.up="up"
            @focus="focusedInput = true"
            @blur="focusedInput = false"
            @input="change"
          />
        </div>
        <div class="provinces-wrapper" :class="{ 'is-focused': focusedSelect }">
          <select
            ref="provinces"
            v-model="locationId"
            :tabindex="locationId ? '-1' : '0'"
            @focus="onSelectFocus"
            @blur="focusedSelect = false"
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
          :class="{
            'is-disabled': !hasSelected || !locationId,
            'is-focused': focusedButton
          }"
          :disabled="!hasSelected || !locationId"
          @focus="focusedButton = true"
          @blur="focusedButton = false"
          @click="onSearch">
          <template v-if="isLoading">
            <div class="loader" />
          </template>
          <template v-else>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              width="30" height="30"
              viewBox="0 0 172 172"
              style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M74.53333,17.2c-31.59642,0 -57.33333,25.73692 -57.33333,57.33333c0,31.59642 25.73692,57.33333 57.33333,57.33333c13.73998,0 26.35834,-4.87915 36.24766,-12.97839l34.23203,34.23203c1.43802,1.49778 3.5734,2.10113 5.5826,1.57735c2.0092,-0.52378 3.57826,-2.09284 4.10204,-4.10204c0.52378,-2.0092 -0.07957,-4.14458 -1.57735,-5.5826l-34.23203,-34.23203c8.09924,-9.88932 12.97839,-22.50768 12.97839,-36.24766c0,-31.59642 -25.73692,-57.33333 -57.33333,-57.33333zM74.53333,28.66667c25.39937,0 45.86667,20.4673 45.86667,45.86667c0,25.39937 -20.46729,45.86667 -45.86667,45.86667c-25.39937,0 -45.86667,-20.46729 -45.86667,-45.86667c0,-25.39937 20.4673,-45.86667 45.86667,-45.86667z"></path></g></g>
            </svg>
          </template>
        </button>
      </div>
      <ul ref="dropdown" class="dropdown-menu">
        <li
          v-for="(suggestion, index) in matches"
          :key="index"
          v-bind:class="{ 'is-active': isActive(index) }"
          @click="suggestionClick(index)">
          <span>{{ suggestion }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Search',
  computed: {
    ...mapGetters([
      'countries'
    ]),
    setSelection: {
      get() {
        return this.selection
      },
      set(newSelect) {
        if (this.countries[newSelect]) {
          const selected = this.countries[newSelect]
          this.country = newSelect
          this.provinces = selected
          if (selected.length && !selected[0].province) this.locationId = selected[0].id
        }
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
    },
    isProvinceFocus() {
      return this.hasSelected && this.provinces.length && this.provinces[0].province
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
      focusedInput: false,
      focusedSelect: false,
      focusedButton: false,
      isLoading: false
    }
  },
  methods: {
    isEmpty(obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object
    },
    enter() {
      if (this.matches[this.current]) {
        this.setSelection = this.matches[this.current]
        this.tempValue = this.country
        this.open = false
        this.hasSelected = true
        this.$nextTick(_ => {
          if (this.isProvinceFocus) {
            this.$refs.provinces.focus()
            this.locationId = ""
          }
        })
        this.$gtag('event', 'enter', {
          event_category: 'input',
          event_label: 'input enter',
          value: this.country
        })
      }
    },
    up() {
      if (this.current > 0) {
        this.current--
        this.onKeyPress()
      }
    },
    down() {
      if (this.current < this.matches.length - 1) {
        this.current++
        this.onKeyPress()
      }
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
      }
    },
    suggestionClick(index) {
      this.setSelection = this.matches[index]
      this.tempValue = this.country
      this.open = false
      this.hasSelected = true
      if (this.isProvinceFocus) {
        this.locationId = ""
        this.$refs.provinces.focus()
      }
      this.$gtag('event', 'click', {
        event_category: 'select',
        event_label: 'select click',
        value: this.country
      })
    },
    onSearch() {
      if (this.locationId) {
        this.isLoading = true
        this.$store
          .dispatch('getOverviewByCountry', this.locationId)
          .then(_ => {
            this.$emit('search')
            this.$gtag('event', 'click', {
              event_category: 'search',
              event_label: 'search click',
              value: this.locationId
            })
            this.isLoading = false
          })
      }
    },
    onSelectFocus(e) {
      this.focusedSelect = true
      if (e.target.value) {
        this.locationId = e.target.value
        this.$gtag('event', 'focus', {
          event_category: 'province',
          event_label: 'province focus',
          value: this.locationId
        })
      }
    },
    onChange(e) {
      this.locationId = e.target.value
      this.$refs.search.focus()
      this.$gtag('event', 'change', {
        event_category: 'province',
        event_label: 'province change',
        value: this.locationId
      })
    },
    onKeyPress() {
      this.$nextTick(_ => {
        const parentHeight = parseFloat(getComputedStyle(this.$refs.dropdown, null).height.replace('px', ''))
        this.$refs.dropdown.scrollTop = 0
        this.$refs.dropdown.scrollTop = (document.querySelector('li.is-active').offsetTop + 40) - parentHeight
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.search {
  position: absolute;
  left: 50%;
  bottom: 56px;
  z-index: 10;
  padding: 0;
  width: calc(100% - 48px);
  height: 52px;
  transform: translateX(-50%);

  @media only screen and (min-width: 768px) {
    width: 480px;
  }

  &.is-open {

    &.has-selected {

      &.has-province {

        .dropdown-menu {
          transform: translateY(calc(-100% - 104px));
        }  
      }

      .dropdown-menu {
        transform: translateY(calc(-100% - 52px));
      }
    }

    .dropdown-menu {
      display: block;
    }
  }

  &.has-selected {
    
    .countries-wrapper {
      border-radius: 4px 4px 0 0;
      transform: translateY(-100%);
    }

    .provinces-wrapper {
      box-shadow: none;
      transform: translateY(-200%);
    }

    button {
      border-radius: 0 0 4px 4px;
    }
  }

  &.has-province {

    .countries-wrapper {
      border-radius: 4px 4px 0 0;
      transform: translateY(-200%);
    }

    .provinces-wrapper {
      border-radius: 4px 4px 0 0;
      box-shadow: 0px 6px 2px -1px rgba(0, 0, 0, 0.2);
      transform: translateY(-200%);
    }
  }

  button {
    position:relative;
    z-index: 7;
    top: 0px;
    border: none;
    color: #f2f2f2;
    border-radius: 4px;
    padding: 8px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 52px;
    font-size: 18px;
    background-color: #3232ff;
    box-shadow: 0px 6px 2px -1px rgba(0, 0, 0, 0.2);
    opacity: 1;
    cursor: pointer;
    transform: translateY(-200%);
    outline: none;

    svg {
      transform: scale(0.8);
      transition: 0.6s cubic-bezier(0.83, 0, 0.17, 1);
    }

    &:hover,
    &.is-focused {
      background-color: #1919ff;

      svg {
        transform: scale(1.2);
      }
    }

    &.is-disabled {
      opacity: 0.2;
      box-shadow: none;
      cursor: not-allowed;

      &:hover,
      &.is-focused {
        background-color: #3232ff;

        svg {
          transform: scale(1);
        }
      }
    }
  }

  .countries-wrapper,
  .provinces-wrapper {
    position: relative;
    z-index: 9;
    border-radius: 4px;
    margin: 0 auto;
    padding: 12px 16px;
    height: 28px;
    background-color: #dddddd;
    transform: translateY(100%);
    transition: 0.6s cubic-bezier(0.83, 0, 0.17, 1);

    input,
    select {
      border: 0;
      margin: 0;
      padding: 0;
      display: block;
      font-size: 24px;
      width: 100%;
      background-color: transparent;
      outline: none;
    }

    &.is-focused {
      background-color: #ffffff;
    }
  }

  .countries-wrapper {
    box-shadow: 0px 6px 2px -1px rgba(0, 0, 0, 0.2);
    transform: translateY(0);
  }

  .provinces-wrapper {
    transform: translateY(-100%);
    z-index: 8;
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% - 56px);
    border-radius: 4px;
    margin: 0;
    padding: 0;
    display: none;
    max-height: 186px;
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

  .loader {
    position: relative;
    border-radius: 50%;
    margin: 0;
    width: 24px;
    height: 24px;
    font-size: 10px;
    background: #ffffff;
    background: linear-gradient(to right, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
    animation: loader 1.4s infinite linear;
    transform: translateZ(0);

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 100% 0 0 0;
      width: 50%;
      height: 50%;
      background: #ffffff;
    }

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      border-radius: 50%;
      margin: auto;
      width: 75%;
      height: 75%;
      background: #3232ff;
    }
  }
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>