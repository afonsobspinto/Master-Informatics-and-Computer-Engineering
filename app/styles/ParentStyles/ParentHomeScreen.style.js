import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40
  },
  closeBtn: {
    height: 50,
    width: 50
  },
  generalLayout: {
    padding: 0,
    backgroundColor: '#EFEFEF'
  },
  headerContainer: {
    height: 110,
    paddingTop: 15,
    backgroundColor: '#4D4861'
  },
  profileImgContainer: {
    height: 200,
    width: 200
  },
  modalIcon: {
    height: 75,
    width: 75,
    marginBottom: 10
  },
  modalLayout: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 200,
    borderRadius: 4
  },
  modalIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowDirection: {
    flex: 1,
    flexDirection: 'row'
  },
  descriptionBox: {
    height: 50,
    width: '50%',
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft: 20
  },
  infoContainer: {
    height: 60,
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 5,
    flexWrap: 'wrap',
    backgroundColor: 'white',
    borderBottomColor: '#A0A0A0',
    borderBottomWidth: 1
  },
  sectionContainer: {
    marginBottom: 15
  },
  arrowContainer: {
    flexBasis: '10%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: 30 }
})
