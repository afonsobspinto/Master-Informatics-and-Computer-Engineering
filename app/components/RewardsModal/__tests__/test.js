import 'react-native'
import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import { PastActivityIcons } from '../PastActivityIcons'
import { RewardsModal } from '../RewardsModal'
import { activities, activitiesWithStatus } from '../../../__tests__/mockTestData'

configure({ adapter: new Adapter() })

describe('RewardsModal components', () => {
  it('renders PastActivityIcons correctly', () => {
    const wrapper = shallow(<PastActivityIcons
      currentActivity={0}
      activities={activities} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ activities: activitiesWithStatus })
    wrapper.unmount()
  })

  it('renders RewardsModal correctly', () => {
    const wrapper = shallow(<RewardsModal
      currentActivity={0}
      activities={activities}
      nextPress={jest.fn()}
      backPress={jest.fn()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ activities: activitiesWithStatus })
    wrapper.unmount()
  })
})
