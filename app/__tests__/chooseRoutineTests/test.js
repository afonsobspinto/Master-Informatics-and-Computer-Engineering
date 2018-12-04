import 'react-native'
import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import { ChooseRoutineScreen } from '../../screens/ChooseRoutineScreen'
import { routines } from '../mockTestData'

configure({ adapter: new Adapter() })

describe('ChooseActivityScreen snapshot', () => {
  it('renders ChooseActivityScreen correctly', () => {
    const wrapper = shallow(<ChooseRoutineScreen
      navigation={{ navigate: jest.fn() }}
      routinePlayType={'auto'}
      routines={routines}
      setCurrentRoutine={jest.fn()}
      nextActivity={jest.fn()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.instance().chooseActivities()
    wrapper.instance().startRoutine()
    wrapper.setProps({ routinePlayType: 'choose' })
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ routines: [] })
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })
})
