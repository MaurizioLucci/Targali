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
        name:{
          value: '',
          focus:false,
          validate: false,
          error: 'Inserisci nome e cognome',
          animation: new Animated.Value(0),
          focusInput: new Animated.Value(0),
        },
        mail:{
          value: '',
          focus:false,
          validate: false,
          error: 'Mail non valida',
          animation: new Animated.Value(0),
          focusInput: new Animated.Value(0),
        },
        phone:{
          value: '',
          focus:false,
          validate: false,
          error: 'Numero non valido',
          animation: new Animated.Value(0),
          focusInput: new Animated.Value(0),
        },
        plate:{
          value: '',
          focus:false,
          validate: false,
          error: 'Targa non valida',
          animation: new Animated.Value(0),
          focusInput: new Animated.Value(0),
        },
        model:{
          value: '',
          focus:false,
          validate: false,
          error: 'Inserisci il modello',
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
    if(
      this.state.input.name.validate &&
      this.state.input.mail.validate &&
      this.state.input.phone.validate &&
      this.state.input.plate.validate &&
      this.state.input.model.validate
    ){
      this.props.navigation.navigate('App')
    }
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
      <View style={styles.container}>
          <Text style={styles.title}>Registrazione</Text>
          <KeyboardAwareScrollView
            style={styles.form}
            scrollEnabled={true}
            contentContainerStyle={{alignItems: 'flex-start', justifyContent: 'center'}}
          >
            <View style={styles.section}>
              <Text style={styles.label}>Nome e cognome</Text>
              <TextInput
                style={styles.inputText}
                editable={true}
                returnKeyType='next'
                blurOnSubmit={false}
                value={''}
                onFocus={() => this.inputOnFocus('name')}
                onChangeText={(name) => {this.handleState('name', name )}}
                onEndEditing={(name) => {this.validation('name')}}
                onSubmitEditing={() => {this.secondTextInput.focus()}}
                />
                <Animated.View style={[styles.hr, this.state.input.name.validate && styles.validateInputText, this.state.input.name.focus && {backgroundColor: focus[0].color}]}/>
                {
                  this.state.input.name.validate ?
                    <Animated.Text style={[styles.feedbackGreenText, {opacity:interpolations[0].opacity, transform:[{translateY: interpolations[0].translateY}]}]}>✓</Animated.Text>
                  :
                    <Animated.Text style={[styles.feedbackRedText, {opacity:interpolations[0].opacity, transform:[{translateY: interpolations[0].translateY}]}]}>{this.state.input.name.error}</Animated.Text>
                }
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Indirizzo E-Mail</Text>
              <TextInput
                style={styles.inputText}
                editable={true}
                returnKeyType='next'
                blurOnSubmit={false}
                keyboardType='email-address'
                autoCapitalize = 'none'
                value={''}
                onFocus={() => this.inputOnFocus('mail')}
                onChangeText={(mail) => {this.handleState('mail', mail)}}
                onEndEditing={(mail) => {this.validation('mail')}}
                ref={(input) => { this.secondTextInput = input }}
                onSubmitEditing={() => { this.thirdTextInput.focus() }}
                />
                <Animated.View style={[styles.hr, this.state.input.mail.validate && styles.validateInputText, this.state.input.mail.focus && {backgroundColor: focus[1].color}]}/>
                {
                  this.state.input.mail.validate ?
                    <Animated.Text style={[styles.feedbackGreenText, {opacity:interpolations[1].opacity, transform:[{translateY: interpolations[1].translateY}]}]}>✓</Animated.Text>
                  :
                    <Animated.Text style={[styles.feedbackRedText, {opacity:interpolations[1].opacity, transform:[{translateY: interpolations[1].translateY}]}]}>{this.state.input.mail.error}</Animated.Text>
                }
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Numero Cell.</Text>
              <TextInput
                style={styles.inputText}
                editable={true}
                returnKeyType='done'
                blurOnSubmit={false}
                keyboardType='numeric'
                value={''}
                onFocus={() => this.inputOnFocus('phone')}
                onChangeText={(phone) => {this.handleState('phone', phone)}}
                ref={(input) => { this.thirdTextInput = input }}
                onEndEditing={(phone) => {this.validation('phone')}}
                onSubmitEditing={() => { this.fourthTextInput.focus() }}
                />
                <Animated.View style={[styles.hr, this.state.input.phone.validate && styles.validateInputText, this.state.input.phone.focus && {backgroundColor: focus[2].color}]}/>
                {
                  this.state.input.phone.validate ?
                    <Animated.Text style={[styles.feedbackGreenText, {opacity:interpolations[2].opacity, transform:[{translateY: interpolations[2].translateY}]}]}>✓</Animated.Text>
                  :
                    <Animated.Text style={[styles.feedbackRedText, {opacity:interpolations[2].opacity, transform:[{translateY: interpolations[2].translateY}]}]}>{this.state.input.phone.error}</Animated.Text>
                }
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Targa</Text>
              <TextInput
                style={styles.inputText}
                editable={true}
                returnKeyType='next'
                blurOnSubmit={false}
                autoCapitalize='characters'
                value={''}
                onFocus={() => this.inputOnFocus('plate')}
                onChangeText={(plate) => {this.handleState('plate', plate)}}
                ref={(input) => { this.fourthTextInput = input }}
                onEndEditing={(plate) => {this.validation('plate')}}
                onSubmitEditing={() => { this.fifthTextInput.focus() }}
                />
                <Animated.View style={[styles.hr, this.state.input.plate.validate && styles.validateInputText, this.state.input.plate.focus && {backgroundColor: focus[3].color}]}/>
                {
                  this.state.input.plate.validate ?
                    <Animated.Text style={[styles.feedbackGreenText, {opacity:interpolations[3].opacity, transform:[{translateY: interpolations[3].translateY}]}]}>✓</Animated.Text>
                  :
                    <Animated.Text style={[styles.feedbackRedText, {opacity:interpolations[3].opacity, transform:[{translateY: interpolations[3].translateY}]}]}>{this.state.input.plate.error}</Animated.Text>
                }
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Modello</Text>
              <TextInput
                style={styles.inputText}
                editable={true}
                returnKeyType='done'
                blurOnSubmit={false}
                onSubmitEditing={Keyboard.dismiss}
                value={''}
                onFocus={() => this.inputOnFocus('model')}
                onEndEditing={(model) => {this.validation('model')}}
                onChangeText={(model) => {this.handleState('model', model)}}
                ref={(input) => { this.fifthTextInput = input }}
                />
                <Animated.View style={[styles.hr, this.state.input.model.validate && styles.validateInputText, this.state.input.model.focus && {backgroundColor: focus[4].color}]}/>
                {
                  this.state.input.model.validate ?
                    <Animated.Text style={[styles.feedbackGreenText, {opacity:interpolations[4].opacity, transform:[{translateY: interpolations[4].translateY}]}]}>✓</Animated.Text>
                  :
                    <Animated.Text style={[styles.feedbackRedText, {opacity:interpolations[4].opacity, transform:[{translateY: interpolations[4].translateY}]}]}>{this.state.input.model.error}</Animated.Text>
                }
            </View>
          </KeyboardAwareScrollView>
          <View style={styles.buttons}>
            <CustomButton buttonStyle={styles.signupBtn} textStyle={styles.signupTextBtn} text="Registrati" onPress={() => this.registration()}/>
            <CustomButton buttonStyle={styles.loginBtn} textStyle={styles.loginTextBtn} text="Sei già Registrato? Login" onPress={() => this.props.navigation.navigate('LogIn')}/>
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
    color: COLOR.RED,
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
  signupBtn:{
    backgroundColor: COLOR.RED
  },
  signupTextBtn:{
    color: COLOR.WHITE
  },
  loginTextBtn:{
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
  }
})

export default SignupScreen
