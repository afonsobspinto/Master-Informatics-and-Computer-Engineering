import React from 'react'
import { Dropdown } from 'react-native-material-dropdown'

export default class CustomDrowpdown extends React.Component {
  render () {
    let data = [
      {
        value: '1'
      },
      {
        value: '2'
      }
    ]
    return (
      <Dropdown style={{ height: 100, width: 150, marginLeft: 20 }}
        label={'Dropdown component'}
        data={data}
      />
    )
  }
}
