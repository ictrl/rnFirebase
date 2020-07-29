import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import SplashScreen from './SplashScreen';
import LanguageScreen from './LanguageScreen';
import FormScreen from './FormScreen';
import {navigate} from '../navigationRef';

const ResolveAuthScreen = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    console.log('---->', user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return <SplashScreen />;

  if (!user) {
    return <LanguageScreen />;
  }

  return <FormScreen />;
};

export default ResolveAuthScreen;
