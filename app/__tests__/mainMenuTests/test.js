import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import MainMenuScreen from '../../screens/MainMenuScreen'

describe('MainMenuScreen snapshot', () => {
  it('renders MainMenuScreen correctly', async () => {
    const tree = renderer.create(<MainMenuScreen
      navigation={{}} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
