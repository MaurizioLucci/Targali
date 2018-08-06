import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Image
} from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH, PADDING, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../../styles/utilities'
import CustomButton from '../../components/CustomButton'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'
import { GiftedChat, Actions, Bubble, SystemMessage } from 'react-native-gifted-chat'

const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.01;

class MessageScreen extends Component {
  constructor() {
    super();
    this.state = {
      item: {},
      messages:[]
    }
  }

  componentWillMount(){
    this.setState({
      item: this.props.navigation.getParam('item', 'None'),
      messages:[
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          }
        }
      ]
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', 'Nodai')
    return (
        <View style={styles.container}>
          <View style={styles.mapContainer}>
            <TouchableOpacity style={styles.nextStepContainer} onPress={() => this.props.navigation.goBack()}>
              <Image
                style={styles.nextStep}
                source={require('../../../assets/images/arrow.png')}
              />
            </TouchableOpacity>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: this.state.item.coordinate.latitude,
                longitude: this.state.item.coordinate.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
              }}
              zoomEnabled={false}
              rotateEnabled={false}
              scrollEnabled={false}
              ref={map => this.map = map}
            >
              <Marker coordinate={this.state.item.coordinate}>
                <Animated.View style={styles.markerWrap}>
                  <Animated.View style={styles.ring} />
                  <Animated.View style={styles.marker} />
                </Animated.View>
              </Marker>
            </MapView>
          </View>
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>
              Segnalazione in {this.state.item.address}
            </Text>
          </View>
           <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: COLOR.WHITE
  },
  mapContainer:{
    height: 25*Vh
  },
  nextStepContainer:{
    position: 'absolute',
    top: PADDING.VERTICAL_CONTAINER/2,
    left: PADDING.HORIZONTAL_CONTAINER/2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  nextStep:{
    tintColor: COLOR.BLACK,
    width: 15*Vw,
    height: 15*Vw,
  },
  map:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.7
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLOR.RED,
  },
  ring: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLOR.RED,
    opacity: 0.3,
    position: "absolute",
  },
  addressContainer:{
    paddingVertical: 3*Vh,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(200,200,200,0.1)'
  },
  addressText:{
    fontSize: FONT_SIZE.DEFAULT,
    color: COLOR.BLACK,
    fontFamily: FONT.AVENIR
  },
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
})

export default MessageScreen
