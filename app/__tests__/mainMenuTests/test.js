import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'
import { TouchableOpacity } from 'react-native'
import { MainMenuScreen } from '../../screens/MainMenuScreen'
import '../../__mock__/xhr-mock'

configure({ adapter: new Adapter() })

describe('MainMenuScreen snapshot', () => {
  it('renders MainMenuScreen correctly', () => {
    const wrapper = shallow(<MainMenuScreen
      navigation={{ navigate: jest.fn(), addListener: jest.fn() }}
      loggedUserEmail='test@jest.com'
      addChild={jest.fn()}
      setSettings={jest.fn()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.find(TouchableOpacity).at(0).props().onPress()
    wrapper.find(TouchableOpacity).at(1).props().onPress()
    wrapper.setState({ kids: [{ name: 'Chris', index: 0 }, { name: 'Rock', index: 1 }] })
    wrapper.instance().onChildClick(0)
    wrapper.unmount()
  })
})
