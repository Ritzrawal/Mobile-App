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
export default class LastSlide extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  constructor(props){
    super(props)
  };
  render() {
    // const { t, i18n, navigation } = this.props;
    // const { navigate } = navigation;
    return (
      <Container>
         <Header style={{backgroundColor:'#9ec54d'}}>
          <Left>
            <Button
              transparent
              onPress={() => navigation.dispatch(NavigationActions.back())}
            >
                 <Icon style={{color:'#fff'}}size={15} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>BACK</Title>
          </Body>
          <Right />
        </Header>
        <View style={{borderWidth:2,width:200,height:300}}>
         
         
        </View>
        <View>
        <TouchableOpacity
            style={styles.customBtnLower}
             onPress={(id ) => this.props.navigation.navigate("SwappingLastslide",{SampleFunction:this.SampleFunction()})}
            // onPress={()=>this.SampleFunction()}
          >
         
            <Text style={styles.customBtnText}>Go to Strengthening Techniques
            {/* {this.state.currentLanguage == "en"
                          ? item.title
                          : item.title_phi}  */}
            </Text>
          </TouchableOpacity>
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
    customBtnLower: {
      backgroundColor: "#9ec54d",
      paddingHorizontal: 30,
      // position:'absolute',
      // bottom:30,
      paddingVertical: 5,
      flexDirection: "row",
      //  justifyContent: "center",
       alignItems: "center",
      borderRadius: 5,
      marginTop: 50,
      width: "90%"
    },
    customBtnText: {
      fontSize: 25,
      fontWeight: "300",
      alignItems: "center",
      justifyContent: "center",
  
      color: "#fff"
    },
    
  buttonContainer: {
    width: 220,
    flexDirection: "row",
    justifyContent: "space-between"
  },
})