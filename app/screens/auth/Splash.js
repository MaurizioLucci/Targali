import React, { Component } from "react";
import {
    Text,
    View,
    Button,
    StyleSheet
} from 'react-native';
import { PADDING, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../../styles/utilities'
import CustomButton from '../../components/CustomButton'

class SplashScreen extends Component {
    render() {
        return (
          <React.Fragment>
            <View style={styles.loaderContainer}>
              <View style={styles.loader}/>
            </View>
            <View style={styles.container}>
                <View style={styles.welcomeContainer}>
                  <Text style={styles.welcomeText}>Benvenuto in</Text>
                  <Text style={styles.targali}>Targali</Text>
                </View>
                <View></View>
                <View style={styles.buttonsContainer}>
                  <CustomButton buttonStyle={styles.signupBtn} textStyle={styles.signupTextBtn} text="Registrati" onPress={() => this.props.navigation.navigate('SignUp')}/>
                  <CustomButton buttonStyle={styles.loginBtn} textStyle={styles.loginTextBtn} text="Accedi" onPress={() => this.props.navigation.navigate('LogIn')}/>
                </View>
            </View>
            </React.Fragment>
        );
    }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingVertical: PADDING.VERTICAL_CONTAINER,
    paddingHorizontal: PADDING.HORIZONTAL_CONTAINER,
    backgroundColor: COLOR.BLUE,
    alignItems: 'center',
  },
  loaderContainer:{
    width: 100*Vw,
    height: 0.3*Vh,
    backgroundColor: COLOR.RED
  },
  loader:{
    width: 60*Vw,
    height: 0.3*Vh,
    backgroundColor: COLOR.WHITE
  },
  welcomeText:{
    fontFamily: FONT.AVENIR,
    color: COLOR.WHITE,
    fontSize: FONT_SIZE.DEFAULT,
    textAlign: 'center',
    marginBottom: 2*Vh
  },
  targali:{
    fontFamily: FONT.BEBAS,
    color: COLOR.WHITE,
    fontSize: FONT_SIZE.XL
  },
  signupBtn:{
    backgroundColor: COLOR.WHITE
  },
  signupTextBtn:{
    color: COLOR.BLUE
  },
  loginTextBtn:{
    color:COLOR.WHITE,
    textDecorationLine: 'underline'
  }
});

export default SplashScreen
