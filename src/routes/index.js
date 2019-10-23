import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../views/home';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
});

const AppContainer = createAppContainer(AppNavigator);
export default () => <AppContainer />;
