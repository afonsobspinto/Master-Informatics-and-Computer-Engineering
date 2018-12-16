import rootReducer from '../rootReducer'

describe('root reducer', () => {
  it('should return initial state', () => {
    expect(rootReducer(undefined, {})).toEqual({
      child: {
        stars: 300,
        level: 4,
        xp: 460,
        gender: 'F',
        itemsOwned: [],
        itemsEquiped: [],
        showLevelUpModal: true
      },
      settings: {
        activityProgressType: 'bar',
        activityShowTimer: false,
        activityFeedback: 'visual',
        feedbackFrequency: 'normal',
        visualStyle: 'cartoon',
        routinePlayType: 'choose',
        playSounds: true
      },
      game: {
        routines: [],
        currentActivity: -1,
        currentRoutine: -1
      },
      user: {
        email: undefined,
        routines: []
      }
    })
  })
})
