import React from 'react'
import { Button } from 'native-base'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import LicensesScreen from '../../../screens/parent/LicensesScreen'

configure({ adapter: new Adapter() })

describe('LicensesScreen snapshot', () => {
  it('renders LicensesScreen correctly', async () => {
    const wrapper = shallow(<LicensesScreen
      navigation={{ navigate: jest.fn(), pop: jest.fn() }} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.find(Button).at(0).props().onPress()
    wrapper.unmount()
  })
})
