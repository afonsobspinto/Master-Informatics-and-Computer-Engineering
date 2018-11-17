import 'react-native'
import React from 'react'
import ChooseActivityScreen from '../../screens/ChooseActivityScreen'
import renderer from 'react-test-renderer'
import NavigationTestUtils from 'react-navigation/NavigationTestUtils'
import { demoRoutines } from '../../entries/entries'

describe('ChooseActivityScreen snapshot', () => {
  jest.useFakeTimers()
  beforeEach(() => {
    NavigationTestUtils.resetInternalState()
  })

  const state = { params: demoRoutines[0] }
  const navigation = { navigate: jest.fn(), state: state }

  it('renders correctly', async () => {
    const tree = renderer.create(<ChooseActivityScreen navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
