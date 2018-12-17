import React from 'react'
import { Button, Input } from 'native-base'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'
import '../../../__mock__/xhr-mock'

import { ChildFormScreen } from '../../../screens/parent/ChildFormScreen'
import { BottomButton } from '../../../components/Parent/BottomButton'

configure({ adapter: new Adapter() })

describe('ChildFormScreen snapshot', () => {
  it('renders ChildFormScreen correctly', async () => {
    const wrapper = shallow(<ChildFormScreen
      navigation={{ navigate: jest.fn(), getParam: jest.fn(), pop: jest.fn() }}
      loggedUserEmail={'email@aleatorio.pt'} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.find(Button).at(0).props().onPress()
    wrapper.find(Input).at(0).props().onChangeText('email@alternativo.pt')
    wrapper.instance().onPhotoChange('uri')
    wrapper.instance().onGenderChange(0)
    wrapper.find(BottomButton).at(0).props().onPress()
    wrapper.unmount()
  })
})
