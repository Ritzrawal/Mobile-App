import React, { Component } from 'react';
import { Image,TouchableOpacity,StyleSheet } from 'react-native';
import {NavigationActions} from "react-navigation";
import { Container, Header,Button, View,Right,Title, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
const cards = [
  {
    text: 'Card One',
    name: 'One',
    image: {uri:'https://previews.123rf.com/images/sutichak/sutichak1510/sutichak151001047/47203652-building-residential-construction-house-with-scaffold-steel-for-construction-worker-image-used-vinta.jpg'},
  },
  {
    text: 'Card two',
    name: 'two',
    image: {uri:'http://www.marondahomes.com/blog/wp-content/uploads/2018/01/construction-1710549_960_720.jpg'},
  },
  
];
export default class Rendersafety extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  constructor(props){
    super(props)
  };
  render() {
    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;
    return (
      <Container>
        <View>
          <DeckSwiper
             looping={false}
            dataSource={cards}
            renderEmpty=   { ()=>
              <View style={{marginTop:200}}>
              <Text style={{marginLeft:120}}>No More cards</Text> 
              
              <Button
            style={styles.customBtnBG}
            onPress={() => this.props.navigation.navigate('ListViewofSafety')}
          >
            <Text style={styles.customBtnText}>View ALL </Text>
          </Button>
          <Button
            style={styles.customBtnBG}
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <Text style={styles.customBtnText}>Back to HOME </Text>
          </Button>
          </View>
          } 
            renderItem={item =>
              <Card style={{ elevation: 3 }} looping='false'>
               <CardItem header bordered style={{justifyContent:'center',alignItems:'center',backgroundColor:'#8b0000'}}>
              <Text style={{color:'#fff'}}>DESCRIPTION</Text>
            </CardItem>
                {/* <CardItem>
                  <Left>
                    <Thumbnail source={item.image} />
                    <Body>
                      <Text>{item.text}</Text>
                     
                    </Body>
                  </Left>
                </CardItem> */}
                <CardItem cardBody>
                  <Image style={{ height: 300, flex: 1 }} source={item.image} />
                </CardItem>
                {/* <CardItem>
                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
                  <Text>{item.name}</Text>
                </CardItem> */}
              </Card>
              
            }
          />
         
        </View>
        <View style={styles.footer}>
        <Text>Swipe for the next side</Text>
          {/* <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={styles.customBtnDNG}
            onPress={() => this.props.navigation.navigate("LastSlide")}
          >
   
            <Text style={styles.customBtnText}>
               VIEW ALL
            </Text>
          </TouchableOpacity>
        </View> */}
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  customBtnDNG: {
    backgroundColor: "#9b59b6",
    paddingHorizontal: 30,
    paddingVertical: 5,
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
    width: "90%"
  },
  footer:{
    flex: 2,
    marginTop:380,
    justifyContent: "center",
    alignItems: "center"

  },
  customBtnBG: {
    backgroundColor: "#27ae60",
    paddingHorizontal: 30,
    paddingVertical: 5,
    marginTop:20,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:20,
    borderRadius: 10,
    width:'90%',
    },
  buttonContainer: {
    width: 220,
    flexDirection: "row",
    justifyContent: "space-between"
  },
})