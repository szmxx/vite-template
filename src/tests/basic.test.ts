/*
 * @Author: cola
 * @Date: 2022-07-07 14:34:41
 * @LastEditors: cola
 * @Description:
 */
import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import { setActivePinia, createPinia } from 'pinia'
describe("mount component", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })
  it('mount component', async () => {
    const wrapper = mount(HelloWorld, {})
    expect(wrapper.text()).toContain('hello world')
    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.get('button').trigger('click')
    expect(wrapper.text()).toContain('greeting')
  })
})

