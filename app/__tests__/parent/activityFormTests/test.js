import 'react-native'
import React from 'react'
import { Input } from 'native-base'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import { ActivityFormScreen } from '../../../screens/parent/ActivityFormScreen'

configure({ adapter: new Adapter() })

describe('ActivityFormScreen snapshot', () => {
  it('renders ActivityFormScreen correctly', () => {
    const wrapper = shallow(<ActivityFormScreen
      navigation={{ navigate: jest.fn(), getParam: jest.fn(), pop: jest.fn() }} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.instance().onColorChange('#0074D9')
    wrapper.instance().onDurationChange({})
    wrapper.instance().onDurationChange({ goal: 50, min: 0, max: 120 })
    wrapper.instance().onPhotoChange('uri')
    wrapper.instance().onImageChange('image')
    wrapper.instance().onRoutineChange(0)
    wrapper.instance().removeActivity()
    wrapper.instance().createActivity()
    wrapper.instance().editActivity()
    wrapper.setState({ createActivity: false })
    wrapper.find('.back').at(0).props().onPress()
    wrapper.find(Input).at(0).props().onChangeText('s')
    wrapper.unmount()
  })

  it('renders ActivityFormScreen correctly', () => {
    const myMock = jest.fn()
    myMock.mockReturnValue({
      title: 'Atividade de testes',
      color: '#0074D9',
      time: {
        goal: '3',
        min: '1.5',
        max: '6'
      },
      photo: undefined,
      image: undefined,
      routine: 'Manhã',
      createActivity: true
    })
    const wrapper = shallow(<ActivityFormScreen
      navigation={{ navigate: jest.fn(), getParam: myMock }} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })
})
