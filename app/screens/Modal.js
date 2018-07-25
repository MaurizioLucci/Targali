import React from 'react';
import { StyleSheet, Text, TextInput, Keyboard, View, TouchableOpacity } from 'react-native';
import { PADDING, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../styles/utilities'

const ModalScreen = ({
  plate,
  name,
  mail,
  textStyle
}) => (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.label}>Targa</Text>
          <TextInput
            style={styles.inputText}
            editable={true}
            returnKeyType='next'
            blurOnSubmit={false}
            onSubmitEditing={Keyboard.dismiss}
            >
            {plate}
          </TextInput>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.inputText}
            editable={true}
            returnKeyType='done'
            blurOnSubmit={true}
            onSubmitEditing={Keyboard.dismiss}
            >
            {name}
          </TextInput>
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
            >
            {mail}
          </TextInput>
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
            >
            +39
          </TextInput>
        </View>

        {/* <TouchableOpacity onPress={() => this.modalScreenButtonPressed()}>
          <View style={this.styles.button}>
            <Text style={{color: 'white'}}>{"Go back"}</Text>
          </View>
        </TouchableOpacity> */}

      </View>
    )

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      height: 100*Vh,
      width: 100*Vw,
      flex:1,
      backgroundColor: 'rgba(255,255,255,0.97)',
      paddingVertical: PADDING.VERTICAL_CONTAINER,
      paddingHorizontal: PADDING.HORIZONTAL_CONTAINER,
      alignItems: 'flex-start',
      justifyContent: 'center',
      textAlign: 'left'
    },
    section:{
      marginBottom: 5*Vh,
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
  })

export default ModalScreen
