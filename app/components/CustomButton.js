import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { COLOR, Vh, Vw, FONT, FONT_SIZE } from '../styles/utilities'

const CustomButton = ({
  text,
  onPress,
  buttonStyle,
  textStyle
}) => (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.containerBtn, buttonStyle]}
      >
        <Text
          style={[styles.textBtn, textStyle]}
        >
          {text}
        </Text>
      </TouchableOpacity>
)

const styles = StyleSheet.create({
  containerBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    height: 8*Vh,
    width: 85*Vw
  },
  textBtn:{
    fontSize: FONT_SIZE.DEFAULT,
    fontFamily: FONT.AVENIR
  },
})

export default CustomButton
