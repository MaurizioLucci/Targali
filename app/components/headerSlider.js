import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated
} from 'react-native'
import { PADDING, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../styles/utilities'
import Swiper from 'react-native-swiper';

class HeaderSlider extends Component {
  constructor() {
    super();
    this.animation = new Animated.Value(0)
  }
  render() {
    return(
      <View style={[styles.header, styles.colorRed]}>
        <Swiper style={styles.wrapper}
          autoplay={true}
          autoplayTimeout={6.25}
          scrollEnabled={false}
          dotStyle={{display: 'none'}}
          activeDotStyle={{display: 'none'}}>
        <View style={styles.slide}>
          <Text style={styles.textSplash}>La prima app di messaggistica tra auto</Text>
        </View>
        <View style={styles.slide}>
          <Text style={styles.textSplash}>La prima app di messaggistica tra auto</Text>
        </View>
        <View style={styles.slide}>
          <Text style={styles.textSplash}>And simple</Text>
        </View>
      </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header:{
    paddingTop: 4*Vh,
    height: 11*Vh,
    alignItems: 'center',
    justifyContent: 'center'
  },
  colorRed:{
    backgroundColor: COLOR.RED
  },
  textSplash:{
    fontFamily: FONT.AVENIR,
    color: COLOR.WHITE,
    fontSize: FONT_SIZE.DEFAULT
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default HeaderSlider
