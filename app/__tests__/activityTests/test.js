import 'react-native'
import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import { ActivityScreen } from '../../screens/ActivityScreen'
import { activities } from '../mockTestData'

configure({ adapter: new Adapter() })

describe('ActivityScreen snapshot', () => {
  it('renders ActivityScreen correctly', () => {
    const wrapper = shallow(<ActivityScreen
      navigation={{ navigate: jest.fn(), popToTop: jest.fn(), replace: jest.fn() }}
      progressType={'bar'}
      activityFeedback={'vibration'}
      feedbackFrequency={'normal'}
      showTimer={false}
      currentActivity={0}
      activities={activities}
      activity={activities[0]}
      setActivityStatus={jest.fn()}
      nextActivity={jest.fn()}
      addStars={jest.fn()}
      xp={430}
      level={4} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ showTimer: true })
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ progressType: 'clock' })
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ showTimer: true })
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.instance().pauseActivity()
    wrapper.instance().resumeActivity()
    wrapper.instance().backToMenu()
    wrapper.instance().cancelActivity()
    wrapper.instance().completeActivity()
    wrapper.instance().nextActivity()
    wrapper.setProps({ activity: {
      title: 'Fazer a cama',
      image: 'bed',
      photo: 'bedroom',
      color: '#7d84b2',
      time: {
        min: 0,
        max: 120,
        goal: 60
      },
      status: {
        reward: 0,
        completed: true,
        time: 120
      }
    } })
    wrapper.setState({ isPhoto: false })
    wrapper.instance().backToMenu()
    wrapper.instance().nextActivity()
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ activityFeedback: 'visual' })
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ feedbackFrequency: 'fast' })
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setState({ elapsedTime: 70 })
    wrapper.instance().completeActivity()
    wrapper.setState({ elapsedTime: 110 })
    wrapper.instance().completeActivity()
    wrapper.setState({ elapsedTime: 130 })
    wrapper.instance().completeActivity()
    wrapper.setState({ elapsedTime: -1 })
    wrapper.instance().intervalFunction()
    wrapper.setState({ elapsedTime: 70 })
    wrapper.instance().intervalFunction()
    wrapper.setState({ elapsedTime: 110 })
    wrapper.instance().intervalFunction()
    wrapper.setState({ elapsedTime: 130 })
    wrapper.instance().intervalFunction()
    wrapper.setState({ isPaused: true })
    wrapper.instance().intervalFunction()
    wrapper.unmount()
  })
})
