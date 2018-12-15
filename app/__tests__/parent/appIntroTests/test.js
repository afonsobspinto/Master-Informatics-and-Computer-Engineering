import 'react-native'
import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import AppIntroScreen from '../../../screens/parent/AppIntroScreen'

configure({ adapter: new Adapter() })

describe('AppIntroScreen snapshot', () => {
  it('renders AppIntroScreen correctly', () => {
    const wrapper = shallow(<AppIntroScreen
      navigation={{ navigate: jest.fn() }} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })
})
