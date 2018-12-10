import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import LoginScreen from '../../screens/LoginScreen'

configure({ adapter: new Adapter() })

describe('LoginScreen snapshot', () => {
  it('renders LoginScreen correctly', async () => {
    const wrapper = shallow(<LoginScreen
      navigation={{ navigate: jest.fn() }}
    />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })
})
