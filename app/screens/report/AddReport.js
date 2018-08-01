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
import { PADDING, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../../styles/utilities'
import PhotoUpload from '../../utilities/PhotoUpload'

const CARD_HEIGHT = 31.2 * Vh;
const CARD_WIDTH_IN = 60*Vw;

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
    }
  }
  componentWillMount() {
    this.index = 0
    this.animation = new Animated.Value(0)
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
    if (plateInsert[plateInsertLength] === " "){
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
          validate: bool
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

  scrollOnTap = (scroll, section) => {
    this.scrollView.getNode().scrollTo({ x: scroll, y: 0, animated: true });
    if(section === 'plate'){
      this.setState({
        inputs:{
          ...this.state.inputs,
          image: {
            ...this.state.inputs.image,
            setImage: true
          }
        }
      })
    }
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
    })
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
             style={[styles.settingsIcon,{alignSelf: 'center'}]}
             source={require('../../../assets/images/vocal.png')}
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
              style={[styles.settingsIcon,{alignSelf: 'center'}]}
              source={require('../../../assets/images/vocal.png')}
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

    render() {
      const interpolationsScreen = this.state.sections.map((marker, index) => {
        const inputRange = [
          (index - 1) * CARD_WIDTH_IN,
          index * CARD_WIDTH_IN,
          ((index + 1) * CARD_WIDTH_IN),
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
          outputRange: [0, 0.5, 0],
          extrapolate: "clamp",
        })
        return { opacity, opacityBackground, opacityImage, height };
      })

      const interpolationsPlate = this.state.sections[0].backgroundColor.interpolate({
          inputRange: [0,1],
          outputRange: [1, 0],
          extrapolate: "clamp",
      })

        return (
          <React.Fragment>
            <Animated.View style={[styles.background, {opacity: interpolationsPlate, backgroundColor: COLOR.RED, zIndex:2}]}/>
            <Animated.View style={[styles.background, {opacity: interpolationsScreen[0].opacityBackground, backgroundColor: COLOR.GREEN}]}/>
            <Animated.View style={[styles.background, {opacity: interpolationsScreen[1].opacityBackground, backgroundColor: "#000"}]}/>
            <Animated.View style={[styles.background, {opacity: interpolationsScreen[2].opacityBackground, backgroundColor: "#000"}]}/>
            <View style={[styles.background, { backgroundColor: "#000", zIndex:-10}]}/>
            <Animated.View style={[styles.container]}>
              <View style={styles.header}>
                <Text style={styles.title}>
                  Aggiungi Segnalazione
                </Text>
              </View>
              <Animated.ScrollView
              horizontal
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              snapToInterval={CARD_WIDTH_IN}
              snapToAlignment='start'
              decelerationRate="fast"
              bouncesZoom={true}
              // scrollEnabled={false}
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
                  <TouchableOpacity style={[styles.nextStepContainer, {bottom: 13.5*Vh, zIndex:200}]} onPress={() => this.scrollOnTap(CARD_WIDTH_IN, 'plate')}>
                    <Image
                      style={styles.nextStep}
                      source={require('../../../assets/images/vocal.png')}
                    />
                  </TouchableOpacity> }
                  </View>
                </TouchableWithoutFeedback>
              </Animated.View>
              <Animated.View style={[styles.screen, {opacity: interpolationsScreen[1].opacity}]}>
                {this.inputFile(interpolationsScreen)}
                { this.state.inputs.image.loader && <ActivityIndicator size="large" color={COLOR.BLUE} style={{position:'absolute',bottom: 13.5*Vh}} />}
                { this.state.inputs.image.validate &&
                <TouchableOpacity style={[styles.nextStepContainer, {bottom: 13*Vh}]} onPress={() => this.scrollOnTap(CARD_WIDTH_IN*2)}>
                  <Image
                    style={styles.nextStep}
                    source={require('../../../assets/images/vocal.png')}
                  />
                </TouchableOpacity> }
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
                <Text style={[styles.title,{marginTop: 35*Vh}]}>
                  {this.state.inputs.reason.selected !== undefined ? 'Motivazione: '+ this.state.inputs.reason.buttons[this.state.inputs.reason.selected].label : 'Motiva la segnalazione'}
                </Text>
                {this.state.inputs.reason.validate &&
                  <TouchableOpacity style={[styles.nextStepContainer, {bottom: -14*Vh}]} onPress={() => this.scrollOnTap(CARD_WIDTH_IN*2)}>
                    <Image
                      style={styles.nextStep}
                      source={require('../../../assets/images/vocal.png')}
                    />
                  </TouchableOpacity>
                }
              </Animated.View>
              <View style={styles.screen}/>
            </Animated.ScrollView>
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
    overflow:'visible',
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
    paddingTop: PADDING.VERTICAL_CONTAINER,
    paddingHorizontal: PADDING.HORIZONTAL_CONTAINER
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
    width: CARD_WIDTH_IN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plateInput: {
    fontSize: FONT_SIZE.XL,
    fontFamily: FONT.BEBAS,
    color: COLOR.WHITE,
    marginBottom: 3*Vh
  },
  settingsIcon: {
    tintColor: COLOR.WHITE,
    marginBottom: 2.2*Vh,
    transform: [
        {scaleX: 0.3},
        {scaleY: 0.3}
    ]
  },
  nextStepContainer:{
    padding: 3*Vw,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  nextStep:{
    tintColor: COLOR.WHITE,
    transform: [
        {scaleX: 0.3},
        {scaleY: 0.3}
    ]
  },
  reasonsScrollView:{
    position:'absolute',
    top: -15*Vh,
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
    margin: 2*Vw,
    paddingVertical:3*Vh,
    width: 40*Vw,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  reasonsText:{
    fontSize: FONT_SIZE.S,
    fontFamily: FONT.AVENIR,
    color: 'rgba(255,255,255,0.4)'
  }
})

export default AddReportScreen
