import React, { Component } from "react"
import {
    Text,
    View,
    Button,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'

import { createStackNavigator } from 'react-navigation'
import { PADDING, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../../styles/utilities'
import SplashScreen from '../../screens/auth/Splash'
import SignUpFirstScreen from '../../screens/auth/SignUp/SignUpFirst'
import SignUpSecondScreen from '../../screens/auth/SignUp/SignUpSecond'
import SignUpThirdScreen from '../../screens/auth/SignUp/SignUpThird'
import LogInScreen from '../../screens/auth/Login'
import HeaderSlider from '../../components/headerSlider'
import HeaderAuth from '../../components/headerAuth'

const navigation = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        header: <HeaderSlider/>
      }
    },
    SignUpFirst: {
      screen: SignUpFirstScreen,
      navigationOptions: ({ navigation }) => ({
        header: <HeaderAuth navigation={navigation}/>
      })
    },
    SignUpSecond: {
      screen: SignUpSecondScreen,
      navigationOptions: ({ navigation }) => ({
        header: <HeaderAuth navigation={navigation}/>
      })
    },
    SignUpThird: {
      screen: SignUpThirdScreen,
      navigationOptions: ({ navigation }) => ({
        header: <HeaderAuth navigation={navigation}/>
      })
    },
    LogIn: {
      screen: LogInScreen,
      navigationOptions: ({ navigation }) => ({
        header: <HeaderAuth navigation={navigation}/>
      })
    }
  },
  {
    initialRouteName: 'Splash',
    backBehavior: 'initialRoute',
    transitionConfig: () => ({
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps
        const { index } = scene

        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [layout.initWidth, 0, 0]
        })

        return { opacity: 1, transform: [{ translateX }] }
      }
    }),
    navigationOptions: {
      headerMode: 'screen',
      gesturesEnabled: false
    }
  }
)

export default navigation
