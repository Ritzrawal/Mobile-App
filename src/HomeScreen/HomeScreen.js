import React from "react";
import {
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,TouchableWithoutFeedback,
  View,
  StatusBar,
  AsyncStorage,
  ScrollView,
  Image,Alert
} from "react-native";
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
 Icon,
  Right,
  Picker,
  Item,
  Label,ActionSheet, List, ListItem, Thumbnail
} from "native-base";
import Swiper from 'react-native-swiper';
import SwiperUpperhomescreen from './uperswiper'
import { DrawerActions } from "react-navigation";
import { SuperGridSectionList } from "react-native-super-grid";
import AnimateNumber from "react-native-animate-number";
import {NavigationActions} from "react-navigation";
import Icons from 'react-native-vector-icons/FontAwesome';
// import Information from "../Component/information"
import { withNamespaces } from "react-i18next";
import i18n from '../i18n/index';
import RNRestart from "react-native-restart";
import UpperScreen from "./test"
// const cards = [
//   {
//     text: 'Card One',
//     name: 'One',
//     image: {uri:'https://previews.123rf.com/images/sutichak/sutichak1510/sutichak151001047/47203652-building-residential-construction-house-with-scaffold-steel-for-construction-worker-image-used-vinta.jpg'},
//   },
//   {
//     text: 'Card two',
//     name: 'two',
//     image: {uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuAYQIv4cAOcIxvP2ydbBe_2idc-g7zeBxtQ75iuoARJUFhHyM'},
//   },
//   {
//     text: 'Card three',
//     name: 'two',
//     image: {uri:'https://i.ytimg.com/vi/sGWxZrieoXo/maxresdefault.jpg'},
//   },
  
  
// ];

var BUTTONS = [
  {id:'en', text: "English", icon: "flag", iconColor: "#2c8ef4" },
  { id:'fil',text: "Philiphines", icon: "flag", iconColor: "#ea943b" },
   { id:'cancel',text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX=3;
var CANCEL_INDEX = 2;
export  class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
 
   console.group("into homescreen");
    this.state = {
   
      isLogin: "",
      role: "",
      selectedValue: "",
      position: 1,
      interval: null,
      dataSource: [
        {
         
          url: "https://placeimg.com/640/480/tech"
        },
        {
         
          url: "http://placeimg.com/640/480/any"
        },
        {
          
          url: "https://placeimg.com/640/360/nature"
        }
      ],
      languageType: [{ name: "en", id: 1 }, { name: "fr", id: 2 }],
gridSwitch:true,
    };
    this.loadApp();
    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.changeLayout = this.changeLayout.bind(this);
    
    
  }
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  }
  loadApp = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    const role1 = await AsyncStorage.getItem("Role");
    console.log("role==" + role1);
    userToken
      ? this.setState({
          isLogin: "true",
          role: role1
        })
      : this.setState({
          isLogin: "false" 
        });
  };
  handleChangeOption(val) {
    if (val !== 0) {
       this.setState({selectedValue: val});
if(val==1){
  AsyncStorage.setItem("lang", 'en')
  .then(data => {
    RNRestart.Restart();
  })
  .catch(err => {
    console.log("err");
  });
}
if(val==2){
  AsyncStorage.setItem("lang", 'fr')
  .then(data => {
    RNRestart.Restart();
  })
  .catch(err => {
    console.log("err");
  });
}
   
    }
  }
  Logout(key) {
    console.log("logged out1");
    try {
      AsyncStorage.removeItem("userToken");
      AsyncStorage.removeItem("Role");
      console.log("logged out2");
      this.setState({
        isLogin: false
      });
      console.log("logged out");
      return true;
    } catch (exception) {
      return false;
    }
  }
 async changeLanguage1(buttonId){
 
console.log('shds'+JSON.stringify(buttonId.id));
var id=buttonId.id;
if(id=='en'){
  console.log("into the english");
  i18n.changeLanguage('en');

 
}
else if(buttonId.id=='may'){
  i18n.changeLanguage('may');

 
}
else if(buttonId.id=='es'){
  i18n.changeLanguage('es');


}
else if(buttonId.id=='fil'){
  i18n.changeLanguage('fil');

}
else{

}


}
changeLayout = (type) => {
  console.log("into the change layoiut");
  console.log("type="+type);
  if(type=='grid'){
    console.log("grid");
    this.setState({ gridSwitch: true })
  }
  else if(type=='list'){
    console.log("list");
    this.setState({ gridSwitch: false })
  }
  else{
  
  }

};



  checkLogin = () => {
    console.log("into checklogin");
    AsyncStorage.getItem("userToken").then(data => {
      console.log("data" + data);
      console.log(data);
      this.setState({
        isLogin: true
      });
    });
  };
  componentWillMount() {
    console.log("into theasdasd");
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.state.dataSource.length
              ? 0
              : this.state.position + 1
        });
      }, 2000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  // componentDidMount () {
  //   this.setState({
  //     items: [
  //       { title: 'Hello Swiper',
  //       image: {uri:'https://previews.123rf.com/images/sutichak/sutichak1510/sutichak151001047/47203652-building-residential-construction-house-with-scaffold-steel-for-construction-worker-image-used-vinta.jpg'},
  //       css: styles.slide1 },
  //       { title: 'Beautiful',
  //       image: {uri:'https://i.ytimg.com/vi/sGWxZrieoXo/maxresdefault.jpg'},

  //       css: styles.slide2 },
  //       { title: 'And simple',
  //       image: {uri:'https://previews.123rf.com/images/sutichak/sutichak1510/sutichak151001047/47203652-building-residential-construction-house-with-scaffold-steel-for-construction-worker-image-used-vinta.jpg'},
  //       css: styles.slide3 }
  //     ]
  //   })
  // }
  // componentDidMount () {
  //   this.setState({
  //     cards: [
  //      {
  //   text: 'Card One',
  //   name: 'One',
  //   image: {uri:'https://previews.123rf.com/images/sutichak/sutichak1510/sutichak151001047/47203652-building-residential-construction-house-with-scaffold-steel-for-construction-worker-image-used-vinta.jpg'},
  // },
  // {
  //   text: 'Card two',
  //   name: 'two',
  //   image: {uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuAYQIv4cAOcIxvP2ydbBe_2idc-g7zeBxtQ75iuoARJUFhHyM'},
  // },
  // {
  //   text: 'Card three',
  //   name: 'two',
  //   image: {uri:'https://i.ytimg.com/vi/sGWxZrieoXo/maxresdefault.jpg'},
  // },
  //     ]
  //   })
  // }
  render() {
    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;
   
    return (
      <Container>
        <Header
          iosBarStyle="light-content" style={{backgroundColor:'#9ec54d'}}
        >
          <Left>
            <Button transparent onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
              <Icon name="menu" style={{ color: "#FFF" }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#FFF" }}>{t("home:title")}</Title>
          </Body>
          <Right>


            <Button transparent
            onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "Change Language"
              },
              buttonIndex => {
                this.setState({ clicked: BUTTONS[buttonIndex] },
                  console.log('index'+ BUTTONS[buttonIndex]),
            
              i18n.changeLanguage(BUTTONS[buttonIndex].id),
              AsyncStorage.setItem('language', BUTTONS[buttonIndex].id)
                  );
                  
                
              }
            )}
          >
             <Icons name="globe" size={25} style={{ color: "#FFF" }} />
          </Button>

            </Right>
        </Header>
        <Content>  
      
   <View style={styles.maincontainer}>

   <View style={styles.uppercontainer}>
   <UpperScreen/>
   {/* <Swiper showsButtons>
        {this.state.items.map((item, key) => {
          return (
            <View key={key} style={item.css}>
            <Image style={{width:200,height:200}} source={item.image}/>
              <Text style={styles.text}>{item.title}</Text>
            </View>
          )
        })}
      </Swiper> */}
 
      {/* <Swiper style={styles.wrapper}showsButtons={true} loop={false}
          // renderPagination={renderPagination}>
    >
    
       
        <View style={styles.slide1}>
      
       
        <Image
            style={{width: "100%", height: "100%"}} 
           
           source={{uri: 'https://cdn.slidesharecdn.com/ss_thumbnails/mmhsmallhousedesign-150731113923-lva1-app6891-thumbnail-4.jpg?cb=1438342856'}}
        />
        
        </View>
        <View style={styles.slide2}>
       
        <Image

           style={{width: "100%", height: "100%"}}
          source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuAYQIv4cAOcIxvP2ydbBe_2idc-g7zeBxtQ75iuoARJUFhHyM'}}
        />
        </View>
        <View style={styles.slide3}>
        <Image
           style={{width: "100%", height: "100%"}}
          source={{uri: 'https://i.ytimg.com/vi/sGWxZrieoXo/maxresdefault.jpg'}}
        />
        </View>
      </Swiper> */}
      </View>
    
   <SuperGridSectionList style={{backgroundColor:'#fff'}}
    // itemDimension={120}
    // spacing={50}
            sections={[
              {
                data: [
                  {
                    id: "1",
                    screen: "OmpongNavigator",
                   name: t('home:How_safe_is_my_House'),
                    code: "#6383a8", 
                    icon: "iconhome",
                    image: "https://via.placeholder.com/350x150",
                    imageIcons: require("../../assets/icons/white/howsafe.png"),
                    detail:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  },
                  {
                    id: "2",
                    screen: "DocumentNavigator",
                   name: t('home:How_to_strengthen_my_house'),
             
                    code: "#6383a8", 
                    icon: "home",
                    image: "https://via.placeholder.com/350x150",
                    imageIcons: require("../../assets/icons/white/howtostrength.png"),
                    detail:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  },
                  {
                    id: "5",
                    screen: "RiskNavigator",
                    name:  t('home:Materials_Quality'),
                    code: "#6383a8",
                    icon: "phone",
                    image: "https://via.placeholder.com/350x150",
                    imageIcons: require("../../assets/icons/white/materialquality.png"),
                    detail:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  },
                  {
                    id: "4",
                    screen: "SafetyNavigator",
                    name:  t('home:site_safety'),
                    code: "#6383a8",
                    icon: "calculator",
                    image: "https://via.placeholder.com/350x150",
                    imageIcons: require("../../assets/icons/white/sitesafetylogo.png"),
                    detail:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  },
                
                  {
                    id: "7",
                    screen: "FinancialNavigator",
                    name: t('home:References'),
                    code: "#6383a8",  
                    icon: "bullhorn",
                    image: "https://via.placeholder.com/350x150",
                    imageIcons: require("../../assets/icons/white/Referencelogo.png"),
                    detail:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  },
                  {
                    id: "8",
                    screen: "FaqNavigator",
                    name: t('home:Faq'),
                    code: "#6383a8", 
                    icon: "bullhorn",
                    image: "https://via.placeholder.com/350x150",

                    imageIcons: require("../../assets/icons/white/faqlogo.png"),
                    detail:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  }
 
             
                  
                ]
              }
            ]}
            
            style={[styles.gridView1, {borderColor:'transparent'}]}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => {
           
                  this.props.navigation.navigate(item.screen, {
                    itemId: item.id,
                    itemName: item.name,
                    itemImage: item.image,
                    itemDetail: item.detail,
                    otherParam: "anything you want here"
                  });
                }}
              >
                <View style={[styles.itemContainer, {backgroundColor:item.code,borderColor:'#000',alignItems:'center',borderWidth:2}]}>
                 
                 

                  <Image
                    style={{ position:'absolute',top:5,justifyContent:'center',alignItems:'center'}}
                    source={item.imageIcons}
                  />
                  <View style={styles.textstyle}>

                  <Text style={{   fontSize: 16,
    color: "#000",
    fontWeight: "600",
    fontFamily: 'Circular Std Medium',
    textAlign: "center"}}>{item.name}</Text>
    </View>
                </View>
              </TouchableWithoutFeedback>
            )}
            renderSectionHeader={({ section }) => (
              <Text style={{ color: "green" }}>{section.title}</Text>
            )}
          />
          </View>
   


          <View style={{ flex: 1, backgroundColor: "white"}}>

            <View style={{ height: 100}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
              >
                <View
                  style={{
                    height: 50,
                    width: 170,
                    
                    marginLeft: 5,
                    // borderWidth:2,
               
                  }}
                >
                  <View style={{ flex: 2,justifyContent:'center',
                    alignItems:'center', }}>
                    <Image
                      source={require("../../assets/icons/org/buildologo.png")}
                      style={{
                        //  height:'100%',
                        //  width:'100%',
                          //  height: 40,
                    // width: 160,
                        //  flex: 1,
                        resizeMode: "cover",
                        overflow: "visible",
                      
                      }}
                    />
                  </View>

                </View>
                <View
                  style={{
                    height: 50,
                    width: 170,
                    // borderWidth:2,
                     marginLeft: 10,
                  
                  }}
                >
                  <View style={{ flex: 2,justifyContent:'center',
                    alignItems:'center', }}>
                    <Image
                      source={require("../../assets/icons/org/pilo.png")}
                      style={{
                        
                        // paddingLeft:30,
                        // justifyContent:'flex-end',
                        
                        //  flex: 1,
                        resizeMode: "cover",
                        overflow: "visible"
                      }}
                    />
                  </View>

   
                </View>
              </ScrollView>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default withNamespaces(['home', 'common'], { wait: true })(HomeScreen);
const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#C2185B"
  },
  header: {
    marginTop: StatusBar.currentHeight
  },
  gridView1: {
    paddingTop: 3,
    // flex: 1,
  backgroundColor: 'white',
  },
  gridView: {
    paddingTop: 10,
    // flex: 1,
  backgroundColor: 'white',
  },
textstyle:{
  backgroundColor:'#fff',
  position:'absolute',
  bottom:0,
  justifyContent:'center',
  width:162,
  height:50
},
  itemContainer: {
    flex: 1,
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 160,
  //  borderColor: "gray",
   // borderWidth: 1
  },
  itemName: {
    fontSize: 16,
    color: "#037971",
    fontWeight: "600",
    textAlign: "center"
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#C2185B"
  },
  PickerLabel: {
    borderColor: "transparent",
    height: 30
  },
  Picker: {
    marginTop: -5,
    marginLeft: 9,
    paddingBottom: 10,
    borderWidth: 1,
    borderBottomColor: "gray"
  },
  PickerLine: {
    borderBottomColor: "#aaa",
    borderBottomWidth: 0.5,
    marginLeft: 15
  },
  uppercontainer:{
    width:"94%",
    height:180,
    //  borderWidth:2,
    //  borderColor:'red',
    marginTop:10,
    marginLeft:10,
    //  paddingLeft:10,
     

  },
  // lowercontainer:{
  //   borderWidth:2,
  //   borderColor:'red',
  // },
//////////////////////// HOME


listitem_home:{

  borderBottomWidth: 0,
  backgroundColor: 'transparent',
  },
  
 
  
  
  note_home:{
  
    fontSize: 13,
  
  },
    
});
