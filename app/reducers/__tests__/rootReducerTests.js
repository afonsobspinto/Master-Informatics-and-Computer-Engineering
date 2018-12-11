import rootReducer from '../rootReducer'
import { routines } from '../../constants/mockTestData'

describe('root reducer', () => {
  it('should return initial state', () => {
    expect(rootReducer(undefined, {})).toEqual({
      child: {
        stars: 100,
        level: 4,
        xp: 460,
        itemsOwned: [],
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
        routines: routines,
        currentActivity: -1,
        currentRoutine: -1
      },
      user: {
        email: ''
      }
    })
  })
})
