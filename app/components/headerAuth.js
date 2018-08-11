import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native'
import { PADDING, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../styles/utilities'

class HeaderAuth extends Component {
  render(){
    return(
      <View style={[styles.header, styles.colorBlue]}>
        <TouchableWithoutFeedback onPress={()=>this.props.navigation.goBack()}>
          <View style={styles.title}>
            <Text style={styles.arrow}>←</Text>
            <Text style={styles.textBack}>targali</Text>
          </View>
        </TouchableWithoutFeedback>
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
  colorBlue:{
    backgroundColor: COLOR.BLUE
  },
  title:{
    alignSelf: 'flex-start',
    paddingLeft: PADDING.HORIZONTAL_CONTAINER,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center'
  },
  arrow:{
    fontSize:16,
    paddingRight: 3*Vw,
    fontFamily: FONT.AVENIR,
    color: COLOR.WHITE,
    transform:[
      {translateY: -2}
    ]
  },
  textBack:{
    fontFamily: FONT.BEBAS,
    color: COLOR.WHITE,
    fontSize: FONT_SIZE.M
  }
})

export default HeaderAuth
