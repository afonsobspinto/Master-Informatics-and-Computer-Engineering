import React from 'react'
import { TouchableOpacity } from 'react-native'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import ChangeEmailScreen from '../../../screens/parent/ChangeEmailScreen'

configure({ adapter: new Adapter() })

describe('ChangeEmailScreen snapshot', () => {
  it('renders ChangeEmailScreen correctly', () => {
    const wrapper = shallow(<ChangeEmailScreen
      navigation={{ navigate: jest.fn(), state: { params: { email: 'email@aleatorio.pt', setEmail: jest.fn() } } }} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.find(TouchableOpacity).at(0).props().onPress()
    wrapper.unmount()
  })
})
