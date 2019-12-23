import 'react-native'
import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import { DurationModal } from '../DurationModal'

configure({ adapter: new Adapter() })

describe('Slide components', () => {
  it('renders DurationModal correctly', () => {
    const wrapper = shallow(<DurationModal
      closeModalCallback={jest.fn()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.instance().onPickerSelect(0)
    wrapper.instance().initItemsList()
    wrapper.unmount()
  })
})
