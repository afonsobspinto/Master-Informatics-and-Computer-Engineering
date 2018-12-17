import 'react-native'
import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import { activities } from '../../../constants/mockTestData'

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

  it('renders ProgressBar correctly 1', async () => {
    const wrapper = shallow(<ProgressBar
      elapsedTime={100}
      activityTimes={activities[0].time}
      isPaused={false}
      showTimer={false}
      activityFeedback={'sound'}
      feedbackFrequency={'slow'}
      playSounds={false} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.instance().activityFeedback()
    wrapper.setProps({ playSounds: true })
    wrapper.instance().activityFeedback()
    await wrapper.instance().playSounds
    wrapper.unmount()
  })

  it('renders ProgressBar correctly 2', () => {
    const wrapper = shallow(<ProgressBar
      elapsedTime={100}
      activityTimes={activities[0].time}
      isPaused={false}
      showTimer={false}
      activityFeedback={'vibration'}
      feedbackFrequency={'normal'}
      playSounds={false} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.instance().activityFeedback()
    wrapper.unmount()
  })

  it('renders ProgressBar correctly 3', async () => {
    const wrapper = shallow(<ProgressBar
      elapsedTime={100}
      activityTimes={activities[0].time}
      isPaused={false}
      showTimer={false}
      activityFeedback={'visual'}
      feedbackFrequency={'fast'}
      playSounds={false} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    jest.useFakeTimers()
    wrapper.instance().activityFeedback()
    wrapper.unmount()
  })

  it('renders ProgressBar correctly 4', () => {
    const wrapper = shallow(<ProgressBar
      elapsedTime={100}
      activityTimes={activities[0].time}
      isPaused={false}
      showTimer={false}
      activityFeedback={''}
      feedbackFrequency={''}
      playSounds={false} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.instance().componentWillReceiveProps(wrapper.props)
    wrapper.setProps({ elapsedTime: 1 })
    wrapper.setProps({ elapsedTime: 70 })
    wrapper.setProps({ elapsedTime: 100, isPaused: true })
    wrapper.setProps({ elapsedTime: 100, isPaused: true })
    wrapper.unmount()
  })

  it('renders ProgressClock correctly 1', () => {
    const wrapper = shallow(<ProgressClock
      elapsedTime={100}
      activityTimes={activities[0].time}
      isPaused={false}
      showTimer={false}
      activityFeedback={'sound'}
      feedbackFrequency={'slow'}
      playSounds={false} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.instance().activityFeedback()
    wrapper.setProps({ playSounds: true })
    wrapper.instance().activityFeedback()
    wrapper.unmount()
  })

  it('renders ProgressClock correctly 2', () => {
    const wrapper = shallow(<ProgressClock
      elapsedTime={100}
      activityTimes={activities[0].time}
      isPaused={false}
      showTimer={false}
      activityFeedback={'vibration'}
      feedbackFrequency={'normal'}
      playSounds={false} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.instance().activityFeedback()
    wrapper.unmount()
  })

  it('renders ProgressClock correctly 3', async () => {
    const wrapper = shallow(<ProgressClock
      elapsedTime={100}
      activityTimes={activities[0].time}
      isPaused={false}
      showTimer={false}
      activityFeedback={'visual'}
      feedbackFrequency={'fast'}
      playSounds={false} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    jest.useFakeTimers()
    wrapper.instance().activityFeedback()
    wrapper.unmount()
  })

  it('renders ProgressClock correctly 4', () => {
    const wrapper = shallow(<ProgressClock
      elapsedTime={100}
      activityTimes={activities[0].time}
      isPaused={false}
      showTimer={false}
      activityFeedback={''}
      feedbackFrequency={''}
      playSounds={false}
    />)
    wrapper.instance().componentWillReceiveProps(wrapper.props)
    wrapper.setProps({ elapsedTime: 100 })
    wrapper.setState({ playedFeedback: true, feedbackCycles: 26 })
    wrapper.setProps({ elapsedTime: 100 })
    wrapper.setProps({ elapsedTime: 70 })
    wrapper.setProps({ elapsedTime: 1 })
    wrapper.setProps({ isPaused: true })
    wrapper.unmount()
  })

  it('renders Timer correctly', () => {
    const wrapper = shallow(<Timer
      remainingTime={100}
      style={{}} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ remainingTime: 0 })
    wrapper.setProps({ remainingTime: 1 })
    wrapper.setProps({ remainingTime: -10 })
    wrapper.setProps({ remainingTime: 13 })
    wrapper.unmount()
  })
})
