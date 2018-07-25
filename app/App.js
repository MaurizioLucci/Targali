import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    AppRegistry,
    TouchableHighlight,
} from 'react-native';
import { Vh, Vw } from './styles/utilities'
import { createBottomTabNavigator } from 'react-navigation';

import HomeScreen from './screens/Home';
import AssistanceScreen from './screens/Assistance';
import ProfileScreen from './screens/profile/Profile';

type Props = {};
export default class App extends Component<Props> {
    // let ciao = 'ciao';
    render() {
        return <RootStack/>;
    }
}

const RootStack = createBottomTabNavigator(
    {
        Home: {
          screen: HomeScreen,
          navigationOptions: ({ navigation }) => ({
            tabBarIcon: <Image source={require('../assets/images/home_.png')} style={styles.img}/>
          })
        },
        Profile: {
          screen: ProfileScreen,
          navigationOptions: ({ navigation }) => ({
            tabBarIcon: <Image source={require('../assets/images/profile.png')} style={styles.img}/>,

          })
        },
        AddReport : {
          screen: HomeScreen,
          navigationOptions: ({ navigation }) => ({
            tabBarIcon: <Image source={require('../assets/images/segnalazione.png')} style={styles.img}/>
          })
        },
        VocalAssistance: {
          screen: AssistanceScreen,
          navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => { return <Image source={require('../assets/images/vocal.png')} style={styles.img}/>}
          })
        },
    },
    {
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
