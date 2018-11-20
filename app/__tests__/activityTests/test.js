import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import { ActivityScreen } from '../../screens/ActivityScreen'

describe('ActivityScreen snapshot', () => {
  const activities = [
    {
      title: 'Fazer a cama',
      image: 'bed',
      photo: 'bedroom',
      color: '#7d84b2',
      time: {
        min: 0,
        max: 120,
        goal: 60
      }
    },
    {
      title: 'Lavar os dentes',
      image: 'toothbrush',
      color: '#0e79b2',
      time: {
        min: 1,
        max: 15,
        goal: 10
      }
    },
    {
      title: 'Vestir',
      image: 'socks',
      color: '#7fb800',
      time: {
        min: 10,
        max: 120,
        goal: 60
      }
    },
    {
      title: 'Tomar banho',
      image: 'shower',
      color: '#37c1f0',
      time: {
        min: 10,
        max: 120,
        goal: 60
      }
    },
    {
      title: 'Preparar a mochila',
      image: 'bag',
      color: '#e43f6f',
      time: {
        min: 10,
        max: 120,
        goal: 60
      }
    },
    {
      title: 'Calçar os sapatos',
      image: 'sneakers',
      color: '#4bb3fd',
      time: {
        min: 10,
        max: 120,
        goal: 60
      }
    },
    {
      title: 'Tomar o pequeno almoço',
      image: 'breakfast',
      color: '#ff7f11',
      time: {
        min: 10,
        max: 120,
        goal: 60
      }
    },
    {
      title: 'Pentear cabelo',
      image: 'comb',
      color: '#b0db43',
      time: {
        min: 10,
        max: 120,
        goal: 60
      }
    }
  ]

  jest.useFakeTimers()

  it('renders ActivityScreen correctly with bar & without timer & with vibration feedback', async () => {
    const tree = renderer.create(<ActivityScreen
      navigation={{}}
      progressType={'bar'}
      activityFeedback={'vibration'}
      showTimer={false}
      currentActivity={0}
      activities={activities}
      activity={activities[0]}
      setActivityStatus={jest.fn()}
      nextActivity={jest.fn()}
      addStars={jest.fn()} />).toJSON()
    expect(tree).toMatchSnapshot('./__snapshots__/snap1.js.snap')
  })

  it('renders ActivityScreen correctly with bar & without timer & with visual feedback', async () => {
    const tree = renderer.create(<ActivityScreen
      navigation={{}}
      progressType={'bar'}
      activityFeedback={'visual'}
      showTimer={false}
      currentActivity={0}
      activities={activities}
      activity={activities[0]}
      setActivityStatus={jest.fn()}
      nextActivity={jest.fn()}
      addStars={jest.fn()} />).toJSON()
    expect(tree).toMatchSnapshot('./__snapshots__/snap2.js.snap')
  })

  it('renders ActivityScreen correctly with bar & without timer & with sound feedback', async () => {
    const tree = renderer.create(<ActivityScreen
      navigation={{}}
      progressType={'bar'}
      activityFeedback={'sound'}
      showTimer={false}
      currentActivity={0}
      activities={activities}
      activity={activities[0]}
      setActivityStatus={jest.fn()}
      nextActivity={jest.fn()}
      addStars={jest.fn()} />).toJSON()
    expect(tree).toMatchSnapshot('./__snapshots__/snap3.js.snap')
  })

  it('renders ActivityScreen correctly with bar & with timer & with vibration feedback', async () => {
    const tree = renderer.create(<ActivityScreen
      navigation={{}}
      progressType={'bar'}
      activityFeedback={'vibration'}
      showTimer
      currentActivity={0}
      activities={activities}
      activity={activities[0]}
      setActivityStatus={jest.fn()}
      nextActivity={jest.fn()}
      addStars={jest.fn()} />).toJSON()
    expect(tree).toMatchSnapshot('./__snapshots__/snap4.js.snap')
  })

  it('renders ActivityScreen correctly with bar & with timer & with visual feedback', async () => {
    const tree = renderer.create(<ActivityScreen
      navigation={{}}
      progressType={'bar'}
      activityFeedback={'visual'}
      showTimer
      currentActivity={0}
      activities={activities}
      activity={activities[0]}
      setActivityStatus={jest.fn()}
      nextActivity={jest.fn()}
      addStars={jest.fn()} />).toJSON()
    expect(tree).toMatchSnapshot('./__snapshots__/snap5.js.snap')
  })

  it('renders ActivityScreen correctly with bar & with timer & with sound feedback', async () => {
    const tree = renderer.create(<ActivityScreen
      navigation={{}}
      progressType={'bar'}
      activityFeedback={'sound'}
      showTimer
      currentActivity={0}
      activities={activities}
      activity={activities[0]}
      setActivityStatus={jest.fn()}
      nextActivity={jest.fn()}
      addStars={jest.fn()} />).toJSON()
    expect(tree).toMatchSnapshot('./__snapshots__/snap6.js.snap')
  })

  it('renders ActivityScreen correctly with clock & without timer & with vibration feedback', async () => {
    const tree = renderer.create(<ActivityScreen
      navigation={{}}
      progressType={'clock'}
      activityFeedback={'vibration'}
      showTimer={false}
      currentActivity={0}
      activities={activities}
      activity={activities[0]}
      setActivityStatus={jest.fn()}
      nextActivity={jest.fn()}
      addStars={jest.fn()} />).toJSON()
    expect(tree).toMatchSnapshot('./__snapshots__/snap7.js.snap')
  })

  it('renders ActivityScreen correctly with clock & without timer & with visual feedback', async () => {
    const tree = renderer.create(<ActivityScreen
      navigation={{}}
      progressType={'clock'}
      activityFeedback={'visual'}
      showTimer={false}
      currentActivity={0}
      activities={activities}
      activity={activities[0]}
      setActivityStatus={jest.fn()}
      nextActivity={jest.fn()}
      addStars={jest.fn()} />).toJSON()
    expect(tree).toMatchSnapshot('./__snapshots__/snap8.js.snap')
  })

  it('renders ActivityScreen correctly with clock & without timer & with sound feedback', async () => {
    const tree = renderer.create(<ActivityScreen
      navigation={{}}
      progressType={'clock'}
      activityFeedback={'sound'}
      showTimer={false}
      currentActivity={0}
      activities={activities}
      activity={activities[0]}
      setActivityStatus={jest.fn()}
      nextActivity={jest.fn()}
      addStars={jest.fn()} />).toJSON()
    expect(tree).toMatchSnapshot('./__snapshots__/snap9.js.snap')
  })

  it('renders ActivityScreen correctly with clock & with timer & with vibration feedback', async () => {
    const tree = renderer.create(<ActivityScreen
      navigation={{}}
      progressType={'clock'}
      activityFeedback={'vibration'}
      showTimer
      currentActivity={0}
      activities={activities}
      activity={activities[0]}
      setActivityStatus={jest.fn()}
      nextActivity={jest.fn()}
      addStars={jest.fn()} />).toJSON()
    expect(tree).toMatchSnapshot('./__snapshots__/snap10.js.snap')
  })

  it('renders ActivityScreen correctly with clock & with timer & with visual feedback', async () => {
    const tree = renderer.create(<ActivityScreen
      navigation={{}}
      progressType={'clock'}
      activityFeedback={'visual'}
      showTimer
      currentActivity={0}
      activities={activities}
      activity={activities[0]}
      setActivityStatus={jest.fn()}
      nextActivity={jest.fn()}
      addStars={jest.fn()} />).toJSON()
    expect(tree).toMatchSnapshot('./__snapshots__/snap11.js.snap')
  })

  it('renders ActivityScreen correctly with clock & with timer & with sound feedback', async () => {
    const tree = renderer.create(<ActivityScreen
      navigation={{}}
      progressType={'clock'}
      activityFeedback={'sound'}
      showTimer
      currentActivity={0}
      activities={activities}
      activity={activities[0]}
      setActivityStatus={jest.fn()}
      nextActivity={jest.fn()}
      addStars={jest.fn()} />).toJSON()
    expect(tree).toMatchSnapshot('./__snapshots__/snap12.js.snap')
  })
})
