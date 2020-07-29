import React from 'react';
import {setNavigator} from './navigationRef';
import LanguageScreen from './screens/LanguageScreen';
import LoginScreen from './screens/LoginScreen';
import FormScreen from './screens/FormScreen';
import ShareScreen from './screens/ShareScreen';
import ResolveAuthScreen from './screens/ResolveAuthScreen';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {Provider as LanguageProvider} from './context/LanguageContext';

const switchNavigator = createSwitchNavigator({
  ResolveAuthScreen,
  authFlow: createStackNavigator({
    Language: LanguageScreen,
    LoginScreen: LoginScreen,
  }),
  mainFlow: createStackNavigator({
    Form: FormScreen,
    Share: ShareScreen,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <LanguageProvider>
      <App ref={(navigator) => setNavigator(navigator)} />
    </LanguageProvider>
  );
};
