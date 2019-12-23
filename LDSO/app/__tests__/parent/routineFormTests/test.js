import React from 'react'
import { Button, Input } from 'native-base'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'
import '../../../__mock__/xhr-mock'

import RoutineFormScreen from '../../../screens/parent/RoutineFormScreen'
import { activities } from '../../../constants/mockTestData'

configure({ adapter: new Adapter() })

describe('RoutineFormScreen snapshot', () => {
  it('renders RoutineFormScreen correctly', async () => {
    const wrapper = shallow(<RoutineFormScreen
      navigation={{ navigate: jest.fn(), getParam: jest.fn(), pop: jest.fn() }} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.find(Button).at(0).props().onPress()
    wrapper.setState({ createRoutine: false })
    wrapper.find(Button).at(1).props().onPress()
    wrapper.instance().onColorChange('#0074D9')
    wrapper.instance().onPhotoChange('#uri')
    wrapper.instance().onImageChange('#image')
    wrapper.setState({ activities: {} })
    wrapper.instance().onActivityPress(0)
    wrapper.setState({ periodicity: [ 5, 6 ] })
    wrapper.instance().togglePeriodicity(1)
    wrapper.instance().togglePeriodicity(5)
    wrapper.instance().toggleIsRepeat()
    wrapper.setState({ periodicity: [ 7 ] })
    wrapper.instance().encodePeriodicity()
    wrapper.setState({ periodicity: [ 1, 2 ] })
    wrapper.instance().encodePeriodicity()
    wrapper.instance().createRoutine()
    wrapper.instance().editRoutine()
    wrapper.find(Input).at(0).props().onChangeText('routine')
    wrapper.instance().sendRemovePost()
    wrapper.instance().moveItemUp(0)
    wrapper.setState({ activities: activities })
    wrapper.instance().moveItemUp(1)
    wrapper.instance().handleServerRequests()
    wrapper.setState({ photo: 'file://imagem.extensao' })
    wrapper.instance().editRoutine()
    wrapper.setState({ photo: false })
    wrapper.instance().handleServerRequests()
    wrapper.unmount()
  })
})
