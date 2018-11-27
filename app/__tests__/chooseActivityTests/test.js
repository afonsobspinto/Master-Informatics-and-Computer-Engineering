import 'react-native'
import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import { ChooseActivityScreen } from '../../screens/ChooseActivityScreen'
import { activities } from '../mockTestData'

configure({ adapter: new Adapter() })

describe('ChooseActivityScreen snapshot', () => {
  it('renders ChooseActivityScreen correctly', () => {
    const wrapper = shallow(<ChooseActivityScreen
      navigation={{ navigate: jest.fn() }}
      activities={activities}
      setCurrentActivity={jest.fn()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.instance().onPress()
    wrapper.unmount()
  })
})
