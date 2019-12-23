import userReducer from '../userReducer'
import { userTypes } from '../../actions/actionTypes'

describe('user reducer', () => {
  it('should return initial state', () => {
    expect(
      userReducer({
        email: ''
      }, {
        type: userTypes.login,
        payload: 'email@aleatorio.com'
      })
    )
  })

  it('should return initial state', () => {
    expect(
      userReducer({
        email: ''
      }, {
        type: userTypes.logout,
        payload: 'email@aleatorio.com'
      })
    )
  })

  it('should return set routines', () => {
    expect(
      userReducer({
        email: ''
      }, {
        type: userTypes.setRoutines,
        payload: 'email@aleatorio.com'
      })
    )
  })
})
