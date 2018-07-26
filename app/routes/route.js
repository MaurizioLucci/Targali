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
import SplashScreen from '../screens/auth/Splash'
import AuthStack from './auth/auth'
// const AppStack = StackNavigator({ Home: HomeScreen, Assistance: AssistanceScreen });

const Pages =
  {
      Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: <Image source={require('../../assets/images/home_.png')} style={styles.img}/>
        })
      },
      Profile: {
        screen: ProfileScreen,
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: <Image source={require('../../assets/images/profile.png')} style={styles.img}/>,

        })
      },
      AddReport : {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: <Image source={require('../../assets/images/segnalazione.png')} style={styles.img}/>
        })
      },
      VocalAssistance: {
        screen: AssistanceScreen,
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, tintColor }) => { return <Image source={require('../../assets/images/vocal.png')} style={styles.img}/>}
        })
      }
  }

const TabBar = createBottomTabNavigator(Pages, {
  initialRouteName: 'Profile',
  animationEnabled: true,
  tabBarOptions: {
    showLabel: false,
    activeTintColor: '#f00',
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
    initialRouteName: 'Auth'
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
        transform: [
            {scaleX: 0.3},
            {scaleY: 0.3}
        ],
        // tintColor: '#f0f'
    }
});

export default Main
