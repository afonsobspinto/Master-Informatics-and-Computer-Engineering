import React from 'react'
import { Button } from 'native-base'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import AboutScreen from '../../../screens/parent/AboutScreen'

configure({ adapter: new Adapter() })

describe('AboutScreen snapshot', () => {
  it('renders AboutScreen correctly', async () => {
    const wrapper = shallow(<AboutScreen
      navigation={{ navigate: jest.fn(), pop: jest.fn() }} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.find(Button).at(0).props().onPress()
    wrapper.unmount()
  })
})
