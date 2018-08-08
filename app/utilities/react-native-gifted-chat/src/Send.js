/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import Color from './Color';
import { COLOR, FONT, FONT_SIZE, Vh, Vw } from '../../../styles/utilities'

export default function Send({ text, containerStyle, onSend, children, textStyle, label }) {
  if (text.trim().length > 0) {
    return (
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        onPress={() => {
          onSend({ text: text.trim() }, true);
        }}
        accessibilityTraits="button"
      >
        <View>{children || <Text style={[styles.text, textStyle]}>{label}</Text>}</View>
      </TouchableOpacity>
    );
  }
  return <View />;
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'flex-end',
    marginRight: 10,
    // transform:[{translateX:45}],
    backgroundColor: 'rgba(0,0,0,0)'
  },
  text: {
    fontFamily: FONT.AVENIR,
    color: COLOR.BLUE,
    fontSize: 15,
    marginBottom: 12,
    marginLeft: 10,
    zIndex: 200,
    backgroundColor: 'rgba(0,0,0,0)'
  },
});

Send.defaultProps = {
  text: '',
  onSend: () => {},
  label: 'Send',
  containerStyle: {},
  textStyle: {},
  children: null,
};

Send.propTypes = {
  text: PropTypes.string,
  onSend: PropTypes.func,
  label: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  children: PropTypes.element,
};
