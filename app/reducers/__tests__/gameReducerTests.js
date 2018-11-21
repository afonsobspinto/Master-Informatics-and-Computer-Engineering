import gameReducer from '../gameReducer'
import { gameTypes } from '../../actions/actionTypes'

describe('game reducer', () => {
  it('should return initial state', () => {
    expect(gameReducer(undefined, {})).toEqual({
      routines: [
        {
          title: 'Após acordar',
          image: 'sun',
          color: '#37c1f0',
          activities: [
            {
              title: 'Fazer a cama',
              image: 'bed',
              photo: 'bedroom',
              color: '#7d84b2',
              time: {
                min: 0,
                max: 120,
                goal: 60
              }
            },
            {
              title: 'Lavar os dentes',
              image: 'toothbrush',
              color: '#0e79b2',
              time: {
                min: 1,
                max: 15,
                goal: 10
              }
            },
            {
              title: 'Vestir',
              image: 'socks',
              color: '#7fb800',
              time: {
                min: 10,
                max: 120,
                goal: 60
              }
            },
            {
              title: 'Tomar banho',
              image: 'shower',
              color: '#37c1f0',
              time: {
                min: 10,
                max: 120,
                goal: 60
              }
            },
            {
              title: 'Preparar a mochila',
              image: 'bag',
              color: '#e43f6f',
              time: {
                min: 10,
                max: 120,
                goal: 60
              }
            },
            {
              title: 'Calçar os sapatos',
              image: 'sneakers',
              color: '#4bb3fd',
              time: {
                min: 10,
                max: 120,
                goal: 60
              }
            },
            {
              title: 'Tomar o pequeno almoço',
              image: 'breakfast',
              color: '#ff7f11',
              time: {
                min: 10,
                max: 120,
                goal: 60
              }
            },
            {
              title: 'Pentear cabelo',
              image: 'comb',
              color: '#b0db43',
              time: {
                min: 10,
                max: 120,
                goal: 60
              }
            }
          ]
        },
        {
          title: 'Antes de dormir',
          image: 'moon',
          photo: 'night',
          color: '#011f39',
          activities: [
            {
              title: 'Ajudar na cozinha',
              image: 'fork',
              color: '#1a5e63',
              time: {
                min: 10,
                max: 120,
                goal: 60
              }
            },
            {
              title: 'Arrumar o quarto',
              image: 'drawers',
              color: '#a3320b',
              time: {
                min: 10,
                max: 120,
                goal: 60
              }
            },
            {
              title: 'Fazer os trabalhos para casa',
              image: 'paper',
              color: '#657153',
              time: {
                min: 10,
                max: 120,
                goal: 60
              }
            },
            {
              title: 'Arrumar os brinquedos',
              image: 'blocks',
              color: '#519e8a',
              time: {
                min: 10,
                max: 120,
                goal: 60
              }
            },
            {
              title: 'Ler um livro',
              image: 'book',
              color: '#ff9f1c',
              time: {
                min: 10,
                max: 120,
                goal: 60
              }
            },
            {
              title: 'Preparar a roupa do dia seguinte',
              image: 'shirt',
              color: '#ff9f1c',
              time: {
                min: 10,
                max: 120,
                goal: 60
              }
            }
          ]
        }
      ],
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
        payload: { title: 'test2' }
      }))
      .toEqual({
        routines: [{ title: 'test' }, { title: 'test2' }]
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
