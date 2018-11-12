import 'react-native'
import React from 'react'
import ChooseRoutineScreen from '../../screens/ChooseRoutineScreen'
import renderer from 'react-test-renderer'
import NavigationTestUtils from 'react-navigation/NavigationTestUtils'

describe('ChooseRoutineScreen snapshot', () => {
  jest.useFakeTimers()
  beforeEach(() => {
    NavigationTestUtils.resetInternalState()
  })

  it('renders correctly', async () => {
    const tree = renderer.create(<ChooseRoutineScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
