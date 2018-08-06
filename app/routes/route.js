import React, {Component} from 'react'
import { createSwitchNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import {
    StyleSheet,
    Text,
    View,
    Image,
    AppRegistry,
    TouchableHighlight,
} from 'react-native';
import { Vh, Vw } from '../styles/utilities'
import HomeScreen from '../screens/Home'
import AssistanceScreen from '../screens/Assistance'
import ProfileScreen from '../screens/profile/Profile'
import ReportScreen from '../screens/report/AddReport'
import ChatScreen from '../screens/profile/Chat'
import MessageScreen from '../screens/profile/Message'
import SplashScreen from '../screens/auth/Splash'
import AuthStack from './auth/auth'
import { COLOR } from '../styles/utilities'
// const AppStack = StackNavigator({ Home: HomeScreen, Assistance: AssistanceScreen });

const Pages =
  {
      Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({tintColor, focused}) => <Image source={require('../../assets/images/home_.png')} style={[styles.img, focused && {tintColor:"#000"}]}/>
        })
      },
      Profile: {
        screen: ProfileScreen,
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({tintColor, focused}) => <Image source={require('../../assets/images/user.png')} style={[styles.img, styles.bigger, focused && {tintColor:"#000"}]}/>,

        })
      },
      AddReport : {
        screen: ReportScreen,
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({tintColor, focused}) => <Image source={require('../../assets/images/segnalazione.png')} style={[styles.img, styles.main, focused && {tintColor:"#000"}]}/>,
          tabBarVisible: false
        })
      },
      Chat : {
        screen: ChatScreen,
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({tintColor, focused}) => <Image source={require('../../assets/images/message.png')} style={[styles.img, styles.bigger, focused && {tintColor:"#000"}]}/>
        })
      },
      VocalAssistance: {
        screen: AssistanceScreen,
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, tintColor }) => <Image source={require('../../assets/images/vocal.png')} style={[styles.img, focused && {tintColor:"#000"}]}/>,
          tabBarVisible: false
        })
      }
  }

const TabBar = createBottomTabNavigator(Pages, {
  initialRouteName: 'Profile',
  animationEnabled: true,
  tabBarOptions: {
    showLabel: false,
    style: {
     paddingVertical: 4*Vh,
     borderTopWidth:0,
     backgroundColor: "#fff"
    }
  }
})

const AppStack = createStackNavigator(
  {
    Main: {
      screen: TabBar
    },
    Message:{
      screen: MessageScreen,
    }
  },
  {headerMode: 'none'}
)

const Main = createSwitchNavigator(
  {
    AuthLoading: SplashScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'App'
  }
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        bottom: 0,
        height: '10%',
        left: 0,
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        // padding: 20
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    btn: {
        // backgroundColor: 'red',
        // width: '70%',
    },
    img: {
      tintColor: 'rgba(0,0,0,0.15)',
      // width: 12*Vw,
      height: 'auto',
      width: 12*Vw,
      padding: 20
    },
    bigger:{
      width: 13*Vw,
    },
    main:{
      // width: 18*Vw,
      // height: 18*Vw,
      tintColor: COLOR.RED
    }
});

export default Main
