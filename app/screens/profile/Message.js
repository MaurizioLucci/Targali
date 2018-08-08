import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Image,
    Time,
    TouchableWithoutFeedback,
    SafeAreaView
} from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH, PADDING, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../../styles/utilities'
import CustomButton from '../../components/CustomButton'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'
import { GiftedChat, Actions, Bubble, Message, Avatar, MessageImage, InputToolbar, TextInput} from '../../utilities/react-native-gifted-chat'
import moment from 'moment/min/moment-with-locales';

const locale = window.navigator.userLanguage || window.navigator.language
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.01;

class MessageScreen extends Component {
  constructor() {
    super()
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
          text1: 'Un cittadino ti ha segnalato per ',
          text2: ' e ha mandato questa foto',
          type: this.props.navigation.getParam('item', 'None').type,
          createdAt: new Date(),
          image: this.props.navigation.getParam('item', 'None').image,
          report: true,
          user: {
            _id: 2,
            name: 'Maurizio Lucci',
          }
        }
      ]
    })
  }
  renderMessageImage(props){
    return(
      <Image source={{uri: props.currentMessage.image}} style={{width:50*Vw, height: 50*Vw, borderRadius: 4, margin: 3*Vw, alignSelf: 'center'}}/>
    )
  }

  renderBubble(props, color) {
    let margin
    if(!props.currentMessage.nextMessage.user || props.currentMessage.user._id !== props.currentMessage.nextMessage.user._id){
      margin = 20
    } else{
      margin = 0
    }
    if(props.currentMessage.report){
      let time = moment(props.currentMessage.createdAt).locale('it').format('LLLL')
      time = time.charAt(0).toUpperCase() + time.slice(1);
        return (
        <View style={{flexDirection: 'column'}}>
          <View style={{width: 75*Vw, backgroundColor: 'rgba(200,200,200,0.1)', flexDirection: 'row', alignItems: 'center', borderRadius: 4, padding: 0.5*Vw}}>
            <Image source={{uri: props.currentMessage.image}} style={{width:15*Vw, height: 15*Vw, borderRadius: 4, margin: 3*Vw, alignSelf: 'center'}}/>
            <Text style={{fontFamily: FONT.AVENIR, fontSize: 15, width: 50*Vw}}>{props.currentMessage.text1}
              <Text style={{fontFamily: FONT.AVENIR, fontSize: 15, color: color}}>{props.currentMessage.type}</Text>
            {props.currentMessage.text2}</Text>
          </View>
          <Text style={{fontFamily: FONT.AVENIR, fontSize: FONT_SIZE.S, color: 'rgba(200,200,200,0.7)', marginTop: 10 }}>
            {time}
          </Text>
        </View>
      );
    } else {
      return (
        <Bubble
          {...props}
          wrapperStyle={{right: { flexDirection: 'row', borderRadius: 4, marginBottom: margin, backgroundColor: 'rgba(200,200,200,0.1)'}, left: { flexDirection: 'row', marginBottom: margin, borderRadius: 4, backgroundColor: 'rgba(200,200,200,0.1)'}}}
          textStyle={{ right: { color: COLOR.BLACK, fontFamily: FONT.AVENIR, fontSize: 15 }, left: { color: COLOR.BLACK, fontFamily: FONT.AVENIR, fontSize: 15 } }}
        />
      );
    }
  }

  renderTime(props){
    let time = moment(props.currentMessage.createdAt).locale('it').format('LLLL')
    time = time.charAt(0).toUpperCase() + time.slice(1);
    if(!props.currentMessage.nextMessage.user || props.currentMessage.user._id !== props.currentMessage.nextMessage.user._id){
      return(
        <View style={{position:'absolute', top: 10, [props.position]: 0, height:30}}>
          <Text style={{fontFamily: FONT.AVENIR, fontSize: FONT_SIZE.S, color: 'rgba(200,200,200,0.7)', }}>
            {time}
          </Text>
        </View>
      )
    }
  }

  renderInputToolbar(props){
     return (
          <View style={{height:10*Vh, backgroundColor:'rgba(200,200,200,0.2)', alignContent:'center', justifyContent: 'flex-end'}}>
            <InputToolbar {...props} containerStyle={{ marginTop: 'auto', marginBottom:'auto', marginHorizontal: 3*Vw, borderRadius:100, borderTopWidth:0, backgroundColor: COLOR.WHITE }}/>
          </View>
    )
  }

  renderMessage(props){
    return(
      <Message {...props} style={{flexDirection: 'column', backgroundColor: COLOR.RED}}>
        SEEEE
      </Message>
    )
  }

  renderAvatar(props, color){
    return(
      <View style={{backgroundColor: color, height: 9*Vw, width: 9*Vw, borderRadius: 10*Vw, alignItems: 'center', justifyContent:'center'}}>
        <Image source={require('../../../assets/images/user.png')} style={{height: 11*Vw, width: 11*Vw, tintColor: COLOR.WHITE}}/>
      </View>
    )
  }

  renderInputText(props){
    console.log();
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
            textInputProps={{fontSize: 15, fontFamily: FONT.AVENIR}}
            messages={this.state.messages}
            locale='it'
            onSend={messages => this.onSend(messages)}
            renderMessage={this.renderMessage}
            renderBubble={(props)=>this.renderBubble(props, this.state.item.color)}
            renderTime={this.renderTime}
            renderMessageImage={this.renderMessageImage}
            renderAvatar={(props)=>this.renderAvatar(props, this.state.item.color)}
            renderAvatarOnTop={true}
            renderInputToolbar={this.renderInputToolbar}
            textInputProps={this.renderInputText}
            // bottomOffset={-4*Vh}
            minInputToolbarHeight={10*Vh}
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
    height: 20*Vh
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
