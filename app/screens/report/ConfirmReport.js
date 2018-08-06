import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    Animated
} from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH, PADDING, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../../styles/utilities'
import CustomButton from '../../components/CustomButton'


class ConfirmReportScreen extends Component {

  goToReports = () => {
    this.props.closeModal()
    this.props.navigation.navigate('Chat')
  }

  goToHome = () => {
    this.props.closeModal()
    this.props.navigation.navigate('Home')
  }

  render() {
      return (
          <Animated.View style={[styles.container, this.props.style]}>
              <Text style={styles.title}>Segnalazione avvenuta con successo</Text>
              <Text style={styles.subtitle}>Grazie! il tuo Feedback per noi è importante. Riceverai i ringraziamenti direttamente dal proprietario della macchina.</Text>
              <View style={styles.recapButtons}>
                <CustomButton buttonStyle={styles.signupBtn} textStyle={styles.signupTextBtn} text="Vai alle mie segnalazioni" onPress={this.goToReports}/>
                <CustomButton buttonStyle={styles.loginBtn} textStyle={styles.loginTextBtn} text="Chiudi" onPress={this.goToHome}/>
              </View>
          </Animated.View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex:300,
    height: 100*Vh,
    width: 100*Vw,
    backgroundColor: COLOR.GREEN,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title:{
    fontSize: FONT_SIZE.XL,
    fontFamily: FONT.BEBAS,
    color: 'rgba(18,18,18,0.2)',
    width: '100%',
    paddingHorizontal: PADDING.HORIZONTAL_CONTAINER
  },
  subtitle:{
    marginTop: 2*Vh,
    fontSize: FONT_SIZE.DEFAULT,
    fontFamily: FONT.AVENIR,
    color: 'rgba(18,18,18,0.2)',
    width: '100%',
    paddingHorizontal: PADDING.HORIZONTAL_CONTAINER
  },
  recapButtons:{
    position: 'absolute',
    bottom: 8*Vh,
    alignSelf: 'center',
    paddingHorizontal: PADDING.HORIZONTAL_CONTAINER
  },
  signupBtn:{
    backgroundColor: COLOR.WHITE
  },
  signupTextBtn:{
    color: COLOR.GREEN
  },
  loginTextBtn:{
    color:'rgba(18,18,18,0.2)',
    fontSize: FONT_SIZE.S,
  },
})

export default ConfirmReportScreen
