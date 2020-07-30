import {StyleSheet, Dimensions, Platform} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const boxFiles = {
    width: 140,
    height: 140,
    backgroundColor: 'white',
    borderColor: '#B7CBD1',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 10,
};

const styles = ({chatStatus, userBox, typeFile, selected}) => StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50
  },
  status: {
    color: !!chatStatus ? 'green' : 'red',
  },
  box: {
    width: '100%',
    height: '70%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#B7CBD1'
  },
  chatTextItem: {
    width: '100%',
    justifyContent: userBox === 'me' ? 'flex-end' : 'flex-start',
    alignItems: userBox === 'me' ? 'flex-end' : 'flex-start',
    backgroundColor: !!selected ? 'rgba(255,0,0,0.1)' : 'transparent'
  },
  chatBalloonContainer: {
    paddingLeft: userBox === 'me' ? 20 : 0,
    paddingRight: userBox === 'me' ? 0 : 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chatBalloonText: {
    maxWidth: '90%',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: userBox === 'me' ? '#EDF2F4' : '#FFFFFF',
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    borderBottomStartRadius: userBox === 'me' ? 8 : 0,
    borderBottomEndRadius: userBox === 'me' ? 0 : 8,
    borderWidth: 1,
    borderColor: '#D5D5D5'
  },
  chatBalloonAttach: {
    alignItems: userBox === 'me' ? 'flex-end' : 'flex-start',
  },
  chatBalloonSticker: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  imageSticker: {
    width: 140,
    height: 140
  },
  user: {
    fontWeight: "bold"
  },
  message: {
    fontSize: 16,
    flexDirection: 'column'
  },
  boxInput: {
    width: '100%',
    minHeight: 70,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    minHeight: 30,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginLeft: 20
  },
  hour: {
    fontSize: 12,
    color: 'grey'
  },
  hourCheckContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  checkedContainer: {
    width: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: Platform.OS === 'ios' ? 1 : 0
  },
  checkReceived: {
    position: 'relative',
    right: -5
  },
  checkSent: {
    position: 'relative',
    right: 1
  },
  shareMessage: {
    borderRadius: 30,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    paddingBottom: 3,
    justifyContent: 'center',
    position: 'absolute',
    left: userBox === 'me' ? 2 : undefined,
    right: userBox === 'me' ? undefined : 2,
  },
  imageView: {
    ...boxFiles,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  imageItem: {
    width: 140,
    height: 140,
  },
  fileView: {
    ...boxFiles,
    width: 60,
    height: 80,
    backgroundColor: typeFile === 'pdf' ? '#E26363' :
      typeFile === 'doc' ? '#5A90C7' :
        typeFile === 'xls' ? '#62C75A' :
          '#C75A9D',
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  fileName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.4)',
    fontStyle: 'italic',
    marginBottom: 5
  },
  modalBox: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'rgba(96,106,112,0.75)',
    position: 'absolute',
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBoxContent: {
    minWidth: 240,
    width: '70%',
    height: 210,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBoxDate: {
    fontSize: 13,
    fontStyle: 'italic',
    color: 'rgba(96,106,112,0.75)',
    paddingBottom: 15,
  },

//  Button Small
  btnSmall: {
    width: 180,
    height: 27,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'rgba(116,155,169,0.3)',
    borderRadius: 20,
    margin: 10
  },
  btnLabel: {
    width: '100%',
    textAlign: 'center',
    fontSize: 13,
    color: 'rgb(116,155,169)',
  }
});

export default styles;