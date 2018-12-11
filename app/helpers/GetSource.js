import Images from '../assets/images/images'

export const getSource = item => (item.photo !== undefined) ? { uri: item.photo } : Images[item.image]
