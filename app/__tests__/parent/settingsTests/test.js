import React from 'react'
import { configure, shallow } from 'enzyme'
import { ListItem } from 'native-base'
import { Alert } from 'react-native'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'
import '../../../__mock__/xhr-mock'

import { SettingsScreen } from '../../../screens/parent/SettingsScreen'

configure({ adapter: new Adapter() })

describe('SettingsScreen snapshot', () => {
  jest.mock('Alert', () => {
    return {
      alert: jest.fn()
    }
  })

  it('renders SettingsScreen correctly', async () => {
    const wrapper = shallow(<SettingsScreen
      navigation={{ navigate: jest.fn(), getParam: jest.fn(), pop: jest.fn() }}
      activityProgressType={''}
      activityShowTimer={false}
      activityFeedback={''}
      feedbackFrequency={''}
      playSounds={false}
      toggleActivityProgressType={jest.fn()}
      toggleActivityTimer={jest.fn()}
      toggleActivityFeedback={jest.fn()}
      changeFeedbackFrequency={jest.fn()}
      routinePlayType={''}
      toggleRoutinePlayType={jest.fn()}
      togglePlaySounds={jest.fn()}
      loggedUserEmail={''} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.find(ListItem).at(0).props().onPress()
    wrapper.find(ListItem).at(1).props().onPress()
    wrapper.find(ListItem).at(8).props().onPress()
    wrapper.find(ListItem).at(9).props().onPress()
    wrapper.instance().logout()
    expect(Alert.alert).toHaveBeenCalled()
    Alert.alert.mock.calls[0][2][1].onPress()
    wrapper.unmount()
  })
})
