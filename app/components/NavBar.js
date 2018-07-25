/** *  created by gianluca on 26/03/2018 */
import React from "react";
import {
    View,
    StyleSheet,
    Button,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import {StackNavigator} from 'react-navigation';

export class NavBar extends React.Component {
    state = {
        buttons: [{
            page: 'Home',
            icon: require('../assets/images/home_.png')
        }, {
            page: 'Profile',
            icon: require('../assets/images/profile.png')
        }, {
            page: 'Segnalazione',
            icon: require('../assets/images/segnalazione.png')
        }, {
            page: 'Vocal',
            icon: require('../assets/images/vocal.png')
        }]
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    {this.state.buttons.map((obj, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.btn}
                                title={obj.page}
                                onPress={() => this._handlePress(this)}
                            >
                                <Image source={obj.icon} style={styles.img}/>
                            </TouchableOpacity>
                        );
                    })
                    }
                </View>
            </View>
        );
    };

    _handlePress(event) {
        console.log('Pressed!', event, this);
        // this.props.navigation.navigate(event);
    };
}

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
        marginTop: '-4%',
        marginRight: 20,
        // backgroundColor: 'green',
        margin: 0,
        transform: [
            {scaleX: 0.4},
            {scaleY: 0.4}
        ],
    }
});
