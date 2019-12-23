import gameReducer from '../gameReducer'
import { gameTypes } from '../../actions/actionTypes'

describe('game reducer', () => {
  it('should return initial state', () => {
    expect(gameReducer(undefined, {})).toEqual({
      routines: [],
      currentActivity: -1,
      currentRoutine: -1
    })
  })

  it('should add custom routine', () => {
    expect(
      gameReducer({
        routines: [{ title: 'test', activities: [0, 1] }, { title: 'test2', activities: [0, 1] }]
      }, {
        type: gameTypes.addCustomActivity,
        payload: {
          routineTitle: 'test',
          activity: 3
        }
      }))
      .toEqual({
        routines: [{ title: 'test', activities: [0, 1, 3] }, { title: 'test2', activities: [0, 1] }]
      })
  })

  it('should add routine', () => {
    expect(
      gameReducer({
        routines: [{ title: 'test' }]
      }, {
        type: gameTypes.addRoutines,
        payload: [{ title: 'test2' }]
      }))
      .toEqual({
        routines: [{ title: 'test2' }]
      })
  })

  it('should set current routine', () => {
    expect(
      gameReducer({
        routines: [{ title: 'test' }],
        currentRoutine: -1
      }, {
        type: gameTypes.setCurrentRoutine,
        payload: { title: 'test' }
      }))
      .toEqual({
        routines: [{ title: 'test' }],
        currentRoutine: 0
      })
  })

  it('should set current activity', () => {
    expect(
      gameReducer({
        routines: [
          {
            title: 'test',
            activities: [
              {
                title: 'activitytest'
              }]
          }
        ],
        currentRoutine: 0,
        currentActivity: -1
      }, {
        type: gameTypes.setCurrentActivity,
        payload: { title: 'activitytest' }
      }))
      .toEqual({
        routines: [
          {
            title: 'test',
            activities: [
              {
                title: 'activitytest'
              }]
          }
        ],
        currentRoutine: 0,
        currentActivity: 0
      })
  })

  it('should set activity status', () => {
    expect(
      gameReducer({
        routines: [
          {
            title: 'test',
            activities: [
              { title: 'test' },
              { title: 'other' }]
          },
          { title: 'other' }
        ],
        currentRoutine: 0
      }, {
        type: gameTypes.setActivityStatus,
        payload: {
          activity: {
            title: 'test'
          },
          status: {
            reward: 0
          }
        }
      }))
      .toEqual({
        routines: [
          {
            title: 'test',
            activities: [
              {
                title: 'test',
                status: {
                  reward: 0
                }
              },
              { title: 'other' }]
          },
          { title: 'other' }
        ],
        currentRoutine: 0
      })
  })

  it('should change to next activity', () => {
    expect(
      gameReducer({
        routines: [
          {
            title: 'test',
            activities: [
              {
                title: 'test',
                status: {
                  reward: 0
                }
              },
              {
                title: 'test'
              }]
          }
        ],
        currentRoutine: 0,
        currentActivity: -1
      }, {
        type: gameTypes.nextActivity
      }))
      .toEqual({
        routines: [
          {
            title: 'test',
            activities: [
              {
                title: 'test',
                status: {
                  reward: 0
                }
              },
              {
                title: 'test'
              }]
          }
        ],
        currentRoutine: 0,
        currentActivity: 1
      })
  })
})
