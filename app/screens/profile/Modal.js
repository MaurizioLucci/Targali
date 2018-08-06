import React, {Component} from 'react';
import { StyleSheet, Animated, Text, TextInput, Keyboard, View, TouchableOpacity, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { PADDING, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../../styles/utilities'
import CustomButton from '../../components/CustomButton'

class ModalScreen extends Component {
  constructor(){
    super()
    this.state = {}
  }

  componentWillMount (){
    this.setState({user: this.props.user})
  }

  handleState(name, data){
    this.setState({
      user:{
        ...this.state.user,
        [name]: data
      }
    })
  }

  saveFunc = () =>{
    this.props.editUser(this.state.user);
    this.props.closeModal();
  }

  render() {
    return (
      <Animated.View style={[styles.container,this.props.style]}>
        <View style={styles.closeBtn}>
          <TouchableOpacity onPress={this.props.closeModal}>
            <Image
              style={styles.closeIcon}
              source={require('../../../assets/images/close.png')}
            />
          </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView
          // resetScrollToCoords={{ x: 0, y: 0 }}
          style={styles.scrollView}
          scrollEnabled={true}
          contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
        >
            <View style={styles.section}>
              <Text style={styles.label}>Targa</Text>
              <TextInput
                style={styles.inputText}
                editable={true}
                returnKeyType='done'
                blurOnSubmit={false}
                onSubmitEditing={Keyboard.dismiss}
                value={this.state.user.plate}
                onChangeText={(plate) => {this.handleState('plate', plate)}}
                />
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.inputText}
                editable={true}
                returnKeyType='done'
                blurOnSubmit={true}
                onSubmitEditing={Keyboard.dismiss}
                value={this.state.user.name}
                onChangeText={(name) => {this.handleState('name', name)}}
                />
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Indirizzo E-Mail</Text>
              <TextInput
                style={styles.inputText}
                editable={true}
                returnKeyType='done'
                blurOnSubmit={true}
                onSubmitEditing={Keyboard.dismiss}
                keyboardType='email-address'
                value={this.state.user.mail}
                onChangeText={(mail) => {this.handleState('mail', mail)}}
                />
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Modello</Text>
              <TextInput
                style={styles.inputText}
                editable={true}
                returnKeyType='done'
                blurOnSubmit={true}
                onSubmitEditing={Keyboard.dismiss}
                value={this.state.user.model}
                onChangeText={(model) => {this.handleState('model', model)}}
                />
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Numero Cell</Text>
              <TextInput
                style={styles.inputText}
                editable={true}
                returnKeyType='done'
                blurOnSubmit={true}
                onSubmitEditing={Keyboard.dismiss}
                keyboardType='phone-pad'
                value={this.state.user.phoneNumber}
                onChangeText={(phoneNumber) => {this.handleState('phoneNumber', phoneNumber)}}
                />
            </View>
            <CustomButton buttonStyle={styles.saveBtn} textStyle={styles.saveBtnText} onPress={this.saveFunc} text='Salva Modifiche'/>
          </KeyboardAwareScrollView>
        </Animated.View>
  )}}

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      height: 100*Vh,
      width: 100*Vw,
      flex:1,
      backgroundColor: 'rgba(255,255,255,0.98)',
      paddingVertical: PADDING.VERTICAL_CONTAINER,
      paddingHorizontal: PADDING.HORIZONTAL_CONTAINER,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    scrollView:{
      flex:1,
      width: '100%',
      position:'absolute',
      left: PADDING.HORIZONTAL_CONTAINER
    },
    section:{
      marginBottom: 4.5*Vh,
      width: '100%'
    },
    label:{
      fontSize: FONT_SIZE.S,
      color: COLOR.GREY,
      fontFamily: FONT.AVENIR,
      marginBottom: 1.5*Vh,
    },
    inputText:{
      fontSize: FONT_SIZE.M,
      color: COLOR.BLACK,
      fontFamily: FONT.AVENIR,
      borderBottomColor: 'rgba(220,220,220,1)',
      borderBottomWidth: 1,
      width: '100%'
    },
    saveBtn: {
      backgroundColor: COLOR.RED,
      width: '100%',
      height: 8*Vh,
      marginTop: 2*Vh
    },
    saveBtnText:{
      color: COLOR.WHITE
    },
    closeBtn:{
      position: 'absolute',
      right: 3*Vw,
      top: 5*Vh
    },
    closeIcon: {
      height: 6*Vh,
      width: 6*Vh,
    }
  })

export default ModalScreen
