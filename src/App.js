import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Login from './screens/Login';
import Logout from './screens/Logout';

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const usersCollection = firestore().collection('Users');

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);

    const {phoneNumber, metadata, uid} = user;
    const data = {
      uid,
      phoneNumber,
      creationTime: metadata.creationTime,
      lastSignInTime: metadata.lastSignInTime,
    };

    firestore()
      .collection('Users')
      .add(data)
      .then(() => {
        console.log('User added!');
      });

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return <Login />;
  }

  return (
    <View>
      <Text>Welcome {user.phoneNumber}</Text>
      <Logout />
    </View>
  );
};

export default App;
