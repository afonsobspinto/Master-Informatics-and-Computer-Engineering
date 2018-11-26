import 'react-native'
import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import { activities } from '../../../__tests__/mockTestData'

import { CancelButton } from '../CancelButton'
import { CompleteButton } from '../CompleteButton'
import { PauseButton } from '../PauseButton'
import { ProgressBar } from '../ProgressBar'
import { ProgressClock } from '../ProgressClock'
import { Timer } from '../Timer'

configure({ adapter: new Adapter() })

describe('Activity components', () => {
  it('renders CancelButton correctly', () => {
    const wrapper = shallow(<CancelButton
      cancelActivity={jest.fn()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.instance().handleButtonPress()
    wrapper.instance().handleButtonRelease()
    wrapper.setState({ isCancelling: true })
    wrapper.instance().intervalFunction()
    wrapper.setState({ progress: 1.1 })
    wrapper.instance().intervalFunction()
    wrapper.unmount()
  })

  it('renders CompleteButton correctly', () => {
    const wrapper = shallow(<CompleteButton
      completeActivity={jest.fn()}
      isCompletable />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ isCompletable: false })
    wrapper.unmount()
  })

  it('renders PauseButton correctly', () => {
    const wrapper = shallow(<PauseButton
      resumeActivity={jest.fn()}
      pauseActivity={jest.fn()}
      isPaused />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ isPaused: false })
    wrapper.unmount()
  })

  it('renders ProgressBar correctly', () => {
    const wrapper = shallow(<ProgressBar
      elapsedTime={100}
      activityTimes={activities[0].time}
      isPaused={false}
      showTimer={false}
      activityFeedback={'visual'}
      feedbackFrequency={'normal'} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })

  it('renders ProgressClock correctly', () => {
    const wrapper = shallow(<ProgressClock
      elapsedTime={100}
      activityTimes={activities[0].time}
      isPaused={false}
      showTimer={false}
      activityFeedback={'visual'}
      feedbackFrequency={'normal'} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })

  it('renders Timer correctly', () => {
    const wrapper = shallow(<Timer
      remainingTime={100}
      style={{}} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ remainingTime: 0 })
    wrapper.setProps({ remainingTime: -10 })
    wrapper.setProps({ remainingTime: 13 })
    wrapper.unmount()
  })
})
