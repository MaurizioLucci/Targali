import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Easing,
  ScrollView,
  FlatList
} from 'react-native'
import { PADDING, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../styles/utilities'
import { StackNavigator } from 'react-navigation';
import Modal from './Modal'

const HEADER_MAX_HEIGHT = 35 * Vh;
const HEADER_MIN_HEIGHT = 14 * Vh;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class ProfileScreen extends React.Component {
  constructor() {
    super();
    this.animation = new Animated.Value(0)
    this.state = {
      user: {
        plate: 'DJ148WR',
        name: 'Simone Matrone',
        mail: 'simone@loud.com'
      },
      chat: [
        {
          coordinate: {
            latitude: 45.437300,
            longitude: 9.195172,
          },
          type: "Rimozione",
          address: "Via Sereno Tagliabue 1, Cusano Milanino",
          status: 'Segnalazione Fatta',
          image: "https://i.imgur.com/sNam9iJ.jpg",
          plate: "DJ148WR",
          color: 'rgb(255, 46, 82)',
        },
        {
          coordinate: {
            latitude: 45.446302,
            longitude: 9.205072,
          },
          type: "Fari accesi",
          address: "Via Sereno Tagliabue 2, Cusano Milanino",
          status: 'Segnalazione Fatta',
          image: "https://i.imgur.com/N7rlQYt.jpg",
          plate: "GH148WR",
          color: 'rgb(255, 191, 0)',
        },
        {
          coordinate: {
            latitude: 45.446320,
            longitude: 9.213162,
          },
          type: "Like",
          address: "Via Sereno Tagliabue 3, Cusano Milanino",
          status: 'Segnalazione Fatta',
          image: "https://i.imgur.com/UDrH0wm.jpg",
          plate: "OK148WR",
          color: 'rgb(28, 211, 176)',
        },
        {
          coordinate: {
            latitude: 45.436320,
            longitude: 9.207082,
          },
          type: "Rimozione",
          address: "Via Sereno Tagliabue 4, Cusano Milanino",
          status: 'Segnalazione Fatta',
          image: "https://i.imgur.com/Ka8kNST.jpg",
          plate: "BE148WR",
          color: 'rgb(255, 46, 82)',
        }
      ]
    }
  }

  render() {
    const headerHeight = this.animation.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    const opacity = this.animation.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [1,0],
      extrapolate: 'clamp',
    });
    const scale = this.animation.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [1,0.85],
      extrapolate: 'clamp',
    });
    const styleHeader = {
      opacity: opacity,
      transform: [
        {scale: scale}
      ]
    }
    return(
      <View style={styles.container}>
        <Animated.View style={[styles.header, {height: headerHeight}]}>
          <View style={styles.profileContainer}>
            <View style={styles.profileTitleContainer}>
              <Text style={styles.profileTitle}>Profilo & Messaggi</Text>
              <TouchableOpacity
                style={styles.returnReportBtn}
                onPress={() => {
                  navigator.showModal({
                    screen: 'example.SecondScreen',
                    title: 'Second screen',
                  })
                }}>
                <Image
                  style={styles.settingsIcon}
                  source={require('../../assets/images/vocal.png')}
                />
              </TouchableOpacity>
            </View>
            <Animated.Text style={[styles.plateText, styleHeader]}>{this.state.user.plate}</Animated.Text>
            <Animated.View style={[styles.userContainer, styleHeader]}>
              <View style={styles.userSection}>
                <Text style={styles.labelUserSection}>Nome</Text>
                <Text style={styles.contentUserSection}>{this.state.user.name}</Text>
              </View>
              <View style={[styles.userSection, {marginLeft: 8*Vw}]}>
                <Text style={styles.labelUserSection}>Indirizzo E-Mail</Text>
                <Text style={styles.contentUserSection}>{this.state.user.mail}</Text>
              </View>
            </Animated.View>
          </View>
        </Animated.View>
        <ScrollView
          style={{flex:1, zIndex:-100}}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.animation}}}]
          )}>
          <View style={{marginTop:HEADER_MAX_HEIGHT}}>
          {this.state.chat.map((item, key) =>{
            return(
            <View key={key} style={styles.elementList}>
              <View style={styles.leftPartList}>
                <Text style={[styles.typeList, {color:item.color}]}>{item.type}</Text>
                <Text style={styles.statusList}>{item.status}</Text>
              </View>
              <View style={styles.rightPartList}>
                <TouchableOpacity
                  style={styles.returnReportBtn}>
                  <Image
                    style={styles.settingsIcon}
                    source={require('../../assets/images/vocal.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )})}
        </View>
        </ScrollView>
        <Modal
          plate={this.state.user.plate}
          name={this.state.user.name}
          mail={this.state.user.mail}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  },
  profileContainer:{
    paddingVertical: 4*Vh,
    paddingHorizontal: PADDING.HORIZONTAL_CONTAINER
  },
  profileTitleContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileTitle: {
    fontSize: FONT_SIZE.DEFAULT,
    color: COLOR.GREY_DARKER,
    fontFamily: FONT.AVENIR
  },
  settingsIcon: {
    marginLeft: 'auto',
    tintColor: COLOR.GREY_DARKER,
    transform: [
        {scaleX: 0.3},
        {scaleY: 0.3}
    ]
  },
  plateText:{
    fontSize: FONT_SIZE.XL,
    color: COLOR.BLACK,
    fontFamily: FONT.BEBAS,
  },
  userContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2*Vh
  },
  labelUserSection:{
    fontSize: FONT_SIZE.S,
    color: COLOR.GREY,
    fontFamily: FONT.AVENIR,
    marginBottom: 1*Vh,
    opacity:0.7
  },
  contentUserSection:{
    fontSize: FONT_SIZE.DEFAULT,
    color: COLOR.BLACK,
    fontFamily: FONT.AVENIR
  },
  elementList:{
    paddingHorizontal:PADDING.HORIZONTAL_CONTAINER,
    paddingVertical: 3*Vh,
    borderBottomColor: 'rgba(0,0,0,0.03)',
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  rightPartList:{
    marginLeft: 'auto'
  },
  typeList: {
    fontSize: FONT_SIZE.L,
    fontFamily: FONT.BEBAS,
    marginBottom: 1.5*Vh
  },
  statusList: {
    fontSize: FONT_SIZE.S,
    color: COLOR.BLACK,
    fontFamily: FONT.AVENIR
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: 'rgb(250,250,250)'
  },
});

export default ProfileScreen
