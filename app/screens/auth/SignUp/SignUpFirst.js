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
    Picker
} from 'react-native';
import { PADDING, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../../../styles/utilities'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomButton from '../../../components/CustomButton'
import CustomTextInput from '../../../components/TextInputPlaceholder'

class SignupScreen extends Component {
  constructor(){
    super()
    this.state = {
      data:{
        car: {
          plate: '',
          model:''
        }
      },
      input: {
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
      focusInput:[],
      cars:[
        {brand:'Mercedes', model:'A160'},
        {brand:'Mercedes', model:'A180'},
        {brand:'Mercedes', model:'A200'},
        {brand:'Mercedes', model:'A220'},
        {brand:'Mercedes', model:'A250'},
        {brand:'Audi', model:'Q2'},
        {brand:'Audi', model:'Q3'},
        {brand:'Audi', model:'Q5'},
        {brand:'Audi', model:'Q7'},
        {brand:'Audi', model:'Q8'},
        {brand:'BMW', model:'X1'},
        {brand:'BMW', model:'X2'},
        {brand:'BMW', model:'X3'},
        {brand:'BMW', model:'X4'},
        {brand:'BMW', model:'X5'},
      ],
      brands:['Mercedes', 'Audi', 'BMW', 'Hyundai', 'Toyota'],
      brand:'',
      model:''
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
    if(name == 'plate'){
      console.log('primo if')
      var plateCheck = /(([A-Z]{2})+(\d{3})+([A-Z]{1,2}))\w/
      console.log(plateCheck.test(this.state.input.plate.value))
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
      this.props.navigation.navigate('SignUpSecond')
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
      <View style={styles.container}>
          <Text style={styles.title}>Registrazione</Text>
          <Text style={styles.subtitle}>Il primo step è la registrazione del tuo veicolo</Text>
            <View style={styles.section}>
              <Text style={styles.label}>Targa</Text>
              <TextInput
                style={styles.inputText}
                placeholder={'Inserisci il numero di Targa*'}
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
                <Animated.View style={[styles.hr, this.state.input.plate.validate && styles.validateInputText, this.state.input.plate.focus && {backgroundColor: focus[0].color}]}/>
                {
                  this.state.input.plate.validate ?
                    <Animated.Text style={[styles.feedbackGreenText, {opacity:interpolations[0].opacity, transform:[{translateY: interpolations[0].translateY}]}]}>✓</Animated.Text>
                  :
                    <Animated.Text style={[styles.feedbackRedText, {opacity:interpolations[0].opacity, transform:[{translateY: interpolations[0].translateY}]}]}>{this.state.input.plate.error}</Animated.Text>
                }
            </View>
            <View style={styles.halfSectionContainer}>
              <View style={styles.halfSection}>
                <Text style={styles.label}>Modello</Text>
                <Picker
                  selectedValue={this.state.brand}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) => this.setState({brand: itemValue})}>
                  {this.state.brands.map((item, index) => {
                    return(
                      <Picker.Item key={index} label={item} value={item} />
                    )
                  })}
                </Picker>
              </View>
              <View style={styles.halfSection}>
                <Text style={styles.label}>Modello</Text>
                <Picker
                  selectedValue={this.state.model}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) => this.setState({model: itemValue})}>
                  {this.state.cars.map((item, index) => {
                    if (this.state.brand == item.brand) {
                      return(
                        <Picker.Item key={index} label={item.model} value={item.model} />
                      )
                    }
                  })}
                </Picker>
              </View>
            </View>

          <View style={styles.buttons}>
            <CustomButton buttonStyle={styles.signupBtn} textStyle={styles.signupTextBtn} text="Avanti" onPress={() => this.registration()}/>
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
    fontSize: FONT_SIZE.L
  },
  subtitle:{
    fontSize: FONT_SIZE.DEFAULT,
    color: 'rgba(0,0,0,0.3)',
    fontFamily: FONT.AVENIR,
    marginTop: 1*Vh,
    marginBottom: 5*Vh
  },
  form:{
    width: '100%',
    flex: 1
  },
  section:{
    width: '100%',
    marginBottom: 5*Vh
  },
  halfSectionContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  halfSection:{
    width: '40%',
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
    fontSize: FONT_SIZE.M,
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
