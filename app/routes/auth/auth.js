import React, { Component } from "react";
import {
    Text,
    View,
    Button,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';

import { createStackNavigator } from 'react-navigation';
import { PADDING, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../../styles/utilities'
import SplashScreen from '../../screens/auth/Splash';
import SignUpScreen from '../../screens/auth/Signup';
import LogInScreen from '../../screens/auth/Login';
import HeaderSlider from '../../components/headerSlider';

const styles = StyleSheet.create({
  header:{
    paddingTop: 4*Vh,
    height: 11*Vh,
    alignItems: 'center',
    justifyContent: 'center'
  },
  colorBlue:{
    backgroundColor: COLOR.BLUE
  },
  title:{
    alignSelf: 'flex-start',
    paddingLeft: PADDING.HORIZONTAL_CONTAINER,
    flexDirection: 'row'
  },
  arrow:{
    fontSize:16,
    paddingRight: 3*Vw,
    fontFamily: FONT.AVENIR,
    color: COLOR.WHITE
  },
  textBack:{
    fontFamily: FONT.BEBAS,
    color: COLOR.WHITE,
    fontSize: FONT_SIZE.M
  }
})

const navigation = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        header: <HeaderSlider/>
      }
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: ({ navigation }) => ({
        header: <View style={[styles.header, styles.colorBlue]}><TouchableWithoutFeedback onPress={()=> navigation.goBack()}><View style={styles.title}><Text style={styles.arrow}>←</Text><Text style={styles.textBack}>targali</Text></View></TouchableWithoutFeedback></View>
      })
    },
    LogIn: {
      screen: LogInScreen,
      navigationOptions: ({ navigation }) => ({
        header: <View style={[styles.header, styles.colorBlue]}><TouchableWithoutFeedback onPress={()=> navigation.goBack()}><View style={styles.title}><Text style={styles.arrow}>←</Text><Text style={styles.textBack}>targali</Text></View></TouchableWithoutFeedback></View>
      })
    }
  },
  {
    initialRouteName: 'Splash',
    transitionConfig: () => ({
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [layout.initWidth, 0, 0]
        });

        return { opacity: 1, transform: [{ translateX }] };
      }
    }),
    navigationOptions: {
      headerMode: 'screen',
      gesturesEnabled: false
    }
  }
);

export default navigation
