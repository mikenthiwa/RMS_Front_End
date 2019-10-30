import React, { Fragment } from 'react';
import { createAppContainer } from 'react-navigation';
import { Dimensions, View } from 'react-native';
import HomeScreen from '../views/home';
import ApartmentScreen from '../views/apartment';
import ApartmentVideoScreen from '../views/apartmentVideoPage';
import FlashMessage from 'react-native-flash-message';

import { createDrawerNavigator } from 'react-navigation-drawer';

const width = Dimensions * 0.8;

const DrawerConfig = {
  initialRouteName: 'Home',
};
const AppNavigator = createDrawerNavigator(
  {
    Home: HomeScreen,
    'Add Apartment': ApartmentScreen,
    'Upload Video': ApartmentVideoScreen,
  },
  DrawerConfig,
);
const AppContainer = createAppContainer(AppNavigator);

const Routes = () => {
  return (
    <Fragment>
      <AppContainer />
      <FlashMessage position="top" />
    </Fragment>
  );
};

export default Routes;
