import React, {useContext} from 'react';
import {Text, StyleSheet, Button} from 'react-native';
import Spacer from '../components/Spacer';
import {Context as LanguageContext} from '../context/LanguageContext';

const LoginScreen = ({navigation}) => {
  const {state} = useContext(LanguageContext);
  const {text} = styles;
  const {language} = state;

  return (
    <>
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
        title="Go to Form"
        onPress={() => navigation.navigate('FormScreen')}
      />
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
