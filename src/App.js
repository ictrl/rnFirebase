import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Login from './screens/Login';
import Logout from './screens/Logout';
import Spacer from './components/Spacer';

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const usersCollection = firestore().collection('Users');

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);

    if (user) {
      const {phoneNumber, metadata, uid} = user;
      const data = {
        uid,
        phoneNumber,
        creationTime: metadata.creationTime,
        lastSignInTime: metadata.lastSignInTime,
      };

      usersCollection.add(data).then(() => {
        console.log('User added!');
      });
    }

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
      <Spacer>
        <Text>Welcome {user.phoneNumber}</Text>
      </Spacer>
      <Spacer>
        <Logout />
      </Spacer>
    </View>
  );
};

export default App;
