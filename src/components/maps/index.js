import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

class Maps extends Component {
  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };

  UNSAFE_componentWillReceiveProps(
    nextProps: Readonly<P>,
    nextContext: any,
  ): void {
    const { region } = nextProps;
    this.setState({ region });
  }

  onRegionChange = region => {
    this.setState({ region });
  };
  onPress = event => {
    const { onMarkerPress } = this.props;
    const {
      nativeEvent: { coordinate },
    } = event;
    onMarkerPress(coordinate);
  };

  render() {
    const {
      region,
      region: { latitude, longitude },
    } = this.state;
    return (
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={region}
        // onRegionChange={this.onRegionChange}
        loadingIndicatorColor="blue"
        loadingEnabled={true}
        showsUserLocation={true}
        // onMarkerPress={this.onPress}
        initialRegion={region}>
        <Marker
          coordinate={{ latitude, longitude }}
          title="geo-location of your apartment"
          description='current location'
          onPress={this.onPress}
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default Maps;
