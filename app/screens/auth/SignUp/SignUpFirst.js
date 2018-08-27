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
import RNPickerSelect from 'react-native-picker-select'
import CustomButton from '../../../components/CustomButton'
import CustomTextInput from '../../../components/TextInputPlaceholder'

class SignupScreen extends Component {
  constructor(){
    super()
    this.state = {
      data:{
        plate: '',
        brand: '',
        model: '',
      },
      input: {
        plate:{
          value: '',
          focus:false,
          validate: false,
          error: 'Targa non valida',
          animation: new Animated.Value(0),
          focusInput: new Animated.Value(0),
        }
      },
      brands:[
        {label:'Mercedes', value:'mercedes'},
        {label:'Audi', value:'audi'},
        {label:'BMW', value:'BMW'},
        {label:'Hyundai', value:'hyundai'},
        {label:'Toyota', value:'toyota'},
      ],
      models:{
        mercedes:[
          {label:'A160', value:'A160'},
          {label:'A180', value:'A180'},
          {label:'A200', value:'A200'},
          {label:'A220', value:'A220'},
          {label:'A250', value:'A250'},
        ],
        audi:[
          {label:'Q2', value:'Q2'},
          {label:'Q3', value:'Q3'},
          {label:'Q5', value:'Q5'},
          {label:'Q7', value:'Q7'},
          {label:'Q8', value:'Q8'},
        ],
        BMW:[
          {label:'X1', value:'X1'},
          {label:'X2', value:'X2'},
          {label:'X3', value:'X3'},
          {label:'X4', value:'X4'},
          {label:'X5', value:'X5'},
        ]
      },
      brand:'mercedes',
      model:'',
      feedback:[],
      focusInput:[],
    }
  }

  componentWillMount(){
    this.animation = new Animated.Value(0)
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
      var plateCheck = /(([A-Z]{2})+(\d{3})+([A-Z]{1,2}))\w/
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
    if(
      this.state.input.plate.validate && this.state.brand && this.state.model
    ){
      this.setState({
        data:{
          plate:this.state.input.plate.value,
          brand:this.state.brand,
          model:this.state.model
        }
      }, () => Animated.timing(
        this.animation, {
          delay: 0,
          toValue: 0,
          duration: 600,
          easing: Easing.bezier(.65,0,.7,1)
        }
      ).start())
      this.props.navigation.navigate('SignUpSecond')
    } else {
      Animated.timing(
        this.animation, {
          delay: 0,
          toValue: 1,
          duration: 600,
          easing: Easing.bezier(.65,0,.7,1)
        }
      ).start();
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
    const translateError = this.animation.interpolate({
      inputRange: [0,1],
      outputRange: [20, 0],
      extrapolate: "clamp",
    })
    const opacityError = this.animation.interpolate({
      inputRange: [0,1],
      outputRange: [0,1],
      extrapolate: "clamp",
    })

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
          <Text style={styles.title}>Registrazione</Text>
          <Text style={styles.subtitle}>Il primo step è la registrazione del tuo veicolo</Text>
            <View style={styles.section}>
              <TextInput
                style={styles.inputText}
                placeholder={'Inserisci il numero di Targa*'}
                editable={true}
                returnKeyType='done'
                blurOnSubmit={false}
                autoCapitalize='characters'
                value={''}
                onFocus={() => this.inputOnFocus('plate')}
                onChangeText={(plate) => {this.handleState('plate', plate)}}
                onEndEditing={(plate) => {this.validation('plate')}}
                onSubmitEditing={Keyboard.dismiss}
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
              <View style={[styles.halfSection, {marginRight:'10%'}]}>
                <Text style={styles.label}>Marca</Text>
                <RNPickerSelect
                    placeholder={{
                        label: 'Seleziona la marca',
                        value: null,
                    }}
                    items={this.state.brands}
                    onValueChange={(value) => {this.setState({brand: value})}}
                    onUpArrow={() => {this.inputRefs.picker.togglePicker()}}
                    onDownArrow={() => {this.inputRefs.company.focus()}}
                    style={{...pickerSelectStyles}}
                    value={this.state.brand}
                    hideIcon={true}
                />
              </View>
              <View style={styles.halfSection}>
                <Text style={styles.label}>Modello</Text>
                <RNPickerSelect
                    placeholder={{
                        label: 'Seleziona il modello',
                        value: null,
                    }}
                    items={this.state.models[this.state.brand] || this.state.models.mercedes}
                    onValueChange={(value) => {this.setState({model: value})}}
                    onUpArrow={() => {this.inputRefs.picker.togglePicker()}}
                    onDownArrow={() => {this.inputRefs.company.focus()}}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.model}
                    hideIcon={true}
                    // ref={(el) => {this.inputRefs.picker = el;}}
                />
              </View>
            </View>

          <View style={styles.buttons}>
            <Animated.Text style={[styles.errorCar, {transform:[{translateY: translateError}], opacity: opacityError}]}>Inserire correttamente tutti i campi</Animated.Text>
            <CustomButton buttonStyle={styles.signupBtn} textStyle={styles.signupTextBtn} text="Avanti" onPress={() => this.registration()}/>
            <CustomButton buttonStyle={styles.loginBtn} textStyle={styles.loginTextBtn} text="Sei già Registrato? Login" onPress={() => this.props.navigation.navigate('LogIn')}/>
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
  halfSectionContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  halfSection:{
    width: '45%',
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
    backgroundColor: 'rgba(18,18,18,0.1)'
  },
  errorCar:{
    fontSize: FONT_SIZE.S,
    fontFamily: FONT.AVENIR,
    color: COLOR.RED,
    alignSelf: 'center',
    marginBottom: 2*Vh
  }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: FONT_SIZE.DEFAULT,
        fontFamily: FONT.AVENIR,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        color: 'black',
    },
});

export default SignupScreen
