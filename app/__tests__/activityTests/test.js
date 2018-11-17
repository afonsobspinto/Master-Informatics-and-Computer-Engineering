import 'react-native'
import React from 'react'
import ActivityScreen from '../../screens/ActivityScreen'
import renderer from 'react-test-renderer'
import NavigationTestUtils from 'react-navigation/NavigationTestUtils'
import { demoRoutines } from '../../entries/entries'

describe('ActivityScreen snapshot', () => {
  jest.useFakeTimers()
  beforeEach(() => {
    NavigationTestUtils.resetInternalState()
  })

  const state = { params: demoRoutines[0] }
  const navigation = { navigate: jest.fn(), state: state }
  navigation.getParam = jest.fn()

  it('renders correctly', async () => {
    const tree = renderer.create(<ActivityScreen navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
