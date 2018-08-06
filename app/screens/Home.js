
import React, {Component} from 'react';
import {
   Platform,
  StyleSheet,
  Dimensions,
  AppRegistry,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
  Easing
} from 'react-native';
import MapView from 'react-native-maps';
import { Marker} from 'react-native-maps';
import { SCREEN_HEIGHT, SCREEN_WIDTH, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../styles/utilities'
import CustomButton from '../components/CustomButton'

const HORIZONTAL_PADDING = 12;
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const CARD_HEIGHT = 31.2 * Vh;
const CARD_WIDTH_IN = SCREEN_WIDTH - (SCREEN_WIDTH/8);
const CARD_WIDTH_OUT = CARD_WIDTH_IN + 20;
const Images = [
  "https://i.imgur.com/sNam9iJ.jpg",
  "https://i.imgur.com/N7rlQYt.jpg",
  "https://i.imgur.com/UDrH0wm.jpg",
  "https://i.imgur.com/Ka8kNST.jpg"
];

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      markers:[
        {
          coordinate: {
            latitude: 45.437300,
            longitude: 9.195172,
          },
          type: "Rimozione",
          address: "Via Sereno Tagliabue 1, Cusano Milanino",
          status: 'Segnalazione Fatta',
          image: Images[0],
          plate: "DJ148WR",
          color: 'rgb(255, 46, 82)',
          card: 'close',
          animation: new Animated.Value(0),
        },
        {
          coordinate: {
            latitude: 45.446302,
            longitude: 9.205072,
          },
          type: "Fari accesi",
          address: "Via Sereno Tagliabue 2, Cusano Milanino",
          status: 'Segnalazione Fatta',
          image: Images[1],
          plate: "GH148WR",
          color: 'rgb(255, 191, 0)',
          card: 'close',
          animation: new Animated.Value(0),
        },
        {
          coordinate: {
            latitude: 45.446320,
            longitude: 9.213162,
          },
          type: "Like",
          address: "Via Sereno Tagliabue 3, Cusano Milanino",
          status: 'Segnalazione Fatta',
          image: Images[2],
          plate: "OK148WR",
          color: 'rgb(28, 211, 176)',
          card: 'close',
          animation: new Animated.Value(0),
        },
        {
          coordinate: {
            latitude: 45.436320,
            longitude: 9.207082,
          },
          type: "Rimozione",
          address: "Via Sereno Tagliabue 4, Cusano Milanino",
          status: 'Segnalazione Fatta',
          image: Images[3],
          plate: "BE148WR",
          color: 'rgb(255, 46, 82)',
          card: 'close',
          animation: new Animated.Value(0),
        },
      ],
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
      },
      isTouched: false,
      setRegion: false,
      overlay: {
        style:{
          zIndex: 0,
          opacity: 0,
        },
        index: 0,
        open: false
      },
    }
  }

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);

    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      this.setState({region: initialRegion, setRegion: true});
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
  }

  componentDidMount() {
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH_OUT + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  stateUpdate = (name, value) => {
    let newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  renderCards = (interpolationsCard) => {
    return(
      <Animated.ScrollView
      horizontal
      scrollEventThrottle={1}
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH_IN + 20}
      snapToAlignment='start'
      decelerationRate="fast"
      bouncesZoom={true}
      onMomentumScrollBegin={() => {this.resetIsTouched()}}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                x: this.animation,
              },
            },
          },
        ],
        { useNativeDriver: true }
      )}
      onScrollEndDrag={({nativeEvent}) => {this.lastItemScrolled(nativeEvent)}}
      ref={ref=>(this.scrollView=ref)}
      style={[styles.scrollView]}
      contentContainerStyle={styles.endPadding}
    >
      {this.state.markers.map((marker, index) => {
          let opened = marker.card === 'open'
          const card = {
            height: interpolationsCard[index].height,
            width: interpolationsCard[index].width,
            marginHorizontal: interpolationsCard[index].marginHorizontal,
            transform: [{
                translateY: interpolationsCard[index].translate
                }
              ]
            }
          const opacityZone = {
            width: '100%',
            transform: [{
              scale: interpolationsCard[index].scale
            }
            ],

          }
          const opacityButtons = {
            opacity: interpolationsCard[index].opacityButtons
          }
          const button = {
            // display: opened ? 'flex' : 'none',
            opacity: interpolationsCard[index].opacityButtons,
            transform: [{
                translateY: interpolationsCard[index].translateButtons
                }
              ]
          }
          const hiddenText = {
            height: interpolationsCard[index].display,
            opacity: interpolationsCard[index].opacity
          }

        return (
        <TouchableWithoutFeedback style={[styles.shadow, card]} key={index}
        onPress={() => this.animatedCard(index)}>
        <Animated.View style={[styles.card, card]}>
            <Animated.View style={opacityZone}>
              <View style={styles.reportingContainer}>
                <Text style={styles.reportingPlaceholder}>Hanno segnalato la tua targa per</Text>
                <Text style={[styles.reportingContent, {color: marker.color}]}>{marker.type}</Text>
              </View>
              <Animated.View style={[styles.addressContainer, hiddenText]}>
                <Text style={styles.cardPlaceholder}>Luogo</Text>
                <Text numberOfLines={1} style={styles.cardContent}>
                  {marker.address}
                </Text>
              </Animated.View>
              <Animated.View style={[styles.plateContainer, hiddenText]}>
                <View style={styles.plateTextContainer}>
                  <Text style={styles.cardPlaceholder}>Targa</Text>
                  <Text numberOfLines={1} style={styles.cardContent}>
                    {marker.plate}
                  </Text>
                </View>
                <Animated.View style={[styles.plateImageContainer, hiddenText]}>
                  <Image
                    source={{uri: marker.image}}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                </Animated.View>
              </Animated.View>
            </Animated.View>
            <Animated.View style={[styles.containerAnswer, opacityButtons]}>
              <Text style={styles.answerTitleBtn}>Risposta veloce</Text>
              <View style={styles.rowBtn}>
                <TouchableOpacity style={[styles.answerBtn, styles.answerBtnThird]}><Text style={styles.answerTextBtn}>👍</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.answerBtn, styles.answerBtnThird]}><Text style={styles.answerTextBtn}>😫</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.answerBtn, styles.answerBtnThird]}><Text style={styles.answerTextBtn}>❤</Text></TouchableOpacity>
              </View>
              <View style={styles.rowBtn}>
                <TouchableOpacity style={[styles.answerBtn, styles.answerBtnThird]}><Text style={styles.answerTextBtn}>😡</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.answerBtn, styles.answerBtnThird]}><Text style={styles.answerTextBtn}>🙏</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.answerBtn, styles.answerBtnThird]}><Text style={styles.answerTextBtn}>😱</Text></TouchableOpacity>
              </View>
              <View style={styles.rowBtn}>
                <TouchableOpacity style={[styles.answerBtn, styles.answerBtnSecond]}><Text style={styles.answerTextBtn}>Grazie</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.answerBtn, styles.answerBtnSecond]}><Text style={styles.answerTextBtn}>Eroe</Text></TouchableOpacity>
              </View>
            </Animated.View>
            <Animated.View style={[styles.containerBtn, button]}>
              <CustomButton buttonStyle={styles.chatBtn} textStyle={styles.chatTextBtn} text='Vai alla chat' onPress={()=> this.props.navigation.navigate('Chat')}/>
            </Animated.View>
          </Animated.View>
          </TouchableWithoutFeedback>
      )})}
      </Animated.ScrollView>
    )
  }

  renderButton = () => {
    return(
      <TouchableOpacity style={styles.addReportBtn} onPress={()=>this.props.navigation.navigate('AddReport')}>
        <Text style={styles.addReportBtnText}>Aggiungi una nuova Segnalazione</Text>
      </TouchableOpacity>
    )
  }

  renderMap = () => {}

  lastItemScrolled = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    const last = layoutMeasurement.width + contentOffset.x >=
    contentSize.width - paddingToBottom;
    if(last){
      this.scrollView.getNode().scrollTo({x: 0, y: 0, animated: true});
    }
    this.animatedCard(this.state.overlay.index, 'scroll')
  }

  scrollToCard = (index) => {
    this.stateUpdate('isTouched', true);
    const cardX = CARD_WIDTH_OUT * index;
    this.scrollView.getNode().scrollTo({x: cardX, y: 0, animated: false});
  }

  resetIsTouched = () => {
    this.stateUpdate('isTouched', false);
  }

  animatedCard = (index, scroll) => {
    let array = this.state.markers
    let val = 0;
    let bool
    let scale = array[index].animation.interpolate({
      inputRange: [0,1],
      outputRange: [0, 1],
      extrapolate: "clamp",
    })
    let height = array[index].animation.interpolate({
      inputRange: [0,0.1],
      outputRange: [0, 100*Vh],
      extrapolate: "clamp",
    })

    if(array[index].card == "close" && !scroll ){
      array[index].card = 'open'
      val = 1
      bool = true
    } else if((scroll === 'scroll' && index == this.state.overlay.index && array[index].card == 'open') || (!scroll && array[index].card == 'open'))  {
      array[index].card = 'close'
      val = 0
      bool = false
    }


    this.setState({
      markers: array,
      overlay:{
        style:{
          height: height,
          opacity: scale
        },
        index: index,
        open: bool
      }
    })
    Animated.timing(
      array[index].animation,{
        delay: 0,
        toValue: val,
        duration: 450,
        easing: Easing.bezier(.65,0,.7,1)
      }
    ).start();

  }

  render() {
    const interpolationsMarker = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH_OUT,
        index * CARD_WIDTH_OUT,
        ((index + 1) * CARD_WIDTH_OUT),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 1.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.5, 1, 0.5],
        extrapolate: "clamp",
      });
      return { inputRange, scale, opacity };
    });
    const interpolationsCard = this.state.markers.map((marker, index) => {
      const inputRange = [0, 1];
      const height = marker.animation.interpolate({
        inputRange,
        outputRange: [CARD_HEIGHT, 65*Vh],
        extrapolate: "clamp",
      });
      const translate = marker.animation.interpolate({
        inputRange,
        outputRange: [0, (5*Vh)],
        extrapolate: "clamp",
      });
      const opacity = marker.animation.interpolate({
        inputRange,
        outputRange: [1, 0],
        extrapolate: "clamp",
      });
      const width = marker.animation.interpolate({
        inputRange,
        outputRange: [CARD_WIDTH_IN, 100*Vw],
        extrapolate: "clamp",
      });
      const marginHorizontal = marker.animation.interpolate({
        inputRange,
        outputRange: [10, 0],
        extrapolate: "clamp",
      });
      const opacityButtons = marker.animation.interpolate({
        inputRange: [0,0.6,1],
        outputRange: [0,0,1],
        extrapolate: "clamp",
      });
      const translateButtons = marker.animation.interpolate({
        inputRange: [0,0.6,1],
        outputRange: [40,40,0],
        extrapolate: "clamp",
      });
      const scale = marker.animation.interpolate({
        inputRange: [0,1],
        outputRange: [1,1],
        extrapolate: "clamp",
      });
      const display = marker.animation.interpolate({
        inputRange: [0,1],
        outputRange: [6*Vh,0],
        extrapolate: "clamp",
      });
      return { height, translate, opacity, scale, opacityButtons, translateButtons, width, marginHorizontal, display };
    });

    return (
      <TouchableWithoutFeedback disabled={!this.state.overlay.open} onPress={() => this.animatedCard(this.state.overlay.index)}>
        <View style={styles.container}>
          <Animated.View style={[styles.overlay, this.state.overlay.style]}/>
          <MapView
            style={styles.map}
            initialRegion={this.state.setRegion ? this.state.region : null}
            showsUserLocation={true}
            ref={map => this.map = map}
          >
            {this.state.markers.map((marker, index) => {
              let scaleValue
              let opacityValue
              // if (this.state.isTouched) {
              //   opacityValue = 0.5;
              //   scaleValue = 1;
              // } else {
                scaleValue = interpolationsMarker[index].scale;
                opacityValue = interpolationsMarker[index].opacity;
              // }
              const scaleStyle = {
                transform: [
                  {
                    scale: scaleValue,
                  },
                ],
              };
              const opacityStyle = {
                opacity: opacityValue,
              };
              return(
                  <Marker key={index} coordinate={marker.coordinate}>
                    <TouchableOpacity style={{padding:10}} onPress={e => this.scrollToCard(index)}>
                    <Animated.View style={[styles.markerWrap, opacityStyle]}>
                      <Animated.View style={[styles.ring, scaleStyle]} />
                      <Animated.View style={[styles.marker, scaleStyle]} />
                    </Animated.View>
                    </TouchableOpacity>
                  </Marker>
              )
             })}
          </MapView>

          {this.state.markers.length > 0 ? this.renderCards(interpolationsCard) : this.renderButton()}

        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1
  },
  scrollView: {
    position: 'absolute',
    bottom: 4*Vh,
    left: 0,
    right: 0,
    paddingTop: 10,
    overflow: 'visible',
    zIndex: 2
  },
  endPadding: {
    paddingRight: SCREEN_WIDTH - CARD_WIDTH_IN,
    alignItems: 'flex-end'
  },
  card: {
    padding: 20,
    elevation: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    overflow: "hidden",
    alignItems: 'center'
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: '#000'
  },
  reportingContainer: {
    flexDirection: 'column'
  },
  reportingPlaceholder: {
    fontSize: FONT_SIZE.S,
    fontFamily: FONT.AVENIR
  },
  reportingContent: {
    marginTop: 1 * Vh,
    fontSize: FONT_SIZE.XL,
    fontFamily: FONT.BEBAS
  },
  addressContainer: {
    flexDirection: 'column',
  },
  cardPlaceholder: {
    fontSize: FONT_SIZE.S,
    color: COLOR.GREY,
    fontFamily: FONT.AVENIR
  },
  cardContent: {
    fontSize: FONT_SIZE.DEFAULT,
    color: COLOR.BLACK,
    marginTop: 5,
    fontFamily: FONT.AVENIR
  },
  plateContainer: {
    flexDirection: 'row',
    marginTop: 2 * Vh,
    justifyContent: 'center',
    height: 8*Vh
  },
  plateImageContainer: {
    overflow: 'hidden',
    marginLeft: 'auto',
  },
  cardImage: {
    width: 10 * Vw,
    height: 10 * Vw,
    borderRadius: 3
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
  containerAnswer: {
    marginTop: 2*Vh,
    width: "100%",
    alignItems: 'center',
  },
  rowBtn: {
    marginVertical: 2*Vw,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  answerBtn: {
    height: 14*Vw,
    backgroundColor: 'rgba(18,18,18,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 2*Vw,
  },
  answerBtnThird: {
    width: "30.5%"
  },
  answerBtnSecond: {
    width: "48%",
  },
  answerTextBtn: {
    fontSize: FONT_SIZE.M,
    fontFamily: FONT.BEBAS,
    color: COLOR.GREY_DARKER
  },
  answerTextBtn: {
    fontSize: FONT_SIZE.M,
    fontFamily: FONT.BEBAS,
    color: COLOR.GREY_DARKER
  },
  answerTitleBtn: {
    fontSize: FONT_SIZE.M,
    fontFamily: FONT.BEBAS,
    color:'#000',
    alignSelf: 'flex-start',
    marginBottom: 2*Vw
  },
  containerBtn: {
    width: CARD_WIDTH_IN,
    alignItems: 'center'
  },
  chatBtn: {
    backgroundColor: COLOR.BLUE,
    width: '103%',
    marginTop: 2*Vw,
    height: 7*Vh
  },
  chatTextBtn: {
    color: COLOR.WHITE
  },
  addReportBtn: {
    marginBottom: 3*Vh,
    backgroundColor: COLOR.BLUE,
    paddingVertical: 3*Vh,
    paddingHorizontal: 10*Vw,
    borderRadius: 100
  },
  addReportBtnText: {
    color: COLOR.WHITE,
    fontFamily: FONT.AVENIR,
    fontSize: FONT_SIZE.S
  }
});

export default HomeScreen
