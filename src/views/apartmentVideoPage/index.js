import React, { Component } from 'react';
import UploadVideoSection from '../../components/apartmentDetails/apartmentVideo';

class VideoPage extends Component {
  static navigationOptions = {
    drawerLabel: () => null,
  };
  render() {
    return <UploadVideoSection />;
  }
}

export default VideoPage;
