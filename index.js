/** @format */

import React, { Component } from 'react'
import { AppRegistry, View } from 'react-native'
import App from './app/App';
import {name as appName} from './app.json';
import I18n from 'react-native-i18n';

AppRegistry.registerComponent(appName, () => App);
