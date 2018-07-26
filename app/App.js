import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    AppRegistry,
    TouchableHighlight,
} from 'react-native';

import Root from './routes/route'

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <Root/>
        )
    }
}
