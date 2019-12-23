import Images from '../assets/images/images'

export const getSource = item => (item.photo !== null) ? { uri: item.photo } : Images[item.image]
