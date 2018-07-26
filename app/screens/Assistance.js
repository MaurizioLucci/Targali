import React, { Component } from 'react';
import Voice from 'react-native-voice';
import { PADDING, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../styles/utilities'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  AppRegistry,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Keyboard
} from 'react-native';
import CustomButton from '../components/CustomButton'


class VocalAssistanceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      pitch: '',
      error: '',
      end: '',
      started: '',
      results: [],
      partialResults: [],
      data: ''
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    Voice.onSpeechError = this.onSpeechError.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged.bind(this);
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  componentWillMount() {
    this.animation = new Animated.Value(0);
  }

  onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  }

  onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  }

  onSpeechEnd(e) {
    this.setState({
      end: '√',
    });
  }

  onSpeechError(e) {
    this.setState({
      error: JSON.stringify(e.error),
    });
  }

  onSpeechResults(e) {
    this.setState({
      results: e.value,
    });
  }

  onSpeechPartialResults(e) {
    this.setState({
      partialResults: e.value,
    });
  }

  onSpeechVolumeChanged(e) {
    this.setState({
      pitch: e.value,
    });
  }

  async _startRecognizing(e) {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: false
    });
    try {
      await Voice.start('it-IT');
    } catch (e) {
      console.error(e);
    }
  }

  async _stopRecognizing(e) {
    try {
      await Voice.stop();
      let val
      if(this.state.results.length > 0){
        this.setState({end: true})
        val = 1
      } else {
        this.setState({end: false})
        val = 0
      }
      Animated.timing(
        this.animation,{
          delay: 0,
          toValue: val,
          duration: 450,
          easing: Easing.bezier(.65,0,.7,1)
        }
      ).start();
    } catch (e) {
      console.error(e);
    }
  }

  async _cancelRecognizing(e) {
    try {
      await Voice.cancel();
      this.setState({end: false, results:[], data:''})
      Animated.timing(
        this.animation,{
          delay: 0,
          toValue: 0,
          duration: 450,
          easing: Easing.bezier(.65,0,.7,1)
        }
      ).start();
    } catch (e) {
      console.error(e);
    }
  }

  sendReport = () => {
    if(!this.state.data){
      let result = this.state.results.toString()
      this.setState({data: result})
    }
  }



  // async _destroyRecognizer(e) {
  //   try {
  //     await Voice.destroy();
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   this.setState({
  //     recognized: '',
  //     pitch: '',
  //     error: '',
  //     started: '',
  //     results: [],
  //     partialResults: [],
  //     end: ''
  //   });
  // }

  render() {
    const colorBackground = { backgroundColor: this.animation.interpolate({ inputRange: [0,1], outputRange: [COLOR.BLUE, COLOR.GREEN], extrapolate: "clamp" }) };
    const fadeIn = { opacity: this.animation.interpolate({ inputRange: [0,1], outputRange: [0, 1], extrapolate: "clamp" })};
    const fadeOut = { opacity: this.animation.interpolate({ inputRange: [0,1], outputRange: [1, 0], extrapolate: "clamp" })};
    const disapperHalfPart = { height: this.animation.interpolate({ inputRange: [0,1], outputRange: [28*Vh, 0], extrapolate: "clamp" })};
    const appearSendReportBtn =
    { transform:
      [{
        translateY: this.animation.interpolate({ inputRange: [0,1], outputRange: [20*Vh, 0], extrapolate: "clamp" })
      }]
    };
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.View style={[styles.container, colorBackground]}>
          <Text style={styles.title}>
            Assistente Vocale
          </Text>
          <TextInput
            style={styles.text}
            editable={this.state.results.length > 0 && true}
            multiline={true}
            returnKeyType='done'
            enableAutomaticScroll={true}
            blurOnSubmit={true}
            onSubmitEditing={Keyboard.dismiss}
            onChangeText={(data) => {
            this.setState({data})}}>
            {this.state.results.map(result => result)}
          </TextInput>
          {/*
          {this.state.partialResults.map((result, index) => {
            return (
              <Text
                key={`partial-result-${index}`}
                style={styles.stat}>
                {result}
              </Text>
            )
          })} */}
          <Animated.Text style={[styles.editText, fadeIn]}>Tocca la frase per modificare</Animated.Text>
          <Animated.View style={[styles.halfPart, disapperHalfPart, fadeOut]}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPressIn={this._startRecognizing.bind(this)}
              onPressOut={this._stopRecognizing.bind(this)}>
                <Text style={styles.buttonText}>
                  Tieni premuto
                </Text>
                <Image
                  style={styles.buttonIcon}
                  source={require('../../assets/images/vocal.png')}
                />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.sendReportContainer, appearSendReportBtn]}>
            <CustomButton buttonStyle={styles.sendReportBtn} textStyle={styles.sendReportBtnText} onPress={this.sendReport} text='Invia Segnalazione'/>
            <TouchableOpacity
              style={styles.returnReportBtn}
              onPress={this._cancelRecognizing.bind(this)}>
                <Text style={styles.returnReportBtnText}>
                  Registra di nuovo
                </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: PADDING.VERTICAL_CONTAINER,
    paddingHorizontal: PADDING.HORIZONTAL_CONTAINER,
    backgroundColor: COLOR.GREEN,
  },
  greenContainer:{
    backgroundColor: COLOR.GREEN,
  },
  blueContainer:{
    backgroundColor: COLOR.BLUE,
  },
  halfPart: {
    position: 'absolute',
    left: 0,
    bottom:0,
    width: 100*Vw,
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingVertical: PADDING.VERTICAL_CONTAINER,
    paddingHorizontal: PADDING.HORIZONTAL_CONTAINER,
    alignItems: 'baseline'
  },
  buttonContainer:{
    position: 'absolute',
    right: 7*Vw,
    bottom:1*Vh,
    alignItems: 'center',
    flexDirection:'row'
  },
  buttonIcon: {
    tintColor: COLOR.WHITE,
    transform: [
        {scaleX: 0.3},
        {scaleY: 0.3}
    ]
  },
  buttonText: {
    fontFamily: FONT.AVENIR,
    color: "rgba(255,255,255,0.4)",
    fontSize: FONT_SIZE.DEFAULT,
    display: 'flex'
  },
  title: {
    fontSize: FONT_SIZE.DEFAULT,
    fontFamily: FONT.AVENIR,
    color: COLOR.WHITE
  },
  text: {
    paddingTop: 8*Vh,
    fontSize: FONT_SIZE.XL,
    fontFamily: FONT.BEBAS,
    color: COLOR.WHITE
  },
  editText: {
    marginTop: 2*Vh,
    color: "rgba(0,0,0,0.2)",
    fontFamily: FONT.AVENIR,
    fontSize: FONT_SIZE.S
  },
  sendReportContainer:{
    position: 'absolute',
    bottom:3*Vh,
    alignSelf: 'center'
  },
  sendReportBtn: {
    backgroundColor: COLOR.WHITE,
  },
  sendReportBtnText:{
    color: COLOR.GREEN
  },
  returnReportBtn:{
    alignItems: 'center',
    paddingVertical: 3*Vh
  },
  returnReportBtnText:{
    color: "rgba(0,0,0,0.3)",
    fontSize: FONT_SIZE.S,
    fontFamily: FONT.AVENIR
  }
});

export default VocalAssistanceScreen
