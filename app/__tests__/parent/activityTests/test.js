import 'react-native'
import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import { ActivityScreen } from '../../../screens/parent/ActivityScreen'
import { SelectChildPicker } from '../../../components/Parent/SelectChildPicker'
import { InvalidateList } from '../../../components/Parent/InvalidateList'

configure({ adapter: new Adapter() })

describe('ActivityScreen snapshot', () => {
  it('renders ActivityScreen correctly', () => {
    const wrapper = shallow(<ActivityScreen />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.find(SelectChildPicker).at(0).props().onChildChanged(0)
    wrapper.find(InvalidateList).at(0).props().onInvalidatePress()
    wrapper.unmount()
  })
})
