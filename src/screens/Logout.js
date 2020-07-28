import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import auth from '@react-native-firebase/auth';

const Logout = () => {
  // Handle the button press
  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return <Button title="Logout" onPress={logout} />;
};

export default Logout;
