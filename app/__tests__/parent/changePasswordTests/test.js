import React from 'react'
import { TouchableOpacity } from 'react-native'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import ChangePasswordScreen from '../../../screens/parent/ChangePasswordScreen'

configure({ adapter: new Adapter() })

describe('ChangePasswordScreen snapshot', () => {
  it('renders ChangePasswordScreen correctly', () => {
    const wrapper = shallow(<ChangePasswordScreen
      navigation={{ navigate: jest.fn() }} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.find(TouchableOpacity).at(0).props().onPress()
    wrapper.unmount()
  })
})
