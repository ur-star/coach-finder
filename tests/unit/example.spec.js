import { shallowMount } from '@vue/test-utils'
import Errorbar from '@/components/Errorbar.vue'
import LoginPage from '@/views/LoginPage.vue'

describe('Errorbar works', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    let wrapper = shallowMount(Errorbar, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})

describe('Singin works',()=>{
it('dissapers as soon as login happens',()=>{
let wrapper = shallowMount(LoginPage,{
  methods: {
    
  },
})
})

})
