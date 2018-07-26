import React, { Component } from "react";
import {
    Text,
    View,
    Button
} from 'react-native';

class LoginScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Login Screen</Text>
                <Button
                  title="Vai alla registrazione"
                  onPress={() => this.props.navigation.navigate('SignUp')}
                />
                <Button
                  title="Vai all'app"
                  onPress={() => this.props.navigation.navigate('App')}
                />
            </View>
        );
    }
}

export default LoginScreen
