import React, { Component } from "react";
import {
    Text,
    View,
    Button,
    StyleSheet,
    TextInput,
    Keyboard,
    Animated,
    Easing
} from 'react-native';
import { PADDING, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../../styles/utilities'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomButton from '../../components/CustomButton'

class LoginScreen extends Component {
  constructor(){
    super()
    this.errorAnimation = new Animated.Value(0)
    this.state = {
      data:{
        users:[
          {plate: 'DJ148WR', mail:'maurizio@loud.com'},
          {plate: 'DJ148WR', mail:'simone@loud.com'},
          {plate: 'DJ148WR', mail:'andrea@loud.com'},
          {plate: 'DJ148WR', mail:'gianluca@loud.com'},
          {plate: 'DJ148WR', mail:'piergiuseppe@loud.com'},
        ],
      },
      input: {
        plate:{
          value: '',
          focus: false,
          validate: false,
          error: 'Inserisci nome e cognome',
          focusInput: new Animated.Value(0),
        },
        mail:{
          value: '',
          focus:false,
          validate: false,
          error: 'Mail non valida',
          focusInput: new Animated.Value(0),
        }
      },
      focusInput:[]
    }
  }

  componentWillMount(){
    const inputs = Object.values(this.state.input)
    const focus = inputs.map((item, index) => {
      return item.focusInput})
    this.setState({
      focusInput: focus
    })
  }

  inputOnFocus = (name) => {
    this.setState({
      input:{
        ...this.state.input,
        [name]:{
          ...this.state.input[name],
          focus: true
        }
      }
    }, () => {
        Animated.timing(
          this.state.input[name].focusInput,{
            delay: 0,
            toValue: 1,
            duration: 600,
            easing: Easing.bezier(.65,0,.7,1)
          }
        ).start();
    })
  }

  handleState = (name, data) =>{
    let bool = false
    if(data.length > 0){
      bool = true
    }
    this.setState({
      input:{
        ...this.state.input,
        [name]: {
          ...this.state.input[name],
          value: data,
          validate: bool
        }
      }
    }, ()=> console.log(this.state))
  }

  validation = (name) =>{
    if(!this.state.input[name].validate){
      Animated.timing(
        this.state.input[name].focusInput,{
          delay: 0,
          toValue: 0,
          duration: 600,
          easing: Easing.bezier(.65,0,.7,1)
        }
      ).start();
    }
  }

  login = () =>{
    let plateUser = this.state.input.plate.value
    let mailUser = this.state.input.mail.value
    if(this.state.input.mail.validate && this.state.input.plate.validate){
      this.state.data.users.map((item, index) => {
        if(item.mail == mailUser && item.plate == plateUser){
          this.props.navigation.navigate('App')
        }else{
          Animated.parallel([
            Animated.timing(
              this.errorAnimation,{
                delay: 0,
                toValue: 1,
                duration: 600,
                easing: Easing.bezier(.65,0,.7,1)
              }
            ),
            Animated.timing(
              this.state.input.plate.focusInput,{
                delay: 0,
                toValue: -1,
                duration: 600,
                easing: Easing.bezier(.65,0,.7,1)
              }
            ),
            Animated.timing(
              this.state.input.mail.focusInput,{
                delay: 0,
                toValue: -1,
                duration: 600,
                easing: Easing.bezier(.65,0,.7,1)
              }
            )
          ]).start();
        }
      })
    } else {
      console.log('campi vuoti')
    }
  }

  render() {
    const opacity = {opacity: this.errorAnimation.interpolate({inputRange: [0,0.5,1], outputRange: [0, 0, 1], extrapolate: "clamp"})}
    const translateY = { transform:
      [{
        translateY: this.errorAnimation.interpolate({ inputRange: [0,1], outputRange: [3*Vh, -3*Vh], extrapolate: "clamp" })
      }]
    };
    const focus = this.state.focusInput.map((item, index) => {
      const color = item.interpolate({
        inputRange: [-1,0,1],
        outputRange: [COLOR.RED, 'rgba(18,18,18,0.2)', COLOR.GREEN],
        extrapolate: "clamp",
      });
      return { color };
    });
    const error = {

    }
    return (
      <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <KeyboardAwareScrollView
            style={styles.form}
            scrollEnabled={true}
            contentContainerStyle={{alignItems: 'flex-start', justifyContent: 'center'}}
          >
            <View style={styles.section}>
              <Text style={styles.label}>Targa Registrata</Text>
              <TextInput
                style={styles.inputText}
                editable={true}
                returnKeyType='next'
                blurOnSubmit={false}
                autoCapitalize='characters'
                value={''}
                onFocus={() => this.inputOnFocus('plate')}
                onChangeText={(plate) => {this.handleState('plate', plate )}}
                onEndEditing={(plate) => {this.validation('plate')}}
                onSubmitEditing={() => {this.secondTextInput.focus()}}
                />
                <Animated.View style={[styles.hr, this.state.input.plate.validate && styles.validateInputText, this.state.input.plate.focus && {backgroundColor: focus[0].color}]}/>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Mail Registrata</Text>
              <TextInput
                style={styles.inputText}
                editable={true}
                returnKeyType='done'
                blurOnSubmit={false}
                keyboardType='email-address'
                autoCapitalize='none'
                value={''}
                onFocus={() => this.inputOnFocus('mail')}
                onChangeText={(mail) => {this.handleState('mail', mail)}}
                onEndEditing={(mail) => {this.validation('mail')}}
                ref={(input) => { this.secondTextInput = input }}
                onSubmitEditing={Keyboard.dismiss}
                />
                <Animated.View style={[styles.hr, this.state.input.mail.validate && styles.validateInputText, this.state.input.mail.focus && {backgroundColor: focus[1].color}]}/>
            </View>
          </KeyboardAwareScrollView>
          <View style={styles.buttons}>
            <Animated.Text style={[styles.error, opacity, translateY]}>Credenziali errate! Riprova</Animated.Text>
            <CustomButton buttonStyle={styles.loginBtn} textStyle={styles.loginTextBtn} text="Accedi" onPress={() => this.login()}/>
            <CustomButton buttonStyle={styles.signupBtn} textStyle={styles.signupTextBtn} text="Non sei Registrato? Registrati" onPress={() => this.props.navigation.navigate('SignUp')}/>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingVertical: 5*Vh,
    paddingHorizontal: PADDING.HORIZONTAL_CONTAINER,
    backgroundColor: COLOR.WHITE,
    alignItems: 'flex-start',
    width: '100%'
  },
  title:{
    fontFamily: FONT.BEBAS,
    color: COLOR.GREEN,
    fontSize: FONT_SIZE.L,
    paddingBottom: 5*Vh
  },
  form:{
    width: '100%',
    flex: 1
  },
  section:{
    width: '100%',
    marginBottom: 5*Vh
  },
  label:{
    fontSize: FONT_SIZE.S,
    color: 'rgba(18,18,18,0.2)',
    fontFamily: FONT.AVENIR,
    marginBottom: 1*Vh,
  },
  validateLabel:{
    color: COLOR.GREY,
  },
  inputText:{
    fontSize: 18,
    color: COLOR.BLACK,
    fontFamily: FONT.AVENIR,
    width: '100%'
  },
  validateInputText:{
    backgroundColor: COLOR.GREEN,
  },
  buttons:{
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center'
  },
  loginBtn:{
    backgroundColor: COLOR.GREEN
  },
  loginTextBtn:{
    color: COLOR.WHITE
  },
  signupTextBtn:{
    color:'rgba(18,18,18,0.2)',
    textDecorationLine: 'underline',
    fontSize: FONT_SIZE.S,
  },
  feedbackGreenText:{
    position: 'absolute',
    bottom: 0,
    right: 0,
    fontSize: FONT_SIZE.DEFAULT,
    fontFamily: FONT.AVENIR,
    color: COLOR.GREEN
  },
  feedbackRedText:{
    position: 'absolute',
    bottom: 0,
    right: 0,
    fontSize: FONT_SIZE.S,
    fontFamily: FONT.AVENIR,
    color: COLOR.RED
  },
  hr:{
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(18,18,18,0.2)'
  },
  error:{
    fontSize: FONT_SIZE.S,
    fontFamily: FONT.AVENIR,
    color: COLOR.RED,
    alignSelf: 'center'
  }
})

export default LoginScreen
