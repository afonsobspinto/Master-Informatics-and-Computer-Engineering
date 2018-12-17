import 'react-native'
import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'
import '../../../__mock__/xhr-mock'

import { ActivityScreen } from '../../../screens/parent/ActivityScreen'
import { SelectChildPicker } from '../../../components/Parent/SelectChildPicker'
import { InvalidateList } from '../../../components/Parent/InvalidateList'

import { activitiesDone } from '../../../constants/mockTestData'

configure({ adapter: new Adapter() })

describe('ActivityScreen snapshot', () => {
  it('renders ActivityScreen correctly', () => {
    const wrapper = shallow(<ActivityScreen
      loggedUserEmail='email@aleatorio.com' />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })

  /*
  it('renders ActivityScreen correctly', () => {
    const wrapper = shallow(<ActivityScreen
      loggedUserEmail='email@aleatorio.com' />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setState({ activities: activitiesDone, children: ['Child'] })
    wrapper.find(SelectChildPicker).at(0).props().onChildChanged(0)
    wrapper.find(InvalidateList).at(0).props().onInvalidatePress()
    wrapper.unmount()
  })
  */
})
