import { settingTypes } from '../actionTypes'
import * as settingActions from '../settingsActions'

describe('setting actions', () => {
  it('should create an action to set all settings', () => {
    const params = { setting: 'test' }
    const expectedAction = {
      type: settingTypes.setSettings,
      payload: { setting: 'test' }
    }
    expect(settingActions.setSettings(params)).toEqual(expectedAction)
  })

  it('should create an action to change the visual style', () => {
    const params = 'test visual style'
    const expectedAction = {
      type: settingTypes.changeVisualStyle,
      payload: 'test visual style'
    }
    expect(settingActions.changeVisualStyle(params)).toEqual(expectedAction)
  })

  it('should create an action to toggle activity progress type', () => {
    const expectedAction = {
      type: settingTypes.toggleActivityProgressType
    }
    expect(settingActions.toggleActivityProgressType()).toEqual(expectedAction)
  })

  it('should create an action to toggle activity timer', () => {
    const expectedAction = {
      type: settingTypes.toggleActivityTimer
    }
    expect(settingActions.toggleActivityTimer()).toEqual(expectedAction)
  })

  it('should create an action to toggle routine play type', () => {
    const expectedAction = {
      type: settingTypes.toggleRoutinePlayType
    }
    expect(settingActions.toggleRoutinePlayType()).toEqual(expectedAction)
  })

  it('should create an action to toggle activity feedback', () => {
    const expectedAction = {
      type: settingTypes.toggleActivityFeedback
    }
    expect(settingActions.toggleActivityFeedback()).toEqual(expectedAction)
  })

  it('should create an action to change activity feedback frequency', () => {
    const expectedAction = {
      type: settingTypes.changeFeedbackFrequency
    }
    expect(settingActions.changeFeedbackFrequency()).toEqual(expectedAction)
  })
})
