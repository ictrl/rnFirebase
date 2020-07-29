import React from 'react';
import {setNavigator} from './navigationRef';
import LanguageScreen from './screens/LanguageScreen';
import LoginScreen from './screens/LoginScreen';
import FormScreen from './screens/FormScreen';
import ShareScreen from './screens/ShareScreen';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {Provider as LanguageProvider} from './context/LanguageContext';

const navigationFlow = createStackNavigator({
  LanguageScreen,
  LoginScreen,
  FormScreen,
  ShareScreen,
});

const App = createAppContainer(navigationFlow);

export default () => {
  return (
    <LanguageProvider>
      <App ref={(navigator) => setNavigator(navigator)} />
    </LanguageProvider>
  );
};
