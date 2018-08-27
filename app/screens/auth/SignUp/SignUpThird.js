import React, { Component } from "react";
import {
    Text,
    View,
    Button,
    StyleSheet,
    TextInput,
    Keyboard,
    Animated,
    Easing,
    AsyncStorage,
    TouchableWithoutFeedback
} from 'react-native';
import { PADDING, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../../../styles/utilities'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomButton from '../../../components/CustomButton'

class SignupScreen extends Component {
  constructor(){
    super()
    this.state = {
      data:{
        user:{
          name:'',
          mail:'',
          phone:'',
        },
        car: {
          plate: '',
          model:''
        }
      },
      input: {
        phone:{
          value: '',
          focus:false,
          validate: false,
          error: 'Inserisci un numero valido',
          animation: new Animated.Value(0),
          focusInput: new Animated.Value(0),
        }
      },
      feedback:[],
      focusInput:[]
    }
  }

  componentWillMount(){
    const inputs = Object.values(this.state.input)
    const animations = inputs.map((item, index) => {
      return item.animation})
    const focus = inputs.map((item, index) => {
      return item.focusInput})
    this.setState({
      feedback: animations,
      focusInput: focus
    })
  }

  handleState = (name, data) =>{
    let parameter = 'user'
    if(name=='plate' || name=='model'){
      parameter = 'car'
    }
    this.setState({
      input:{
        ...this.state.input,
        [name]: {
          ...this.state.input[name],
          value: data
        }
      }
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

  validation = (name) =>{
    let bool = false
    let val = 1
    if( name == 'mail'){
      let mailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(mailCheck.test(this.state.input.mail.value)){
        bool = true
      }
    } else if(name == 'phone'){
      var phoneCheck = /^\d{10}$/;
      if(phoneCheck.test(this.state.input.phone.value)){
        bool = true
      }
    } else if(name == 'plate'){
      var plateCheck = /(([A-Z]{2})+(\d{3})+([A-Z]{1,2}))\w/;
      if(plateCheck.test(this.state.input.plate.value)){
        bool = true
      }
    }
     else if (this.state.input[name].value.length>0){
      bool = true
    }

    this.setState({
      input:{
        ...this.state.input,
        [name]:{
          ...this.state.input[name],
          focus: false,
          validate: bool
        }
      }
    }, () => {
      Animated.timing(
        this.state.input[name].animation,{
          delay: 0,
          toValue: 1,
          duration: 600,
          easing: Easing.bezier(.65,0,.7,1)
        }
      ).start();
      Animated.timing(
        this.state.input[name].focusInput,{
          delay: 0,
          toValue: 0,
          duration: 600,
          easing: Easing.bezier(.65,0,.7,1)
        }
      ).start();
      console.log(this.state)
    })
  }

  registration = () =>{
    // if(
    //   this.state.input.name.validate &&
    //   this.state.input.mail.validate &&
    //   this.state.input.phone.validate &&
    //   this.state.input.plate.validate &&
    //   this.state.input.model.validate
    // ){
      this.props.navigation.navigate('App')
    // }
  }

  render() {
    const interpolations = this.state.feedback.map((item, index) => {
      const inputRange = [0,0.5, 1];
      const translateY = item.interpolate({
        inputRange,
        outputRange: [30, 10, -3],
        extrapolate: "clamp",
      });
      const opacity = item.interpolate({
        inputRange,
        outputRange: [0,0, 1],
        extrapolate: "clamp",
      });
      return { translateY, opacity };
    });
    const focus = this.state.focusInput.map((item, index) => {
      const color = item.interpolate({
        inputRange: [0,1],
        outputRange: ['rgba(18,18,18,0.2)', COLOR.GREEN],
        extrapolate: "clamp",
      });
      return { color };
    });

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
          <Text style={styles.title}>verifica il tuo account</Text>
          <Text style={styles.subtitle}>Inserisci il tuo numero di cellulare per rendere il tuo account verificato</Text>
            <View style={styles.section}>
              <TextInput
                style={styles.inputText}
                placeholder='Numero cellulare*'
                editable={true}
                returnKeyType='done'
                keyboardType='numeric'
                blurOnSubmit={false}
                value={''}
                onFocus={() => this.inputOnFocus('phone')}
                onChangeText={(phone) => {this.handleState('phone', phone )}}
                onEndEditing={(phone) => {this.validation('phone')}}
                onSubmitEditing={Keyboard.dismiss}
                />
                <Animated.View style={[styles.hr, this.state.input.phone.validate && styles.validateInputText, this.state.input.phone.focus && {backgroundColor: focus[0].color}]}/>
                {
                  this.state.input.phone.validate ?
                    <Animated.Text style={[styles.feedbackGreenText, {opacity:interpolations[0].opacity, transform:[{translateY: interpolations[0].translateY}]}]}>✓</Animated.Text>
                  :
                    <Animated.Text style={[styles.feedbackRedText, {opacity:interpolations[0].opacity, transform:[{translateY: interpolations[0].translateY}]}]}>{this.state.input.phone.error}</Animated.Text>
                }
            </View>
          <View style={styles.buttons}>
            <CustomButton buttonStyle={styles.signupBtn} textStyle={styles.signupTextBtn} text="Invia Codice" onPress={() => this.registration()}/>
            <CustomButton buttonStyle={styles.loginBtn} textStyle={styles.loginTextBtn} text="Torna indietro" onPress={() => this.props.navigation.goBack()}/>
          </View>
      </View>
      </TouchableWithoutFeedback>
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
  },
  subtitle:{
    fontSize: FONT_SIZE.DEFAULT,
    color: 'rgba(0,0,0,0.3)',
    fontFamily: FONT.AVENIR,
    marginTop: 1*Vh,
    marginBottom: 7*Vh
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
    width: '100%',
    paddingBottom: 5
  },
  validateInputText:{
    backgroundColor: COLOR.GREEN,
  },
  buttons:{
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center'
  },
  signupBtn:{
    backgroundColor: COLOR.GREEN
  },
  signupTextBtn:{
    color: COLOR.WHITE
  },
  loginTextBtn:{
    color:'rgba(18,18,18,0.2)',
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
    bottom: 5,
    right: 0,
    fontSize: FONT_SIZE.S,
    fontFamily: FONT.AVENIR,
    color: COLOR.RED
  },
  hr:{
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(18,18,18,0.1)'
  }
})

export default SignupScreen
