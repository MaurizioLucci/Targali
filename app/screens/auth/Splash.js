import React, { Component } from "react";
import {
    Text,
    View,
} from 'react-native';

class SplashScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Splash Screen</Text>
                <Button
                  title="Vai alla registrazione"
                  onPress={() => this.props.navigation.navigate('Details')}
                />
                <Button
                  title="Vai al login"
                  onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }
}

export default SplashScreen
