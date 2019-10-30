import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

export const inputContainerStyle = {
  backfaceVisibility: 'visible',
  borderColor: '#DCDCDC',
  borderLeftWidth: 1,
  borderRightWidth: 1,
  borderTopWidth: 1,
  height: 40,
  borderRadius: 5,
  marginTop: 10,
  paddingRight: 5,
  alignItems: 'center',
};

export default StyleSheet.create({
  apartmentFormCont: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  containerStyle: {
    marginTop: 30,
  },
  labelStyle: {
    marginTop: 20,
    fontWeight: '700',
    color: 'black',
    fontSize: 16,
  },
  inputContainerStyle,
  locationContainerStyle: {
    marginLeft: 10,
    marginRight: 10,
  },
  bedrooms: {
    ...inputContainerStyle,
    width: 80,
  },
  bedroomLabel: {
    paddingLeft: 10,
    marginTop: 20,
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
  },
  bedroomInputContainer: {
    ...inputContainerStyle,
    width: 80,
  },
  checkBoxCont: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonContainerStyle: {
    marginTop: 40,
    width: 200,
    alignSelf: 'center',
    elevation: 8,
  },
  mapContainer: {
    width,
    height: height / 3,
    left: 0,
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 4,
    elevation: 10,
    opacity: 0.9,
  },
  hiddenMapContainer: {},
  googleIconContainer: {
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  labelLocation: {
    marginBottom: 10,
  },
  googleIcon: {
    marginLeft: 10,
  },
  overlayStyle: {
    width,
    height,
    padding: 0,
  },
  uploadVideoButtonContainer: {
    marginLeft: 10,
  },
  uploadVideoButton: {
    width: 80,
    height: 40,
  },

  // Upload Video section
  addImageBody: {},

  uploadButtonContainer: {},
  imageContainer: {},
});
