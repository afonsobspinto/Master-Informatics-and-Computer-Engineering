import { userTypes } from '../actionTypes'
import * as userActions from '../userActions'

describe('user actions', () => {
  it('should create an action to login', () => {
    const params = 'email@aleatorio.pt'
    const expectedAction = {
      type: userTypes.login,
      payload: 'email@aleatorio.pt'
    }
    expect(userActions.login(params)).toEqual(expectedAction)
  })

  it('should create an action to logout', () => {
    const expectedAction = {
      type: userTypes.login
    }
    expect(userActions.logout()).toEqual(expectedAction)
  })

  it('should set routines', () => {
    const expectedAction = {
      type: userTypes.setRoutines,
      payload: 'something'
    }
    expect(userActions.setRoutines('something')).toEqual(expectedAction)
  })
})
