import React from 'react'
import { SortableList } from '../../../components/Parent/SortableList'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import RewardsScreen from '../../../screens/parent/RewardsScreen'

configure({ adapter: new Adapter() })

describe('RewardsScreen snapshot', () => {
  it('renders RewardsScreen correctly', async () => {
    const wrapper = shallow(<RewardsScreen
      navigation={{ navigate: jest.fn(), pop: jest.fn() }} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.find(SortableList).at(0).props().onItemPress()
    wrapper.unmount()
  })
})
