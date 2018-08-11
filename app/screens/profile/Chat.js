import React, { Component } from "react";
import {
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback,
    Image,
    StyleSheet
} from 'react-native';
import { PADDING, COLOR, FONT, FONT_SIZE, Vh, Vw } from '../../styles/utilities'

class ChatScreen extends Component {
  constructor() {
    super();

    this.state = {
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
      return (
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Messaggi</Text>
            </View>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={{paddingTop:PADDING.VERTICAL_CONTAINER*2}}
              scrollEventThrottle={16}>
              {this.state.chat.map((item, key) =>{
                return(
                <View key={key} style={styles.elementList}>
                  <TouchableWithoutFeedback
                    style={styles.returnReportBtn}
                    onPress={()=>this.props.navigation.navigate('Message', {item:item})}>
                    <View style={styles.touchableElement}>
                      <View style={styles.leftPartList}>
                        <Text style={[styles.typeList, {color:item.color}]}>{item.type}</Text>
                        <Text style={styles.statusList}>{item.status}</Text>
                      </View>
                      <View style={styles.rightPartList}>
                        <Image
                          style={styles.chatIcon}
                          source={require('../../../assets/images/message.png')}
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              )})}
            </ScrollView>
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  header:{
    backgroundColor: 'rgba(245,245,245, 0.95)',
    paddingBottom: 2*Vh,
    paddingVertical: PADDING.VERTICAL_CONTAINER,
    paddingHorizontal: PADDING.HORIZONTAL_CONTAINER,
    position:'absolute',
    zIndex:10,
    width: 100*Vw
  },
  headerTitle: {
    fontSize: FONT_SIZE.M,
    color: COLOR.GREY,
    fontFamily: FONT.AVENIR
  },
  chatIcon: {
    marginLeft: 'auto',
    tintColor: 'rgba(200,200,200,0.6)',
    height: 7*Vh,
    width: 7*Vh
  },
  elementList:{
    paddingHorizontal: PADDING.HORIZONTAL_CONTAINER,
    paddingVertical: 3*Vh,
    borderBottomColor: 'rgba(0,0,0,0.03)',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  touchableElement:{
    width: '100%',
    justifyContent: 'center',
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
});

export default ChatScreen
