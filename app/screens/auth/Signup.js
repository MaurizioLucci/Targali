import React, { Component } from "react";
import {
    Text,
    View,
    Button
} from 'react-native';

class SignupScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Signup Screen</Text>
                <Button
                  title="Vai all'app"
                  onPress={() => this.props.navigation.navigate('App')}
                />
            </View>
        );
    }
}

export default SignupScreen
