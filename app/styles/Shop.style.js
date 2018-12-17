import { StyleSheet } from 'react-native'

import Layout from '../constants/Layout'
import { backgroundColor, lighterBackgroundColor, darkerBackgroundColor } from './Colors'

const padding = Layout.window.width * 0.06

export default StyleSheet.create({
  shopModal: {
    height: '100%',
    width: '100%',
    backgroundColor: backgroundColor,
    position: 'relative',
    flexDirection: 'row'
  },
  imageCard: {
    flex: 3,
    backgroundColor: lighterBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: padding,
    elevation: 6,
    overflow: 'hidden',
    marginVertical: padding,
    marginLeft: padding,
    paddingBottom: padding
  },
  avatarItem: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    aspectRatio: 1
  },
  avatarContainer: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  buttonAvatarContainer: {
    position: 'absolute',
    top: 0,
    height: '150%',
    width: '150%'
  },
  shopItemsContainer: {
    flex: 4,
    paddingVertical: padding,
    paddingHorizontal: padding / 2
  },
  shopContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  shopItemContainer: {
    width: '33.3333%',
    aspectRatio: 1,
    padding: padding / 2
  },
  shopItem: {
    height: '100%',
    width: '100%',
    backgroundColor: lighterBackgroundColor,
    borderColor: lighterBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: padding / 2,
    borderWidth: 3,
    elevation: 6,
    paddingTop: padding / 4,
    paddingHorizontal: padding / 4,
    paddingBottom: padding * 1.5
  },
  shopItemDisabled: {
    height: '100%',
    width: '100%',
    backgroundColor: '#cecece',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: padding / 2,
    borderWidth: 3,
    borderColor: '#cecece',
    paddingTop: padding / 4,
    paddingHorizontal: padding / 4,
    paddingBottom: padding * 1.5
  },
  shopItemEquiped: {
    height: '100%',
    width: '100%',
    backgroundColor: lighterBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: padding / 2,
    borderColor: darkerBackgroundColor,
    borderWidth: 3,
    paddingTop: padding / 4,
    paddingHorizontal: padding / 4,
    paddingBottom: padding * 1.5
  },
  currencyIcon: {
    width: padding,
    height: padding,
    marginRight: padding / 4
  },
  currencyText: {
    fontFamily: 'LinotteBold',
    fontSize: padding * 0.6,
    color: '#000',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3
  },
  itemPrice: {
    position: 'absolute',
    bottom: padding / 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  shopItemImage: {
    aspectRatio: 1,
    height: '100%'
  },
  shopTitleContainer: {
    width: '100%',
    height: padding * 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: padding / 2,
    paddingHorizontal: padding / 2
  },
  shopTitle: {
    fontFamily: 'LinotteBold',
    fontSize: padding * 1.5,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3
  },
  currentBalanceContainer: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  currentBalanceIcon: {
    height: padding * 1.2,
    width: padding * 1.2,
    marginRight: padding / 4
  },
  currentBalance: {
    fontFamily: 'LinotteBold',
    fontSize: padding * 1.5,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3
  }
})
