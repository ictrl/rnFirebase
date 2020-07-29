import React, {useContext, useState} from 'react';
import {Text, View, TextInput, StyleSheet, Button} from 'react-native';
import Spacer from '../components/Spacer';
import {Context as LanguageContext} from '../context/LanguageContext';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [confirm, setConfirm] = useState(null);
  const [number, setNumber] = useState(null);
  const [code, setCode] = useState('');

  const {state} = useContext(LanguageContext);
  const {text} = styles;
  const {language} = state;

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
        <Spacer>
          <Text style={text}>
            {' '}
            {language === 'English' ? 'Login' : 'पुष्टिकरें'}{' '}
          </Text>
        </Spacer>

        <Text style={text}>
          {' '}
          {language === 'English'
            ? 'Enter Your Mobile Number'
            : 'अपना मोबाइल नंबर दर्ज करें'}{' '}
        </Text>
        <Spacer />
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

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    textAlign: 'center',
  },
});

export default LoginScreen;
