import 'react-native'
import React from 'react'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import { ChildMainMenuScreen } from '../../screens/ChildMainMenuScreen'

configure({ adapter: new Adapter() })

describe('ChildMainMenuScreen snapshot', () => {
  it('renders ChildMainMenuScreen correctly', async () => {
    const wrapper = shallow(<ChildMainMenuScreen
      navigation={{}}
      xp={150}
      level={1} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
