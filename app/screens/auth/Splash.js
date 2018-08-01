import React, { Component } from "react";
import {
    Text,
    View,
    Button,
    StyleSheet,
    Image,
    Animated,
    Easing
} from 'react-native';
import { PADDING, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../../styles/utilities'
import CustomButton from '../../components/CustomButton'

class SplashScreen extends Component {
  constructor() {
    super();
  }
  componentWillMount(){
    this.animation = new Animated.Value(0);
    this.cycleAnimation();
  }

  cycleAnimation = () => {
    Animated.sequence([
      Animated.timing(this.animation, {
        toValue: 1,
        duration: 6000,
        delay: 0
      }),
      Animated.timing(this.animation, {
        toValue: 0,
        duration: 1,
        delay: 500
      })
    ]).start(() => {
      this.cycleAnimation()
    });
  }
  render() {
    const width = {width: this.animation.interpolate({inputRange: [0,1], outputRange:[0, 100*Vw], extrapolate: "clamp"})}
    return (
      <React.Fragment>
        <View style={styles.loaderContainer}>
          <Animated.View style={[styles.loader, width]}/>
        </View>
        <View style={styles.container}>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Benvenuto in</Text>
              <Text style={styles.targali}>Targali</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} resizeMode="contain" source={require('../../../assets/images/welcome-image.png')}/>
            </View>
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
    // marginBottom: 2*Vh
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
  },
  imageContainer:{
    justifyContent: 'center',
    height: 45*Vh,
    overflow: 'hidden',
    marginBottom: 6*Vh,
    width: 100*Vw
  },
  image:{
    width: '100%',
    flex: 1
  }
});

export default SplashScreen
