import { shallowMount } from '@vue/test-utils'
import Footer from '../index.vue'

const factory = () => {
  return shallowMount(Footer, {})
}

describe('Footer', () => {
  test('mounts properly', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('renders properly', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
