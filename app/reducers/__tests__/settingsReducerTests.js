import settingsReducer from '../settingsReducer'
import { settingTypes } from '../../actions/actionTypes'

describe('settings reducer', () => {
  it('should return initial state', () => {
    expect(settingsReducer(undefined, {})).toEqual({
      activityProgressType: 'bar',
      activityShowTimer: false,
      activityFeedback: 'visual',
      visualStyle: 'cartoon',
      routinePlayType: 'choose'
    })
  })

  it('should set settings', () => {
    expect(
      settingsReducer({}, {
        type: settingTypes.setSettings,
        payload: {
          activityProgressType: 'bar',
          activityShowTimer: false,
          visualStyle: 'cartoon',
          routinePlayType: 'choose'
        }
      }))
      .toEqual({
        activityProgressType: 'bar',
        activityShowTimer: false,
        visualStyle: 'cartoon',
        routinePlayType: 'choose'
      })
  })

  it('should toggle activity progress type', () => {
    expect(
      settingsReducer({
        activityProgressType: 'bar'
      }, {
        type: settingTypes.toggleActivityProgressType
      }))
      .toEqual({
        activityProgressType: 'clock'
      })

    expect(
      settingsReducer({
        activityProgressType: 'clock'
      }, {
        type: settingTypes.toggleActivityProgressType
      }))
      .toEqual({
        activityProgressType: 'bar'
      })
  })

  it('should change visual style', () => {
    expect(
      settingsReducer({
        visualStyle: 'cartoon'
      }, {
        type: settingTypes.changeVisualStyle,
        payload: 'test'
      }))
      .toEqual({
        visualStyle: 'test'
      })
  })

  it('should toggle activity timer', () => {
    expect(
      settingsReducer({
        activityShowTimer: false
      }, {
        type: settingTypes.toggleActivityTimer
      }))
      .toEqual({
        activityShowTimer: true
      })

    expect(
      settingsReducer({
        activityShowTimer: true
      }, {
        type: settingTypes.toggleActivityTimer
      }))
      .toEqual({
        activityShowTimer: false
      })
  })

  it('should toggle routine play type', () => {
    expect(
      settingsReducer({
        routinePlayType: 'auto'
      }, {
        type: settingTypes.toggleRoutinePlayType
      }))
      .toEqual({
        routinePlayType: 'choose'
      })

    expect(
      settingsReducer({
        routinePlayType: 'choose'
      }, {
        type: settingTypes.toggleRoutinePlayType
      }))
      .toEqual({
        routinePlayType: 'auto'
      })
  })

  it('should toggle activity feedback', () => {
    expect(
      settingsReducer({
        activityFeedback: 'visual'
      }, {
        type: settingTypes.toggleActivityFeedback
      }))
      .toEqual({
        activityFeedback: 'sound'
      })

    expect(
      settingsReducer({
        activityFeedback: 'sound'
      }, {
        type: settingTypes.toggleActivityFeedback
      }))
      .toEqual({
        activityFeedback: 'vibration'
      })

    expect(
      settingsReducer({
        activityFeedback: 'vibration'
      }, {
        type: settingTypes.toggleActivityFeedback
      }))
      .toEqual({
        activityFeedback: 'visual'
      })

    expect(
      settingsReducer({
        activityFeedback: 'error'
      }, {
        type: settingTypes.toggleActivityFeedback
      }))
      .toEqual({
        activityFeedback: 'error'
      })
  })
})
