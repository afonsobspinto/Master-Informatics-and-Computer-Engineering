import 'react-native'
import React from 'react'
import { Button } from 'native-base'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'
import '../../__mock__/xhr-mock'

import { LoginScreen } from '../../screens/LoginScreen'

configure({ adapter: new Adapter() })

describe('LoginScreen snapshot', () => {
  it('renders LoginScreen correctly', async () => {
    const wrapper = shallow(<LoginScreen
      navigation={{ navigate: jest.fn(), replace: jest.fn() }}
      login={jest.fn()}
      setSettings={jest.fn()}
    />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.find('.email').simulate('changeText', 'a')
    wrapper.find('.password').simulate('changeText', 'a')
    wrapper.instance().validate('email', 'email@aleatorio.pt')
    wrapper.instance().validate('password', 'Password$UP3Rsegura123456')
    wrapper.instance().validate('else', '')
    wrapper.find(Button).at(0).props().onPress()
    wrapper.setState({ passwordError: true })
    wrapper.find(Button).at(0).props().onPress()
    wrapper.find('.register').at(0).props().onPress()
    wrapper.unmount()
  })
})
