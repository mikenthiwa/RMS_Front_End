import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import Camera from '../camera';

import styles from './houseDetailsStyles';

class UploadVideoSection extends Component {
  render() {
    return <Camera />;
  }
}

export default UploadVideoSection;
