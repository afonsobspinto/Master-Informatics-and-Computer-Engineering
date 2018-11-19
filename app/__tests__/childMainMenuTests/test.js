import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import { ChildMainMenuScreen } from '../../screens/ChildMainMenuScreen'

describe('ChildMainMenuScreen snapshot', () => {
  it('renders ChildMainMenuScreen correctly', async () => {
    const tree = renderer.create(<ChildMainMenuScreen
      navigation={{}}
      xp={150}
      level={1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
