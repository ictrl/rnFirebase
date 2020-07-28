import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import auth from '@react-native-firebase/auth';

const Login = () => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [number, setNumber] = useState(null);

  const [code, setCode] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <View>
        <TextInput value={number} onChangeText={(text) => setNumber(text)} />
        <Button
          title="Phone Number Sign In"
          onPress={() => signInWithPhoneNumber(number)}
        />
      </View>
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={(text) => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
};

export default Login;
