import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  Linking,
  // StatusBar,
} from 'react-native';
import {Text, Icon} from 'react-native-elements';
import {shareOnFacebook} from 'react-native-social-share';
import Spacer from '../components/Spacer';
import {Context as LanguageContext} from '../context/LanguageContext';

const imgSrc = require('../assets/shareImg.png');

const ShareScreen = () => {
  const {state} = useContext(LanguageContext);
  const {language} = state;
  const {
    container,
    numberStyle,
    paragraphStyle,
    headerStyle,
    image,
    phoneIconStyle,
    numberContainer,
    socialIconContainerStyle,
    facebookStyle,
    whatsappStyle,
  } = styles;

  const makeCall = () => {
    if (Platform.OS === 'android') {
      console.log(Platform.OS);
      phoneNumber = 'tel:${9876543210}';
    } else {
      phoneNumber = 'telprompt:${9876543210}';
    }

    Linking.openURL(phoneNumber);
  };

  const shareToWhatsApp = () => {
    if (Platform.OS === 'android') {
      Linking.openURL('whatsapp://send?text=add playstore app link ');

      phoneNumber = 'tel:${9876543210}';
    } else {
      Linking.openURL('whatsapp://send?text=add appstore app link ');
    }
  };

  const shareToFacebook = () => {
    shareOnFacebook(
      {
        text: 'Samrat Saurav Jaiswal',
        link: 'https://samratjaiswal.com',
        imagelink: 'https://samratjaiswal.com/assets/img/dp.png',
        //or use image
        image: 'Personal Image',
      },
      (results) => {
        console.log(results);
      },
    );
  };

  return (
    <View style={container}>
      {/* <StatusBar backgroundColor="lightgray" /> */}
      <Spacer>
        <Image source={imgSrc} style={image} />
      </Spacer>

      <Text style={headerStyle} h4>
        {language
          ? 'आपका विवरण जमा कर दिया गया है'
          : 'Your details have been submitted'}
      </Text>

      <Spacer>
        <Text style={paragraphStyle}>
          {language
            ? 'किसी भी नौरारी की जानकारी के लिए इस नंबर पर संपर्क करे'
            : 'For any job information, contact this number.'}
        </Text>
      </Spacer>
      <Spacer>
        <TouchableOpacity onPress={makeCall} activeOpacity={0.7}>
          <View style={numberContainer}>
            <Text style={numberStyle} h3>
              9876543210
            </Text>
            <Icon
              style={phoneIconStyle}
              type="FontAwesome"
              color="white"
              size={30}
              name="phone"
            />
          </View>
        </TouchableOpacity>
      </Spacer>
      <Spacer>
        <Text style={paragraphStyle}>
          {language ? 'एप्लीकेशन को शेयर करे ' : 'Share application'}
        </Text>
      </Spacer>
      <Spacer>
        <View style={socialIconContainerStyle}>
          <TouchableOpacity onPress={shareToWhatsApp} activeOpacity={0.7}>
            <Icon
              style={whatsappStyle}
              type="fontisto"
              color="white"
              size={30}
              name="whatsapp"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={shareToFacebook} activeOpacity={0.7}>
            <Icon
              style={facebookStyle}
              type="fontisto"
              color="white"
              size={30}
              name="facebook"
            />
          </TouchableOpacity>
        </View>
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    alignSelf: 'center',
    height: 300,
    width: 300,
  },
  headerStyle: {
    fontSize: 30,
    textAlign: 'center',
  },
  paragraphStyle: {
    fontSize: 20,
    color: 'gray',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  numberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 50,
  },
  numberStyle: {
    color: '#1B73E8',
    textAlign: 'center',
    marginTop: 5,
  },
  phoneIconStyle: {
    backgroundColor: '#1B73E8',
    borderRadius: 50,
    paddingTop: 10,
    height: 50,
    width: 50,
  },
  socialIconContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 80,
  },
  facebookStyle: {
    backgroundColor: '#4267B2',
    borderRadius: 50,
    paddingTop: 20,
    height: 70,
    width: 70,
  },
  whatsappStyle: {
    backgroundColor: '#4AC959',
    borderRadius: 50,
    paddingTop: 20,
    height: 70,
    width: 70,
  },
});

ShareScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

export default ShareScreen;
