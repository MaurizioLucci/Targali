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
import { PADDING, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../../styles/utilities'
import { StackNavigator } from 'react-navigation';
import Modal from './Modal'

const HEADER_MAX_HEIGHT = 30 * Vh;
const HEADER_MIN_HEIGHT = 14 * Vh;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class ProfileScreen extends Component {
  constructor() {
    super();
    this.animation = new Animated.Value(0)
    this.modal = new Animated.Value(0)
    this.changeVehicle =
    this.state = {
      user: {
        vehicles: [
          {
            plate: 'AB147WR',
            model: 'Fiat Punto',
            animation: new Animated.Value(0)
          },
          {
            plate: 'DJ148WR',
            model: 'Fiat Pandino',
            animation: new Animated.Value(0)
          },
          {
            plate: 'EF149WR',
            model: 'Ghini Diablo',
            animation: new Animated.Value(0)
          },
          {
            plate: 'GH150WR',
            model: 'Audi TT',
            animation: new Animated.Value(0)
          },
        ],
        name: 'Simone Matrone',
        mail: 'simone@loud.com',
        phoneNumber: '+39 3391159385',
        selectedVehicle: {
          plate: 'DJ148WR',
          model: 'Fiat Pandino',
          animation: new Animated.Value(0)
        }
      }
    }
  }

  openModal = (val) => {
    Animated.timing(
      this.modal,{
        delay: 0,
        toValue: val,
        duration: 600,
        easing: Easing.bezier(.65,0,.7,1)
      }
    ).start();
  }

  editUser = (data) => {
    console.log(data)
    this.setState({user:data})
  }

  changeActiveVehicle = (item, index) =>{
    ;
    this.setState({
      user:{
        ...this.state.user,
        selectedVehicle:{
          plate: item.plate,
          model: item.model,
          animation: Animated.timing(
                      item.animation,{
                        delay: 0,
                        toValue: 1,
                        duration: 450,
                        easing: Easing.bezier(.65,0,.7,1)
                      }
                    ).start()
        }
      }
    })
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
    const translateModal = this.modal.interpolate({
      inputRange: [0, 1],
      outputRange: [100*Vh,0],
      extrapolate: 'clamp',
      })
    const styleHeader = {
      opacity: opacity,
      transform: [
        {scale: scale}
      ]
    }
    const modal = {
      transform: [{
          translateY: translateModal
        }]
    }
    const interpolationsVehicles = this.state.user.vehicles.map((item, index) => {
      const opacity = item.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: "clamp",
      });
      const translateY = item.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10],
        extrapolate: "clamp",
      });
      return { translateY, opacity };
    })
    return(
      <View style={styles.container}>
        <Animated.View style={[styles.header, {height: headerHeight}]}>
          <View style={styles.profileContainer}>
            <View style={styles.profileTitleContainer}>
              <Text style={styles.profileTitle}>Profilo</Text>
              <TouchableOpacity
                style={styles.profileEditBtn}
                onPress={()=>this.openModal(1)}>
                <Image
                  style={styles.settingsIcon}
                  source={require('../../../assets/images/settings.png')}
                />
              </TouchableOpacity>
            </View>
            <Animated.Text style={[styles.plateText, styleHeader]}>{this.state.user.selectedVehicle.plate}</Animated.Text>
            <Animated.View style={[styles.userContainer, styleHeader]}>
              <View style={styles.userSection}>
                <Text style={styles.labelUserSection}>Marca e Modello</Text>
                <Text style={styles.contentUserSection}>{this.state.user.selectedVehicle.model}</Text>
              </View>
              <View style={styles.userSection}>
                <Text style={styles.contentUserSection}>33 segnalazioni</Text>
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
          {this.state.user.vehicles.map((item, index) =>{
            if(item.plate !== this.state.user.selectedVehicle.plate){
              return(
                <TouchableOpacity
                  style={styles.returnReportBtn}
                  key={index}
                  onPress={() => this.changeActiveVehicle(item, index)}>
                <View style={styles.elementList}>
                  <Animated.View style={[styles.leftPartList, {opacity: interpolationsVehicles[index].opacity}]}>
                    <Text style={styles.plateList}>{item.plate}</Text>
                    <Text style={styles.modelList}>{item.model}</Text>
                  </Animated.View>
                  <View style={styles.rightPartList}>

                      <Image
                        style={styles.switchIcon}
                        source={require('../../../assets/images/switch.png')}
                      />

                  </View>
                </View>
                </TouchableOpacity>
              )
            }
            })}
        </View>
        </ScrollView>
        <Modal
          style={modal}
          user={this.state.user}
          closeModal={()=>this.openModal(0)}
          editUser={this.editUser}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: COLOR.WHITE
  },
  profileContainer:{
    flex: 1,
    paddingTop: 5*Vh,
    paddingBottom: 2*Vh,
    paddingHorizontal: PADDING.HORIZONTAL_CONTAINER,
    justifyContent: 'space-between'
  },
  profileTitleContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileTitle: {
    fontSize: FONT_SIZE.DEFAULT,
    color: 'rgba(250,250,250, 0.4)',
    fontFamily: FONT.AVENIR
  },
  profileEditBtn:{
    marginLeft: 'auto',
  },
  settingsIcon: {
    tintColor: 'rgba(250,250,250, 0.4)',
    height: 6*Vh,
    width: 6*Vh,
    transform:[
      {translateX: 3*Vw}
    ]
  },
  switchIcon: {
    marginLeft: 'auto',
    tintColor: 'rgba(200,200,200,0.6)',
    height: 5*Vh,
    width: 5*Vh
  },
  plateText:{
    fontSize: FONT_SIZE.XL,
    color: COLOR.WHITE,
    fontFamily: FONT.BEBAS,
    marginTop: 'auto'
  },
  userContainer:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 'auto',
    justifyContent: 'space-between'
  },
  labelUserSection:{
    fontSize: FONT_SIZE.S,
    color: 'rgba(250,250,250, 0.4)',
    fontFamily: FONT.AVENIR,
    marginBottom: 1*Vh,
  },
  contentUserSection:{
    fontSize: FONT_SIZE.DEFAULT,
    color: COLOR.WHITE,
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
  plateList: {
    fontSize: FONT_SIZE.L,
    fontFamily: FONT.BEBAS,
    color: COLOR.BLACK,
    marginBottom: 1.5*Vh
  },
  modelList: {
    fontSize: FONT_SIZE.S,
    color: COLOR.GREY,
    fontFamily: FONT.AVENIR
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: COLOR.BLUE
  },
});

export default ProfileScreen
