import React from 'react'
import { Button, Input } from 'native-base'
import { BottomButton } from '../../../components/Parent/BottomButton'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import RewardFormScreen from '../../../screens/parent/RewardFormScreen'

configure({ adapter: new Adapter() })

describe('RewardFormScreen snapshot', () => {
  it('renders RewardFormScreen correctly', async () => {
    const wrapper = shallow(<RewardFormScreen
      navigation={{ navigate: jest.fn(), pop: jest.fn() }} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.instance().onImageChange('image')
    wrapper.instance().onPhotoChange('uri')
    wrapper.find(Button).at(0).props().onPress()
    wrapper.find(BottomButton).at(0).props().onPress()
    wrapper.find(Input).at(0).props().onChangeText('a')
    wrapper.unmount()
  })
})
