import React, { Component } from 'react';
import { View } from 'react-native';
import ApartmentDetails from '../../components/apartmentDetails/houseDetails';

class Apartment extends Component {
  render() {
    const { navigation } = this.props;
    return <ApartmentDetails navigation={navigation} />;
  }
}

export default Apartment;
