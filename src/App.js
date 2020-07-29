import React from 'react';
import {View, Text} from 'react-native';

import LanguageScreen from './screens/LanguageScreen';
import LoginScreen from './screens/LoginScreen';
import FormScreen from './screens/FormScreen';
import ShareScreen from './screens/ShareScreen';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const navigationFlow = createStackNavigator({
  LanguageScreen,
  LoginScreen,
  FormScreen,
  ShareScreen,
});

const App = createAppContainer(navigationFlow);

export default App;
