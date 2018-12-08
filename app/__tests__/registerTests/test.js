import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import RegisterScreen from '../../screens/RegisterScreen'

configure({ adapter: new Adapter() })

describe('RegisterScreen snapshot', () => {
  it('renders RegisterScreen correctly', async () => {
    const wrapper = shallow(<RegisterScreen />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.find('.email').simulate('changeText', 'a')
    wrapper.find('.password').simulate('changeText', 'a')
    wrapper.instance().validate('email', 'email@aleatorio.pt')
    wrapper.instance().validate('password', 'Password$UP3Rsegura123456')
    wrapper.instance().validate('else', '')
    wrapper.unmount()
  })
})
