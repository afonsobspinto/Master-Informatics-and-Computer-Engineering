import React from 'react'
import { Alert } from 'react-native'
import { SortableList } from '../../../components/Parent/SortableList'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'
import '../../../__mock__/xhr-mock'

import RewardsScreen from '../../../screens/parent/RewardsScreen'

configure({ adapter: new Adapter() })

describe('RewardsScreen snapshot', () => {
  jest.mock('Alert', () => {
    return {
      alert: jest.fn()
    }
  })

  it('renders RewardsScreen correctly', async () => {
    const wrapper = shallow(<RewardsScreen
      navigation={{ navigate: jest.fn(), pop: jest.fn(), addListener: jest.fn() }}
      setChildID={jest.fn()}
      loggedUserEmail={'email@aleatorio.pt'} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setState({ loading: false, rewards: [{ name: 'aleatorio', id: 0 }, { name: 'aleatorio', id: 1 }, { name: 'aleatorio', id: 2 }], children: [{ id: 1 }] })
    wrapper.find(SortableList).at(0).props().onItemPress(0)
    expect(Alert.alert).toHaveBeenCalled()
    Alert.alert.mock.calls[0][2][1].onPress(0)
    wrapper.instance().fetchChildRewards()
    wrapper.instance().moveItemUp(0)
    wrapper.instance().moveItemUp(1)
    wrapper.instance().moveItemUp(2)
    wrapper.instance().onChildChanged(0)
    wrapper.unmount()
  })
})
