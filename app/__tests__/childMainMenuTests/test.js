import 'react-native'
import React from 'react'
import ChildMainMenuScreen from '../../screens/ChildMainMenuScreen'
import renderer from 'react-test-renderer'
import NavigationTestUtils from 'react-navigation/NavigationTestUtils'

describe('ChooseRoutineScreen snapshot', () => {
  jest.useFakeTimers()
  beforeEach(() => {
    NavigationTestUtils.resetInternalState()
  })

  it('renders correctly', async () => {
    const tree = renderer.create(<ChildMainMenuScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
