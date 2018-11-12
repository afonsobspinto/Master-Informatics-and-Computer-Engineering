import 'react-native'
import React from 'react'
import ActivityScreen from '../../screens/ActivityScreen'
import renderer from 'react-test-renderer'
import NavigationTestUtils from 'react-navigation/NavigationTestUtils'

describe('ActivityScreen snapshot', () => {
  jest.useFakeTimers()
  beforeEach(() => {
    NavigationTestUtils.resetInternalState()
  })

  it('renders correctly', async () => {
    const tree = renderer.create(<ActivityScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
