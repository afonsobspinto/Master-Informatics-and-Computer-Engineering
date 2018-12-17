import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import { ParentMainMenuScreen } from '../../../screens/parent/ParentMainMenuScreen'

configure({ adapter: new Adapter() })

describe('ParentMainMenuScreen snapshot', () => {
  it('renders ParentMainMenuScreen correctly', async () => {
    const wrapper = shallow(<ParentMainMenuScreen
      navigation={{ navigate: jest.fn() }}
      loggedUserEmail={'email@aleatorio'}
      setRoutines={jest.fn()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.find('.routines').at(0).props().onPress()
    wrapper.find('.newActivity').at(0).props().onPress()
    wrapper.find('.newRoutine').at(0).props().onPress()
    wrapper.find('.rewards').at(0).props().onPress()
    wrapper.find('.newReward').at(0).props().onPress()
    wrapper.find('.routines').at(0).props().onPress()
    wrapper.find('.settings').at(0).props().onPress()
    wrapper.find('.activity').at(0).props().onPress()
    wrapper.instance().setChildID(28)
    wrapper.unmount()
  })
})
