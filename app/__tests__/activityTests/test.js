import 'react-native'
import React from 'react'
import { shallow, configure } from 'enzyme'
import toJson from 'enzyme-to-json'
import configureStore from 'redux-mock-store'
import Adapter from 'enzyme-adapter-react-16'

import ActivityScreen from '../../screens/ActivityScreen'

configure({ adapter: new Adapter() })

describe('ActivityScreen snapshot', () => {
  const initialState = {}
  const mockStore = configureStore()
  let store = mockStore(initialState)
  const wrapper = shallow(<ActivityScreen store={store} />)
  const component = wrapper.dive()

  expect(toJson(component)).toMatchSnapshot()
})
