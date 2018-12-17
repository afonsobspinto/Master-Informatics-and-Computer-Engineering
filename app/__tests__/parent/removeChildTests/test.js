import React from 'react'
// import { Button, ListItem } from 'native-base'
// import { Alert } from 'react-native'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'
import '../../../__mock__/xhr-mock'

import { RemoveChildScreen } from '../../../screens/parent/RemoveChildScreen'

configure({ adapter: new Adapter() })

describe('RemoveChildScreen snapshot', () => {
  jest.mock('Alert', () => {
    return {
      alert: jest.fn()
    }
  })

  it('renders RemoveChildScreen correctly', async () => {
    const wrapper = shallow(<RemoveChildScreen
      navigation={{ navigate: jest.fn(), pop: jest.fn() }}
      loggedUserEmail={'email@aleatorio.pt'} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    // wrapper.find(ListItem).at(0).props().onPress()
    // wrapper.find(Button).at(0).props().onPress()
    // expect(Alert.alert).toHaveBeenCalled()
    // Alert.alert.mock.calls[0][2][0].onPress()
    wrapper.unmount()
  })
/*
  it('renders RemoveChildScreen correctly', async () => {
    const wrapper = shallow(<RemoveChildScreen
      navigation={{ navigate: jest.fn(), pop: jest.fn() }}
      loggedUserEmail={'email@aleatorio.pt'} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.find(Button).at(0).props().onPress()
    expect(Alert.alert).toHaveBeenCalled()
    Alert.alert.mock.calls[0][2][1].onPress()
    wrapper.unmount()
  })
*/
})
