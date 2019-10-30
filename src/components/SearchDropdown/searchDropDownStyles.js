import { StyleSheet } from 'react-native';
import { inputContainerStyle } from '../apartmentDetails/houseDetailsStyles';

export default StyleSheet.create({
  containerStyle: {
    ...inputContainerStyle,
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  itemsContainerStyle: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: inputContainerStyle.borderColor,
  },
  itemStyle: {
    padding: 10,
    marginTop: 2,
    backgroundColor: '#ddd',
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 5,
  }
});
