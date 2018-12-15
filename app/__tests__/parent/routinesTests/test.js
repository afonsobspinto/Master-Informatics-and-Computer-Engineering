import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import { RoutinesScreen } from '../../../screens/parent/RoutinesScreen'

configure({ adapter: new Adapter() })

describe('RoutinesScreen snapshot', () => {
  it('renders RoutinesScreen correctly', async () => {
    const wrapper = shallow(<RoutinesScreen
      navigation={{ navigate: jest.fn(), getParam: jest.fn(), pop: jest.fn() }} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.instance().onRoutinePress(0)
    wrapper.unmount()
  })
})
