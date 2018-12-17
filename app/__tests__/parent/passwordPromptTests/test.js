import React from 'react'
import { Button } from 'native-base'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import { PasswordPromptScreen } from '../../../screens/parent/PasswordPromptScreen'

configure({ adapter: new Adapter() })

describe('PasswordPromptScreen snapshot', () => {
  it('renders PasswordPromptScreen correctly', async () => {
    const mock = jest.fn()
    mock.mockReturnValue({ user: { email: 'email@aleatorio.pt' } })
    const wrapper = shallow(<PasswordPromptScreen
      navigation={{ navigate: jest.fn(), replace: jest.fn() }}
      loggedUserEmail='email@aleatorio.pt' />)
    wrapper.instance().render()
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setState({ loading: false })
    wrapper.instance().render()
    wrapper.find(Button).at(0).props().onPress()
    wrapper.find(Button).at(1).props().onPress()
    wrapper.unmount()
  })
})
