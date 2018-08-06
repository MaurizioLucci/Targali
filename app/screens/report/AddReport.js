import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Easing,
  ActivityIndicator
} from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH, PADDING, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../../styles/utilities'
import PhotoUpload from '../../utilities/PhotoUpload'
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import CustomButton from '../../components/CustomButton'
import ConfirmScreen from './ConfirmReport'

const SECTION_WIDTH = 60*Vw;
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.003;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class AddReportScreen extends Component {
  constructor() {
    super();
    this.state = {
      sections:[
        {
          backgroundColor: new Animated.Value(0),
        },
        {
          image: ''
        },
        {},
        {}
      ],
      plates:[
        'DJ148WR'
      ],
      inputs:{
        plate:{
          value: '',
          validate: undefined
        },
        image:{
          setImage: false,
          uri: '',
          validate: false,
          value: '',
          loader: false,
          title: 'Aggiungi Fotografia'
        },
        reason:{
          buttons: [
            {label: 'Parcheggio Scorretto'},
            {label: 'Rimozione'},
            {label: 'Boh parte 1'},
            {label: 'Like'},
            {label: 'Fari Accesi'},
            {label: 'Boh parte 2'},
            {label: 'Blocca il passaggio'},
            {label: 'Atti Vandalici'},
            {label: 'Boh parte 3'},
            {label: 'Furto'},
            {label: 'Malfunzionamento'},
            {label: 'Boh parte 4'}
          ],
          selected: undefined,
          validate: false
        }
      },
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
      },
      setRegion: false,
      address: '',
      data:{
        coordinate:{
          longitude: '',
          latitude: ''
        },
        plate: '',
        image: '',
        reason: ''
      }
    }
  }

  componentWillMount() {
    this.index = 0
    this.animation = new Animated.Value(0)
    this.modal = new Animated.Value(0)
    Geocoder.fallbackToGoogle('AIzaSyB_RAiJ9-OtaGUqKYiFsKdRetVgfc6ofvk');

    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);
      Geocoder.geocodePosition({lat:lat, lng:long}).then(res => {
        this.setState({address: res[0].formattedAddress})
      })
      .catch(err => console.log(err))
      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
      this.setState({
        region: initialRegion,
        setRegion: true,
        data:{
          ...this.state.data,
          coordinate:{
            latitude: lat,
            longitude: long
          }
        }});
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
  }

  componentDidMount(){
    // this.openPlateInput()
  }

  handleState(name, data){
    this.setState({
      inputs:{
        ...this.state.inputs,
        [name]: {
          ...this.state.inputs[name],
          value: data
        }
      }
    })
  }

  checkPlate = () =>{
    let val = 0
    let plateInsert = this.state.inputs.plate.value
    let plateInsertLength = plateInsert.length - 1
    let bool = false
    plateInsert = plateInsert.toUpperCase()
    if (plateInsert[plateInsertLength] === " " || plateInsert[0] === " "){
      plateInsert = plateInsert.replace(/ +/g, "")
    }
    this.state.plates.map((item, index) => {
      if(item === plateInsert){
        bool = true
        val = 1
      }
    })
    this.setState({
      inputs:{
        ...this.state.inputs,
        plate: {
          ...this.state.inputs.plate,
          validate: bool,
          value: plateInsert
        }
      }
    })
    Animated.timing(
      this.state.sections[0].backgroundColor,{
        delay: 0,
        toValue: val,
        duration: 600,
        easing: Easing.bezier(.65,0,.7,1),
      }
    ).start();
  }

  openPlateInput = () =>{
    this.plateInput.focus()
  }

  nextSection = (scroll, section) => {
    if(section === 'plate'){
      this.setState({
        inputs:{
          ...this.state.inputs,
          image: {
            ...this.state.inputs.image,
            setImage: true
          }
        },
        data:{
          ...this.state.data,
          plate: this.state.inputs.plate.value
        }
      })
    } else {
      this.setState({
        data:{
          ...this.state.data,
          [section]: this.state.inputs[section].value ? this.state.inputs[section].value : this.state.inputs[section].buttons[this.state.inputs[section].selected].label
        }
      })
    }
    this.scrollOnTap(scroll)
  }

  scrollOnTap = (scroll) =>{
    this.scrollView.getNode().scrollTo({ x: scroll, y: 0, animated: true });
  }

  saveImage = (image) =>{
    this.setState({
      inputs:{
        ...this.state.inputs,
        image: {
          ...this.state.inputs.image,
          validate: true,
          value: image.uri,
          title: 'Fotografia Aggiunta'
        }
      }
    }, () => console.log(image))
  }

  textPlate = () => {
    if(this.state.inputs.plate.validate == undefined){
      return "Inserisci numero di targa"
    } else if(!this.state.inputs.plate.validate){
      return "Targa non trovata"
    } else if(this.state.inputs.plate.validate){
      return "Targa corretta"
    }
  }

  setLoader = (loader, validate) => {
    this.setState({
      inputs:{
        ...this.state.inputs,
        image: {
          ...this.state.inputs.image,
          loader: loader,
          validate: validate
        }
      }
    })
  }

  inputFile = (interpolationsScreen) => {
    if(this.state.inputs.image.setImage){
      return (
        <PhotoUpload
           onResponse={image =>{ this.saveImage(image) }}
           onPhotoSelect={() => this.setLoader(false, true)}
           onStart={() => this.setLoader(true, false)}
           onCancel={() => this.setLoader(false, false)}
           quality={80}
           height={500}
           width={500}
           enabled={false}
           containerStyle={{
             alignItems: 'center',
             justifyContent: 'center'
           }}
         >
           <Animated.Image
             style={{
               width: 100*Vw,
               height:  100*Vh,
               alignSelf: 'center',
               position: 'absolute',
               top: -45*Vh,
               opacity: interpolationsScreen[1].opacityImage,
               transform:[
                 {translateY: interpolationsScreen[1].height}
               ]
             }}
             resizeMode='cover'
             source={{
               uri: undefined
             }}
           />
           <Image
             style={[styles.photoIcon,{alignSelf: 'center'}]}
             source={require('../../../assets/images/photo.png')}
           />
          <Text style={styles.title}>{this.state.inputs.image.title}</Text>
        </PhotoUpload>
      )} else {
        return (
          <React.Fragment>
            <Image
              style={{
                width: 0*Vw,
                height: 0*Vh,
                alignSelf: 'center',
                position: 'absolute',
                top: 0*Vh,
                opacity: 0.5
              }}
              resizeMode='cover'
              source={{
                uri: undefined
              }}
            />
            <Image
              style={[styles.photoIcon,{alignSelf: 'center'}]}
              source={require('../../../assets/images/photo.png')}
            />
           <Text style={styles.title}>{this.state.inputs.image.title}</Text>
         </React.Fragment>
        )
      }
  }

  selectReason = (index) => {
    this.setState({
      inputs:{
        ...this.state.inputs,
        reason: {
          ...this.state.inputs.reason,
          validate: true,
          selected: index
        }
      }
    })
  }

  sendReport = (val) => {
    this.handleModal(val)
    console.log(this.state.data);
  }

  handleModal = (val) => {
    setTimeout(this.resetAll, 500)
    Animated.timing(
      this.modal,{
        delay: 0,
        toValue: val,
        duration: 500,
        easing: Easing.bezier(.65,0,.7,1)
      }
    ).start();
  }

  resetAll = () =>{
    this.plateInput.setNativeProps({text: ' '})
    this.setState({
        sections:[
          {
            backgroundColor: new Animated.Value(0),
          },
          {
            image: ''
          },
          {},
          {}
        ],
        inputs:{
          plate:{
            value: '',
            validate: undefined
          },
          image:{
            setImage: false,
            uri: '',
            validate: false,
            value: '',
            loader: false,
            title: 'Aggiungi Fotografia'
          },
          reason:{
            buttons: [
              {label: 'Parcheggio Scorretto'},
              {label: 'Rimozione'},
              {label: 'Boh parte 1'},
              {label: 'Like'},
              {label: 'Fari Accesi'},
              {label: 'Boh parte 2'},
              {label: 'Blocca il passaggio'},
              {label: 'Atti Vandalici'},
              {label: 'Boh parte 3'},
              {label: 'Furto'},
              {label: 'Malfunzionamento'},
              {label: 'Boh parte 4'}
            ],
            selected: undefined,
            validate: false
          }
        },
        region: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
        },
        setRegion: false,
        address: '',
        data:{
          coordinate:{
            longitude: '',
            latitude: ''
          },
          plate: '',
          image: '',
          reason: ''
        }
    })
    this.scrollView.getNode().scrollTo({ x: 0, y: 0, animated: true });
  }

  closeScreen = () =>{
    this.props.navigation.navigate('Home')
  }
    render() {
      const interpolationsScreen = this.state.sections.map((marker, index) => {
        const inputRange = [
          (index - 1) * SECTION_WIDTH,
          index * SECTION_WIDTH,
          ((index + 1) * SECTION_WIDTH),
        ];
        const opacity = this.animation.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });
        const opacityBackground = this.animation.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: "clamp",
        })
        const height = this.animation.interpolate({
          inputRange,
          outputRange: [100*Vh, 0, 100*Vh],
          extrapolate: "clamp",
        })
        const opacityImage = this.animation.interpolate({
          inputRange,
          outputRange: [0, 0.3, 0],
          extrapolate: "clamp",
        })
        return { opacity, opacityBackground, opacityImage, height };
      })
      const interpolationsPlate = this.state.sections[0].backgroundColor.interpolate({
        inputRange: [0,1],
        outputRange: [1, 0],
        extrapolate: "clamp",
      })
      const interpolationsModal = this.modal.interpolate({
        inputRange: [0,1],
        outputRange: [100*Vh, 0],
        extrapolate: "clamp",
      })

        return (
          <React.Fragment>
            <Animated.View style={[styles.background, {opacity: interpolationsPlate, backgroundColor: COLOR.RED, zIndex:2}]}/>
            <Animated.View style={[styles.background, {opacity: interpolationsScreen[0].opacityBackground, backgroundColor: COLOR.GREEN}]}/>
            <Animated.View style={[styles.background, {opacity: interpolationsScreen[1].opacityBackground, backgroundColor: "#000"}]}/>
            <Animated.View style={[styles.background, {opacity: interpolationsScreen[2].opacityBackground, backgroundColor: "#000"}]}/>
            <Animated.View style={[styles.background, {opacity: interpolationsScreen[3].opacityBackground, backgroundColor: "#fff"}]}/>
            <View style={[styles.background, { backgroundColor: "#000", zIndex:-10}]}/>
            <Animated.View style={[styles.container]}>
              <Animated.View style={[styles.header]}>
                <Text style={styles.title}>
                  Aggiungi Segnalazione
                </Text>
                <TouchableOpacity style={styles.closeContainer} onPress={this.closeScreen}>
                  <Image
                    style={styles.closeIcon}
                    source={require('../../../assets/images/close.png')}
                  />
                </TouchableOpacity>
              </Animated.View>
              <Animated.ScrollView
              horizontal
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              snapToInterval={SECTION_WIDTH}
              snapToAlignment='start'
              decelerationRate="fast"
              bouncesZoom={true}
              scrollEnabled={false}
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
              ref={( ref )=>{ this.scrollView = ref }}
              style={[styles.scrollView]}
              contentContainerStyle={styles.scrollViewChildren}
            >
              <Animated.View style={[styles.screen, {opacity: interpolationsScreen[0].opacity}]}>
                <TouchableWithoutFeedback style={[styles.screen]} onPress={!this.state.inputs.image.setImage && this.openPlateInput} style={{zIndex:1}}>
                  <View style={{width:100*Vw, height: '100%', position:'absolute', alignItems: 'center', justifyContent: 'center'}}>
                  <TextInput
                    selectionColor={COLOR.WHITE}
                    ref={(input) => { this.plateInput = input }}
                    returnKeyType='done'
                    style={styles.plateInput}
                    onEndEditing={()=>this.checkPlate()}
                    onChangeText={(plate) => {this.handleState('plate', plate)}}/>
                  <View>
                    <Text style={styles.title}>
                      {this.textPlate()}
                    </Text>
                  </View>
                  { this.state.inputs.plate.validate &&
                  <TouchableOpacity style={[styles.nextStepContainer, {bottom: 14*Vh, zIndex:200}]} onPress={() => this.nextSection(SECTION_WIDTH, 'plate')}>
                    <Image
                      style={styles.nextStep}
                      source={require('../../../assets/images/arrow.png')}
                    />
                  </TouchableOpacity> }
                  </View>
                </TouchableWithoutFeedback>
              </Animated.View>
              <Animated.View style={[styles.screen, {opacity: interpolationsScreen[1].opacity}]}>
                {this.inputFile(interpolationsScreen)}
                { this.state.inputs.image.loader && <ActivityIndicator size="large" color={COLOR.BLUE} style={{position:'absolute',bottom: 13.5*Vh}} />}
                { this.state.inputs.image.validate &&
                  <React.Fragment>
                    <TouchableOpacity style={[styles.nextStepContainer, {bottom: 13*Vh}]} onPress={() => this.nextSection(SECTION_WIDTH*2, 'image')}>
                      <Image
                        style={styles.nextStep}
                        source={require('../../../assets/images/arrow.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.nextStepContainer, {bottom: 3*Vh}]} onPress={() => this.scrollOnTap(0)}>
                      <Text style={styles.backBtn}>Torna Indietro</Text>
                    </TouchableOpacity>
                  </React.Fragment>
              }
              </Animated.View>
              <Animated.View style={[styles.screen, {opacity: interpolationsScreen[2].opacity}]}>
                  <Animated.ScrollView
                    horizontal
                    bouncesZoom={true}
                    showsHorizontalScrollIndicator={false}
                    style={[styles.reasonsScrollView, {transform:[{translateY: interpolationsScreen[2].height}], opacity: interpolationsScreen[2].opacityBackground}]}
                    contentContainerStyle={{marginLeft:5*Vw}}>
                    <View style={styles.reasonsRow}>
                      {this.state.inputs.reason.buttons.map((item, index) => {
                        return(
                          <TouchableOpacity style={[styles.reasonsBtn, this.state.inputs.reason.selected == index && {backgroundColor: '#fff'}]} key={index} onPress={()=>this.selectReason(index)}>
                            <Text style={[styles.reasonsText, this.state.inputs.reason.selected == index && {color: 'rgba(40,40,40,1)'}]}>{item.label}</Text>
                          </TouchableOpacity>
                        )
                      })}
                    </View>
                  </Animated.ScrollView>
                <Text style={[styles.title,{position:'absolute',top:5.5*Vh}]}>
                  {this.state.inputs.reason.selected !== undefined ? 'Motivazione: '+ this.state.inputs.reason.buttons[this.state.inputs.reason.selected].label : 'Motiva la segnalazione'}
                </Text>
                {this.state.inputs.reason.validate &&
                  <React.Fragment>
                    <TouchableOpacity style={[styles.nextStepContainer, {bottom: -33.8*Vh}]} onPress={() => this.nextSection(SECTION_WIDTH*3, 'reason')}>
                      <Image
                        style={styles.nextStep}
                        source={require('../../../assets/images/arrow.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.nextStepContainer, {bottom: -42*Vh}]} onPress={() => this.scrollOnTap(SECTION_WIDTH)}>
                      <Text style={styles.backBtn}>Torna Indietro</Text>
                    </TouchableOpacity>
                </React.Fragment>
                }
              </Animated.View>
              <Animated.View style={[styles.screen, {transform:[{translateY: interpolationsScreen[3].height}], opacity: interpolationsScreen[3].opacity}]}>
                <View style={styles.recapContainer}>
                  <Text style={styles.recapTitle}>Riepilogo Segnalazione</Text>
                  <View style={styles.mapContainer}>
                    <MapView
                      style={styles.map}
                      initialRegion={this.state.setRegion ? this.state.region : null}
                      showsUserLocation={true}
                      zoomEnabled={false}
                      rotateEnabled={false}
                      scrollEnabled={false}
                      ref={map => this.map = map}
                    />
                  </View>
                  <View style={styles.recapSectionContainer}>
                    <Text style={styles.recapPlaceholder}>Luogo</Text>
                    <Text numberOfLines={1} style={styles.recapContent}>
                      {this.state.address}
                    </Text>
                  </View>
                  <View style={styles.recapSectionContainer}>
                    <Text style={styles.recapPlaceholder}>Targa</Text>
                    <Text numberOfLines={1} style={styles.recapContent}>
                      {this.state.inputs.plate.value}
                    </Text>
                  </View>
                  <View style={[styles.recapSectionContainer, styles.recapReasonContainer]}>
                    <View>
                      <Text style={styles.recapPlaceholder}>Motivazione</Text>
                      <Text numberOfLines={1} style={styles.recapContent}>
                        {this.state.inputs.reason.selected && this.state.inputs.reason.buttons[this.state.inputs.reason.selected].label}
                      </Text>
                    </View>
                    <View style={styles.recapImageContainer}>
                        <Image
                          source={{uri: this.state.inputs.image.value || undefined}}
                          style={styles.recapImage}
                          resizeMode="cover"
                        />
                    </View>
                  </View>
                  <View style={styles.recapButtons}>
                    <CustomButton buttonStyle={styles.sendReportBtn} textStyle={styles.sendReportTextBtn} text="Invia Segnalazione" onPress={() => this.sendReport(1)}/>
                    <CustomButton textStyle={[styles.backBtn,{color:'rgba(18,18,18,0.2)'}]} text="Torna indietro" onPress={() => this.scrollOnTap(SECTION_WIDTH*2)}/>
                  </View>
                </View>
              </Animated.View>
              <View style={styles.screen}/>
            </Animated.ScrollView>
            <ConfirmScreen
              style={{top: interpolationsModal}}
              closeModal={() => this.handleModal(0)}
              navigation={this.props.navigation}
            />
          </Animated.View>
          </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    // paddingVertical: PADDING.VERTICAL_CONTAINER,
    zIndex: 100,
    overflow:'visible'
  },
  background:{
    width:100*Vw,
    height: 100*Vh,
    position:'absolute',
    zIndex: 1
  },
  header:{
    position: 'absolute',
    zIndex: 101,
    top: -2*Vh,
    paddingTop: PADDING.VERTICAL_CONTAINER,
    paddingHorizontal: PADDING.HORIZONTAL_CONTAINER,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  redScreen:{
    backgroundColor: COLOR.RED
  },
  title: {
    fontSize: FONT_SIZE.DEFAULT,
    fontFamily: FONT.AVENIR,
    color: COLOR.WHITE
  },
  scrollView:{
    paddingLeft: 20*Vw
  },
  scrollViewChildren:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  screen:{
    width: SECTION_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plateInput: {
    fontSize: FONT_SIZE.XL,
    fontFamily: FONT.BEBAS,
    color: COLOR.WHITE,
    marginBottom: 3*Vh
  },
  photoIcon: {
    tintColor: COLOR.WHITE,
    marginBottom: 6*Vh,
    width: 12*Vw,
    height: 12*Vw,
  },
  nextStepContainer:{
    padding: 3*Vw,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  nextStep:{
    tintColor: COLOR.WHITE,
    width: 13*Vw,
    height: 13*Vw,
    transform:[
      {rotate: '180deg'}
    ]
  },
  reasonsScrollView:{
    position:'absolute',
    bottom: 0*Vh,
    left: -20*Vw,
    overflow:'hidden',
    width:100*Vw,
  },
  reasonsRow:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    width:140*Vw,
  },
  reasonsBtn:{
    backgroundColor: 'rgba(40,40,40,1)',
    margin: 1.5*Vw,
    paddingVertical:2.2*Vh,
    width: 40*Vw,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  reasonsText:{
    fontSize: FONT_SIZE.S,
    fontFamily: FONT.AVENIR,
    color: 'rgba(255,255,255,0.4)'
  },
  recapContainer:{
    position: 'absolute',
    width: 100*Vw,
    height: 90*Vh,
    paddingVertical: PADDING.VERTICAL_CONTAINER,
    paddingHorizontal: PADDING.HORIZONTAL_CONTAINER,
    alignItems: 'flex-start',
  },
  recapTitle:{
    fontSize: FONT_SIZE.XL,
    fontFamily: FONT.BEBAS,
    color: 'rgba(0,0,0,0.05)'
  },
  mapContainer:{
    width:'100%',
    height: 20*Vh,
    marginTop: 2.5*Vh,
    borderRadius: 4,
    overflow: 'hidden'
  },
  map:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  recapSectionContainer: {
    marginTop: 2.5*Vh,
    width: '100%'
  },
  recapPlaceholder: {
    fontSize: FONT_SIZE.S,
    color: COLOR.GREY,
    fontFamily: FONT.AVENIR
  },
  recapContent: {
    fontSize: FONT_SIZE.DEFAULT,
    color: COLOR.BLACK,
    marginTop: 5,
    fontFamily: FONT.AVENIR
  },
  recapReasonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(200,200,200,0.2)',
    paddingBottom: 2.5*Vh
  },
  recapImageContainer: {
    overflow: 'hidden',
    marginLeft: 'auto',
    alignSelf: 'flex-end'
  },
  recapImage: {
    width: 12*Vw,
    height: 12*Vw,
    borderRadius: 3
  },
  recapButtons:{
    position: 'absolute',
    bottom: -1*Vh,
    alignSelf: 'center'
  },
  sendReportBtn:{
    backgroundColor: COLOR.RED
  },
  sendReportTextBtn:{
    color: COLOR.WHITE
  },
  backBtn:{
    color:'rgba(255,255,255,0.4)',
    fontSize: FONT_SIZE.S,
    fontFamily: FONT.AVENIR
  },
  closeContainer:{
    marginLeft: 'auto'
  },
  closeIcon: {
    height: 6*Vh,
    width: 6*Vh,
    tintColor: COLOR.WHITE,
    transform:[
      {translateX: 3*Vh}
    ]
  }
})

export default AddReportScreen
