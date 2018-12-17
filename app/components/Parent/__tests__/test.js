import 'react-native'
import React from 'react'
import { Button } from 'native-base'
import { configure, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import { BottomButton } from '../BottomButton'
import { ColorPicker } from '../ColorPicker'
import { DurationPickers } from '../DurationPickers'
import { ImagePickerButtons } from '../ImagePickerButtons'
import { InvalidateList } from '../InvalidateList'
import { ItemPicker } from '../ItemPicker'
import { PeriodicityPicker } from '../PeriodicityPicker'
import { PhotoPickerButton } from '../PhotoPickerButton'
import { RoutineItem } from '../RoutineItem'
import { SelectChildPicker } from '../SelectChildPicker'
import { SortableList } from '../SortableList'
import { SortableListItem } from '../SortableListItem'
import { SortableListItemThumbnail } from '../SortableListItemThumbnail'

import { activities } from '../../../constants/mockTestData'

configure({ adapter: new Adapter() })

describe('Slide components', () => {
  it('renders BottomButton correctly', () => {
    const wrapper = shallow(<BottomButton
      color={''}
      text={''}
      onPress={jest.fn()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })

  it('renders ColorPicker correctly 1', () => {
    const wrapper = shallow(<ColorPicker
      color={1}
      colors={[]}
      onColorChange={jest.fn()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })

  it('renders ColorPicker correctly 2', () => {
    const wrapper = shallow(<ColorPicker
      color={0}
      colors={[1, 2]}
      onColorChange={jest.fn()} />)
    wrapper.instance().onValueChange(1)
    wrapper.instance().onValueChange(999)
    wrapper.instance().getSelectedValue()
    wrapper.unmount()
  })

  it('renders DurationPickers correctly', () => {
    const wrapper = shallow(<DurationPickers
      onDurationChange={jest.fn()}
      time={{}}
      color={''} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.instance().toggleDetailedView()
    wrapper.instance().changeGoalValue({ replace: jest.fn() })
    wrapper.instance().changeMaxValue({ replace: jest.fn() })
    wrapper.instance().changeMinValue({ replace: jest.fn() })
    wrapper.unmount()
  })

  it('renders ImagePickerButtons correctly', async () => {
    const wrapper = shallow(<ImagePickerButtons
      color={''}
      onPhotoChange={jest.fn()}
      onImageChange={jest.fn()}
      photo={''}
      image={''} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.setState({ photoView: true })
    wrapper.find(Button).at(0).props().onPress()
    wrapper.find(Button).at(1).props().onPress()
    wrapper.instance().togglePhotoView()
    wrapper.instance().onImageChanged(0)
    wrapper.setProps({ image: 'drawers' })
    wrapper.instance().getSelectedImageName()
    wrapper.unmount()
  })

  it('renders InvalidateList correctly', () => {
    const wrapper = shallow(<InvalidateList
      activities={activities}
      onInvalidatePress={jest.fn()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.find(Button).at(0).props().onPress()
    wrapper.instance().formatTime(-10)
    wrapper.unmount()
  })

  it('renders ItemPicker correctly', () => {
    const wrapper = shallow(<ItemPicker
      items={[ { label: 'label' }, { label: 'other' } ]}
      selected={{}}
      onValueChange={jest.fn()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })

  it('renders PeriodicityPicker correctly', () => {
    const wrapper = shallow(<PeriodicityPicker
      isRepeat
      color={''}
      periodicity={[]}
      togglePeriodicity={jest.fn()}
      toggleIsRepeat={jest.fn()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.find(Button).at(0).props().onPress()
    wrapper.unmount()
  })

  it('renders PhotoPickerButton correctly', async () => {
    const wrapper = shallow(<PhotoPickerButton
      color={''}
      photo={{}}
      onPhotoChange={jest.fn()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.find(Button).at(0).props().onPress()
    wrapper.find(Button).at(1).props().onPress()
    wrapper.unmount()
  })

  it('renders RoutineItem correctly', () => {
    const wrapper = shallow(<RoutineItem
      image={0}
      title={''} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })

  it('renders SelectChildPicker correctly', () => {
    const wrapper = shallow(<SelectChildPicker
      children={[{ image: '' }]}
      selected={0}
      onChildChanged={jest.fn()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })

  it('renders SortableList correctly', () => {
    const wrapper = shallow(<SortableList
      items={[{}, {}, {}]}
      color={''}
      onItemPress={jest.fn()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })

  it('renders SortableListItem correctly', () => {
    const wrapper = shallow(<SortableListItem
      item={{}}
      index={1}
      moveItemUp={jest.fn()}
      color={''}
      onItemPress={jest.fn()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.find(Button).at(0).props().onPress()
    wrapper.instance().onItemPress()
    wrapper.unmount()
  })

  it('renders SortableListItemThumbnail correctly', () => {
    const wrapper = shallow(<SortableListItemThumbnail
      color={''}
      source={{}}
      isPhoto />)
    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.unmount()
  })
})
