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

  it('renders ProgressBar correctly 1', () => {
    const wrapper = shallow(<ProgressBar
      elapsedTime={100}
      activityTimes={activities[0].time}
      isPaused={false}
      showTimer={false}
      activityFeedback={'sound'}
      feedbackFrequency={'slow'} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.instance().activityFeedback()
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })

  it('renders ProgressBar correctly 2', () => {
    const wrapper = shallow(<ProgressBar
      elapsedTime={100}
      activityTimes={activities[0].time}
      isPaused={false}
      showTimer={false}
      activityFeedback={'vibration'}
      feedbackFrequency={'normal'} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.instance().activityFeedback()
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })

  it('renders ProgressBar correctly 3', async () => {
    const wrapper = shallow(<ProgressBar
      elapsedTime={100}
      activityTimes={activities[0].time}
      isPaused={false}
      showTimer={false}
      activityFeedback={'visual'}
      feedbackFrequency={'fast'} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    jest.useFakeTimers()
    wrapper.instance().activityFeedback()
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })

  it('renders ProgressBar correctly 4', () => {
    const wrapper = shallow(<ProgressBar
      elapsedTime={100}
      activityTimes={activities[0].time}
      isPaused={false}
      showTimer={false}
      activityFeedback={'sound'}
      feedbackFrequency={''} />)
    wrapper.instance().componentWillReceiveProps(wrapper.props)
    wrapper.setProps({ elapsedTime: 1 })
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ elapsedTime: 70 })
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ elapsedTime: 100, isPaused: true })
    wrapper.instance().componentWillReceiveProps(wrapper.props)
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
