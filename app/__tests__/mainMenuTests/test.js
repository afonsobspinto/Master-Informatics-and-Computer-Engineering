import 'react-native'
import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import MainMenuScreen from '../../screens/MainMenuScreen'

configure({ adapter: new Adapter() })

describe('MainMenuScreen snapshot', () => {
  it('renders MainMenuScreen correctly', async () => {
    const wrapper = shallow(<MainMenuScreen
      navigation={{}} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
