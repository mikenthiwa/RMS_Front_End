import React, { Component, Fragment } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRecordVinyl, faTimes } from '@fortawesome/free-solid-svg-icons';
import Record from '../../assets/images/record.svg';
import Stop from '../../assets/images/stop.svg';
import styles from './cameraStyles';

class Camera extends Component {
  state = {
    isRecording: false,
  };
  takePicture = async camera => {
    this.setState(prevState => ({
      prevState,
      isRecording: !prevState.isRecording,
    }));
    const options = { quality: 0.5, base64: true };
    const data = await camera.recordAsync(options);

    console.log(data.uri);
  };
  pendingView = () => {
    const { pendingCont } = styles;
    return (
      <View style={pendingCont}>
        <Text>Waiting</Text>
      </View>
    );
  };
  render() {
    const { recordContainer, times, recordIcon, rnCamera } = styles;
    const { closeModal } = this.props;
    const { isRecording } = this.state;
    console.log(isRecording);
    return (
      <View>
        <RNCamera
          style={rnCamera}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}>
          {({ camera, status, androidRecordAudioPermissionOptions }) => {
            if (status !== 'READY') {
              return this.pendingView();
            }
            return (
              <Fragment>
                <FontAwesomeIcon
                  icon={faTimes}
                  color="white"
                  style={times}
                  size={30}
                  onPress={closeModal}
                />
                <View style={recordContainer}>
                  <TouchableOpacity onPress={() => this.takePicture(camera)}>
                    {isRecording ? <Stop /> : <Record />}
                  </TouchableOpacity>
                </View>
              </Fragment>
            );
          }}
        </RNCamera>
      </View>
    );
  }
}

export default Camera;
