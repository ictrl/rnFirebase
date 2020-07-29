import React, {useState} from 'react';
import {Button, TextInput, View, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import Spacer from '../components/Spacer';
import ShowError from '../components/ShowError';

const Login = () => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [number, setNumber] = useState('+91');
  const [error, setError] = useState(null);

  const [code, setCode] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    if (!phoneNumber) return;
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      setError('Something went wrong');
    }
  }

  async function confirmCode() {
    if (!code) return;
    try {
      await confirm.confirm(code);
    } catch (error) {
      setError('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <View>
        <Spacer>
          <TextInput
            style={styles.input}
            autoFocus={true}
            keyboardType={'phone-pad'}
            placeholder="Mobile Number"
            underlineColorAndroid="transparent"
            value={number}
            onChangeText={(text) => setNumber(text)}
          />
        </Spacer>
        {error ? <ShowError errMsg={error} /> : null}
        <Spacer>
          <Button
            title="Sign In"
            onPress={() => signInWithPhoneNumber(number)}
          />
        </Spacer>
      </View>
    );
  }

  return (
    <>
      <Spacer>
        <TextInput
          value={code}
          style={styles.input}
          autoFocus={true}
          keyboardType={'numeric'}
          placeholder="SMS-CODE"
          underlineColorAndroid="transparent"
          onChangeText={(text) => setCode(text)}
        />
      </Spacer>
      {error ? <ShowError errMsg={error} /> : null}
      <Spacer>
        <Button title="Confirm Code" onPress={() => confirmCode()} />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: 'black',
  },
});

export default Login;
