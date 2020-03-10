import { shallowMount } from '@vue/test-utils'
import Header from '../index.vue'

const factory = () => {
  return shallowMount(Header, {})
}

describe('Header', () => {
  test('mounts properly', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('renders properly', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
