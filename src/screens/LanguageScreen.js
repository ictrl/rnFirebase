import React, {useContext} from 'react';
import {Text, StyleSheet, Button} from 'react-native';
import Spacer from '../components/Spacer';
import {Context as LanguageContext} from '../context/LanguageContext';

const LanguageScreen = () => {
  const {state, changeLanguage} = useContext(LanguageContext);
  const {text} = styles;
  const {language} = state;

  return (
    <>
      <Spacer>
        <Text style={text}> Select Your Language </Text>
        <Text style={text}> (अपनी भाषा चुनिए) </Text>
      </Spacer>
      <Spacer />

      <Button
        color={language === 'English' ? 'red' : null}
        title="English"
        onPress={() => changeLanguage('English')}
      />
      <Spacer />
      <Button
        color={language === 'Hindi' ? 'red' : null}
        title="Hindi"
        onPress={() => changeLanguage('Hindi')}
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
export default LanguageScreen;
