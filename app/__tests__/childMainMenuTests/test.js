import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'
import { TouchableOpacity } from 'react-native'

import { ChildMainMenuScreen } from '../../screens/ChildMainMenuScreen'

configure({ adapter: new Adapter() })

describe('ChildMainMenuScreen snapshot', () => {
  it('renders ChildMainMenuScreen correctly', () => {
    const wrapper = shallow(<ChildMainMenuScreen
      navigation={{ navigate: jest.fn() }}
      xp={150}
      level={1}
      showLevelUpModal={false}
      toggleLevelUpModal={jest.fn()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.find(TouchableOpacity).at(0).props().onPress()
    wrapper.find(TouchableOpacity).at(1).props().onPress()
    wrapper.instance().openShop()
    wrapper.instance().closeShop()
    wrapper.unmount()
  })
})
