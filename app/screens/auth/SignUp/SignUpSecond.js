import React, { Component, Fragment } from "react";
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
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'
import { CheckBox } from 'react-native-elements'
import { PADDING, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../../../styles/utilities'
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
          password: '',
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
        password:{
          value: '',
          focus:false,
          validate: false,
          error: 'Minimo 6 caratteri',
          animation: new Animated.Value(0),
          focusInput: new Animated.Value(0),
        }
      },
      dataCheck: false,
      policyCheck: false,
      passwordHidden: true,
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
    if(name=='password' || name=='model'){
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
    } else if(name == 'password'){
      if(this.state.input.password.value.length >= 6){
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
      ).start()
    })
  }

  registration = () =>{
    // if(
    //   this.state.input.name.validate &&
    //   this.state.input.mail.validate &&
    //   this.state.input.phone.validate &&
    //   this.state.input.password.validate &&
    //   this.state.input.model.validate
    // ){
      this.props.navigation.navigate('SignUpThird')
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
            <Text style={styles.title}>Registrazione</Text>
            <Text style={styles.subtitle}>Lo step finale è la tua registrazione</Text>
        <View style={styles.section}>
          <TextInput
            style={styles.inputText}
            placeholder='Username*'
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
          <TextInput
            style={styles.inputText}
            placeholder='E-Mail*'
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
          <TextInput
            style={styles.inputText}
            placeholder='Password*'
            editable={true}
            returnKeyType='done'
            blurOnSubmit={false}
            textContentType='password'
            secureTextEntry={this.state.passwordHidden}
            value={''}
            onFocus={() => this.inputOnFocus('password')}
            onChangeText={(password) => {this.handleState('password', password)}}
            ref={(input) => { this.thirdTextInput = input }}
            onEndEditing={(password) => {this.validation('password')}}
            onSubmitEditing={Keyboard.dismiss}
            />
            <Animated.View style={[styles.hr, this.state.input.password.validate && styles.validateInputText, this.state.input.password.focus && {backgroundColor: focus[2].color}]}/>
            {
              this.state.input.password.validate ?
                <Animated.Text style={[styles.feedbackGreenText, {opacity:interpolations[2].opacity, transform:[{translateY: interpolations[2].translateY}]}]}>✓</Animated.Text>
              :
                <Animated.Text style={[styles.feedbackRedText, {opacity:interpolations[2].opacity, transform:[{translateY: interpolations[2].translateY}]}]}>{this.state.input.password.error}</Animated.Text>
            }
          <TouchableOpacity style={styles.eyeContainer} onPress={() => {this.setState({passwordHidden: !this.state.passwordHidden})}}>
            <Image style={styles.eyeElement} resizeMode="contain" source={require('../../../../assets/images/eye.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <View style={styles.checkbox}>
            <View style={styles.checkboxSection}>
              <CheckBox
                checkedIcon='check-square'
                uncheckedIcon='square'
                checkedColor={COLOR.RED}
                size={18}
                checked={this.state.dataCheck}
                containerStyle={styles.checkboxElement}
                onPress={() => {this.setState({dataCheck: !this.state.dataCheck})}}
              />
              <Text style={styles.checkboxText}>Accetto al trattamento dei miei dati personali</Text>
            </View>
            <View style={styles.checkboxSection}>
              <CheckBox
                checkedIcon='check-square'
                uncheckedIcon='square'
                checkedColor={COLOR.RED}
                size={18}
                checked={this.state.policyCheck}
                containerStyle={styles.checkboxElement}
                onPress={() => {this.setState({policyCheck: !this.state.policyCheck})}}
              />
              <Text style={styles.checkboxText}>Privacy policy</Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <CustomButton buttonStyle={styles.signupBtn} textStyle={styles.signupTextBtn} text="Completa registrazione" onPress={() => this.registration()}/>
            <CustomButton buttonStyle={styles.loginBtn} textStyle={styles.loginTextBtn} text="Torna indietro" onPress={() => this.props.navigation.goBack()}/>
          </View>
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
    fontSize: FONT_SIZE.L
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
  footer:{
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
    fontSize: FONT_SIZE.S,
    fontFamily: FONT.AVENIR,
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
    backgroundColor: 'rgba(18,18,18,0.1)'
  },
  checkbox:{
    marginBottom: 2*Vh,
  },
  checkboxSection:{
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:-10
  },
  checkboxElement:{
    padding:0,
    paddingRight:0,
    width:18,
    borderWidth: 0,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  checkboxText:{
    color:COLOR.GREY,
    fontSize: FONT_SIZE.S,
    fontFamily: FONT.AVENIR,
  },
  eyeContainer:{
    position: 'absolute',
    right: 0,
    bottom: -1
  },
  eyeElement:{
    width: 6*Vw
  }
})

export default SignupScreen
