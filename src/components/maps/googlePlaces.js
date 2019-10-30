import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import styles from './googlePlacesStyles';

class GooglePlace extends Component {
  openSearchModal() {
    console.log(1235);
    RNGooglePlaces.openAutocompleteModal()
      .then(place => {
        console.log(place);
        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
      })
      .catch(error => console.log(error.message)); // error is a Javascript Error object
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.openSearchModal()}>
          <Text>Pick a Place</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default GooglePlace;
