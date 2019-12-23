export const activityWithURI = {
  title: 'Fazer a cama',
  image: 'file://test.uri',
  photo: 'bedroom',
  color: '#7d84b2',
  time: {
    min: 0,
    max: 120,
    goal: 60
  }
}

export const activitiesWithStatus = [
  {
    title: 'Fazer a cama',
    image: 'bed',
    photo: 'bedroom',
    color: '#7d84b2',
    time: {
      min: 0,
      max: 120,
      goal: 60
    },
    status: {
      reward: 0
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
    },
    status: {
      reward: 1
    }
  }
]

export const activities = [
  {
    title: 'Fazer a cama',
    image: 'bed',
    photo: 'bedroom',
    color: '#7d84b2',
    status: {
      reward: 1
    },
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

export const routines = [
  {
    title: 'Após acordar',
    image: 'sun',
    photo: 'https://i.ytimg.com/vi/Br-GC8FcTig/maxresdefault.jpg',
    color: '#37c1f0',
    activities: [
      {
        title: 'Fazer a cama',
        image: 'bed',
        photo: 'https://www.brewsterwallcovering.com/images/thumbs/0030235_900.jpeg',
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
        title: 'Fazer os trabalhos de casa',
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
]

export const activitiesDone = [
  {
    title: 'Fazer a cama',
    photo: 'https://hniesfp.imgix.net/8/images/detailed/14/EA1A7075.jpg?fit=fill&bg=0FFF&w=1500&h=1000&auto=format,compress',
    color: '#7d84b2',
    time: {
      min: 0,
      max: 120,
      goal: 60
    },
    reward: 3,
    elapsedTime: 40
  },
  {
    title: 'Lavar os dentes',
    image: 'toothbrush',
    color: '#0e79b2',
    time: {
      min: 1,
      max: 15,
      goal: 10
    },
    reward: 3,
    elapsedTime: 120
  },
  {
    title: 'Vestir',
    image: 'socks',
    color: '#7fb800',
    time: {
      min: 10,
      max: 120,
      goal: 60
    },
    reward: 2,
    elapsedTime: 40
  },
  {
    title: 'Tomar banho',
    image: 'shower',
    color: '#37c1f0',
    time: {
      min: 10,
      max: 120,
      goal: 60
    },
    reward: 3,
    elapsedTime: 34
  },
  {
    title: 'Preparar a mochila',
    image: 'bag',
    color: '#e43f6f',
    time: {
      min: 10,
      max: 120,
      goal: 60
    },
    reward: 0,
    elapsedTime: 3000
  },
  {
    title: 'Calçar os sapatos',
    image: 'sneakers',
    color: '#4bb3fd',
    time: {
      min: 10,
      max: 120,
      goal: 60
    },
    reward: 3,
    elapsedTime: 20
  },
  {
    title: 'Tomar o pequeno almoço',
    image: 'breakfast',
    color: '#ff7f11',
    time: {
      min: 10,
      max: 120,
      goal: 60
    },
    reward: 3,
    elapsedTime: 242
  },
  {
    title: 'Pentear cabelo',
    image: 'comb',
    color: '#b0db43',
    time: {
      min: 10,
      max: 120,
      goal: 60
    },
    reward: 2,
    elapsedTime: 27
  }
]

export const children = [
  {
    avatar: { itemsOwned: [3, 8], itemsEquiped: [3, 8] },
    gender: 'M',
    id: 28,
    image: 'http://10.0.0.11:8000/static/assets/images/3owvgls19w.jpg',
    level: 0,
    name: 'Child 1',
    stars: 50,
    xp: 24
  },
  {
    avatar: null,
    gender: 'M',
    id: 29,
    image: 'http://10.0.0.11:8000/static/assets/images/bmx4i9jg1i.jpg',
    level: 1,
    name: 'Child 2',
    stars: 0,
    xp: 0
  }
]
