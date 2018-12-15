import React from 'react'
import { Button, Input } from 'native-base'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import PasswordPromptScreen from '../../../screens/parent/PasswordPromptScreen'

configure({ adapter: new Adapter() })

describe('PasswordPromptScreen snapshot', () => {
  it('renders PasswordPromptScreen correctly', async () => {
    const wrapper = shallow(<PasswordPromptScreen
      navigation={{ navigate: jest.fn(), replace: jest.fn() }} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.find(Button).at(0).props().onPress()
    wrapper.find(Button).at(1).props().onPress()
    wrapper.find(Input).at(0).props().onChangeText('Password$UP3Rsegura123456')
    wrapper.setState({ storedPW: 'Password$UP3Rsegura123456', inputPW: 'Password$UP3Rsegura123456' })
    wrapper.instance().verifyPassword()
    wrapper.unmount()
  })
})
