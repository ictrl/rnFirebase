import React from 'react';
import {Text, StyleSheet, Button} from 'react-native';

const LanguageScreen = ({navigation}) => {
  return (
    <>
      <Text> Language Screen </Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </>
  );
};

const styles = StyleSheet.create({});
export default LanguageScreen;
