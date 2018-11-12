import 'react-native'
import React from 'react'
import ChooseActivityScreen from '../../screens/ChooseActivityScreen'
import renderer from 'react-test-renderer'
import NavigationTestUtils from 'react-navigation/NavigationTestUtils'

describe('ChooseActivityScreen snapshot', () => {
  jest.useFakeTimers()
  beforeEach(() => {
    NavigationTestUtils.resetInternalState()
  })

  it('renders correctly', async () => {
    const tree = renderer.create(<ChooseActivityScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
