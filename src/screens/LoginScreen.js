import React, {useContext, useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Icon} from 'react-native-elements';
import Spacer from '../components/Spacer';
import ToggleLanguage from '../components/ToggleLanguage';
import ShowError from '../components/ShowError';
import {Context as LanguageContext} from '../context/LanguageContext';
import auth from '@react-native-firebase/auth';
import {navigate} from '../navigationRef';
import OTPInputView from '@twotalltotems/react-native-otp-input';
const LoginScreen = () => {
  const [confirm, setConfirm] = useState(null);
  const [number, setNumber] = useState('+918340238999'); //todo
  const [error, setError] = useState(null);
  const [code, setCode] = useState(null);

  const {state, toggleLanguage} = useContext(LanguageContext);
  const {text, iconContainerStyle, iconStyle, otpContainer} = styles;
  const {language} = state;

  async function signInWithPhoneNumber(phoneNumber) {
    if (!phoneNumber)
      return setError(
        language ? 'कृपया मोबाइल नंबर दर्ज करें' : 'Please Enter Mobile Number',
      );
    try {
      setError(null);
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.log({error});
      setError(language ? 'कुछ गलत हो गया' : 'Something went wrong');
    }
  }

  async function confirmCode() {
    if (!code)
      return setError(language ? 'कृपया कोड दर्ज करें' : 'Please Enter Code');
    try {
      setError(null);
      await confirm.confirm(code);
      // navigate('mainFlow'); //todo
    } catch (error) {
      console.log({error});
      setError(
        language
          ? 'अवैध कोड, पुन: प्रयास करें'
          : 'Invalid code, Please try again',
      );
    }
  }

  if (!confirm) {
    return (
      <View>
        <ToggleLanguage language={language} toggleLanguage={toggleLanguage} />
        <Spacer>
          <Text style={text} h2>
            {' '}
            {language ? 'पुष्टीकरण' : 'Confirmation '}{' '}
          </Text>
        </Spacer>

        <Text style={text}>
          {' '}
          {language ? 'अपना मोबाइल नंबर दर्ज करें' : 'Enter Your Mobile Number'}
        </Text>
        <Spacer />

        <Spacer>
          <TextInput
            style={styles.input}
            autoFocus={true}
            keyboardType={'phone-pad'}
            placeholder={language ? 'मोबाइल नंबर' : 'Mobile Number'}
            underlineColorAndroid="transparent"
            value={number}
            onChangeText={(text) => setNumber(text)}
          />
        </Spacer>
        {error ? <ShowError errMsg={error} /> : null}

        <View style={iconContainerStyle}>
          <TouchableOpacity
            onPress={() => signInWithPhoneNumber(number)}
            activeOpacity={0.7}>
            <Icon
              style={iconStyle}
              type="feather"
              color="white"
              size={50}
              name="arrow-right"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View>
      <ToggleLanguage language={language} toggleLanguage={toggleLanguage} />
      <Spacer>
        <Text style={text} h2>
          {' '}
          {language ? 'पुष्टीकरण' : 'Confirmation '}{' '}
        </Text>
      </Spacer>
      <Text style={text}> {language ? 'OTP दर्ज करें' : 'Enter OTP'}</Text>

      <View style={otpContainer}>
        <OTPInputView
          style={{width: '80%', height: 200}}
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(text) => setCode(text)}
        />
      </View>

      {error ? <ShowError errMsg={error} /> : null}

      <View style={iconContainerStyle}>
        <TouchableOpacity onPress={() => confirmCode()} activeOpacity={0.7}>
          <Icon
            style={iconStyle}
            type="feather"
            color="white"
            size={50}
            name="arrow-right"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    textAlign: 'center',
  },
  input: {
    textAlign: 'center',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 60,
    fontSize: 20,
    borderBottomWidth: 0,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    paddingTop: 15,
  },
  iconContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    marginTop: 250,
    backgroundColor: '#18434D',
    borderRadius: 50,
    paddingTop: 15,
    height: 80,
    width: 80,
    textAlign: 'center',
  },

  otpContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -50,
  },
  borderStyleBase: {
    width: 35,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#18434D',
  },

  underlineStyleBase: {
    borderRadius: 50,
    width: 50,
    height: 50,
    color: 'black',
    fontSize: 20,
    backgroundColor: 'white',
  },

  underlineStyleHighLighted: {
    borderColor: '#18434D',
    backgroundColor: 'white',
  },
});

LoginScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

export default LoginScreen;
