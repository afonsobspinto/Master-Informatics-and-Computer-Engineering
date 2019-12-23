import { gameTypes } from '../actionTypes'
import * as gameActions from '../gameActions'

describe('game actions', () => {
  it('should create an action to add routines', () => {
    const params = ['test1', 'test2']
    const expectedAction = {
      type: gameTypes.addRoutines,
      payload: ['test1', 'test2']
    }
    expect(gameActions.addRoutines(params)).toEqual(expectedAction)
  })

  it('should create an action to set the current routine', () => {
    const params = { title: 'test' }
    const expectedAction = {
      type: gameTypes.setCurrentRoutine,
      payload: { title: 'test' }
    }
    expect(gameActions.setCurrentRoutine(params)).toEqual(expectedAction)
  })

  it('should create an action to set the current activity', () => {
    const params = { title: 'test' }
    const expectedAction = {
      type: gameTypes.setCurrentActivity,
      payload: { title: 'test' }
    }
    expect(gameActions.setCurrentActivity(params)).toEqual(expectedAction)
  })

  it('should create an action to set the activity status', () => {
    const params = [{ title: 'test activity' }, { finished: true }]
    const expectedAction = {
      type: gameTypes.setActivityStatus,
      payload: {
        activity: { title: 'test activity' },
        status: { finished: true }
      }
    }
    expect(gameActions.setActivityStatus(...params)).toEqual(expectedAction)
  })

  it('should create an action to proceed to next activity', () => {
    const expectedAction = {
      type: gameTypes.nextActivity
    }
    expect(gameActions.nextActivity()).toEqual(expectedAction)
  })

  it('should create an action to add custom activity', () => {
    const params = ['test routine title', { title: 'test activity' }]
    const expectedAction = {
      type: gameTypes.addCustomActivity,
      payload: {
        routineTitle: 'test routine title',
        activity: { title: 'test activity' }
      }
    }
    expect(gameActions.addCustomActivity(...params)).toEqual(expectedAction)
  })
})
