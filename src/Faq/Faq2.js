import React, { Component } from "react";
import {
  ListView,
  Platform,
  StyleSheet,
  View,
  Alert,
  AppRegistry,
  Image,
  TouchableHighlight,
  ScrollView,
  AsyncStorage,
  TextInput,
  DatePickerIOS,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

// import MapView from "react-native-maps";

import {
  Container,
  Body,
  Header,
  Item,
  Input,
  Icon,
  Content,
  Footer,
  FooterTab,
  Button,
  Badge,
  StyleProvider,
  Text,
  Card,
  CardItem,
  Separator,
  Left,
  Right,
  Title,
  ListItem,Accordion
} from "native-base";
import Icons from "react-native-vector-icons/FontAwesome";
import { NavigationActions } from "react-navigation";
import { withNamespaces } from "react-i18next";
import Panel from './FaqComponent.js';
import { storage } from "../../App";
const dataArray = [
    { title: "First Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
  ];
export  class FAQ extends Component {
  static navigationOptions = {
    // title: "FAQ",
    header: null,
   
  };

  constructor(props) {
    super(props);

    this.state = {
      faqsData: null,
      acc: [],
      isReady: true,
      currentLanguage:'',
    };
    
  }
  getData() {
    var _this = this;

    storage
      .load({
        key: "faqs",
        autoSync: true,
        syncInBackground: true
      })
      .then(res => {
        console.log("res data");
        console.log("Resdata" + JSON.stringify(res));
        //    if (this._isMounted) {
        //   console.log("is mounted"+ this._isMounted);

        this.setState({
          faqsData: res,
          //  acc: this.state.acc.concat( { title:  res[1].title, content: res[1].body})

          isReady: true
        });
        // }
      })
      .catch(err => {
        switch (err.name) {
          case "NotFoundError":
           
         
            break;
          case "ExpiredError":
           
            break;
        }
      });

    storage.sync = {
      // The name of the sync method must be the same as the data's key name
      // And the passed params will be an all-in-one object.
      // You can return a value or a promise here

      async faqs(params) {
        return (
          fetch("http://phlapp.drcmp.org/api/faqs", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
            .then(response => {
              console.log("response from sync");
              //  console.log("isready1"+this.state.isReady);
              // console.log("isready2"+_this.state.isReady);
              return response.json();
            })
            .then(responseData => {
              //    return responseData;
              if (responseData) {
                storage
                  .save({
                    key: "faqs",
                    //id,
                    data: responseData.faqs

                    /*    data: {
                      from: 'some other site',
                      userid: 'some userid',
                      token: 'some token'
                    },  */
                  })
                  .then(ret => {
                    console.log("thheb");
                    _this.setState(
                      {
                        faqsData: responseData.faqs
                      },
                      console.log(
                        "RESPONSE DATA FROM SYNC" +
                          JSON.stringify(_this.state.faqsData)
                      )
                    );

                    //   _this.getData();
                    // successCallback(ret);
                    // _this.getData();
                  })
                  .catch(err => {
                    console.log("catch");
                    //failCallBack(err.message);
                  });
              }
            })
            // .then(data =>
            // console.log("data"+data.documentId),
            //  data.forEach(data2 => {
            //  console.log(data2.title);
            //  })
            // )

            .catch(err => {
              console.log("fetch error" + err);
            })
        );
      }
    };
  }
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted == true) {
      this.getData();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;

  }

componentWillMount(){
  AsyncStorage.getItem("language").then((value) => {
    console.log("Value"+value);
    this.setState({currentLanguage: value});
})
.then(res => {
    //do something else
});
}

_pressCall=()=>{
  const url='tel:+123456789'
  Linking.openURL(url)
}

  render() {
    const { t, i18n, navigation } = this.props;
    if(!this.state.faqsData){
      return (
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="large"
        />
      );
    }

    return (
 

<Container>
<Header style={{backgroundColor:'#9ec54d'}}> 
      <Left>
      <Button transparent onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>{t('faq:back')}</Title>
      </Body>
      <Right />
    </Header>
<Content  style={{ backgroundColor: "white" }}>
<View>


<View >
        <ScrollView>





          <View style={styles.form_Container}>
            {/* <ListItem itemDivider>
              <Text style={styles.heading3}>{t("faq:title")}</Text>
            </ListItem> */}

            {this.state.faqsData == null ? (
          <Text>{JSON.stringify(this.state.faqsData)}</Text>
        ):

        this.state.faqsData.map((item, index) => {
          console.log("accc datae"+index);
          return (
            <View style={{borderBottomWidth:2}}>
        
            <Panel style={styles.heading4} title={this.state.currentLanguage=='en'?item.question:item.question_idn}>
            <Text style={styles.normalText}>{this.state.currentLanguage=='en'?item.answer:item.answer_idn}</Text>
          </Panel>
     
      </View>
      
    
          )
      })
            }

</View>
<View  style={{justifyContent: "center",
    alignItems: "center",}}>
<TouchableOpacity
            style={styles.customBtnBGRAt}
            onPress={() => this.props.navigation.navigate("")}
          >
         
            <Text style={styles.customBtnText}>{t('faq:buttonname')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.customBtnBGRAt1}
            onPress={() => this.props.navigation.navigate("HomeScreen")}
          >
         
            <Text style={styles.customBtnText}>{t('faq:homebutton')}
            </Text>
          </TouchableOpacity>
          </View>
      
        </ScrollView>
      </View>
     
      {/* <View style={{borderBottomWidth:2}}>
        <ScrollView>





          <View style={styles.form_Container}>
           

            {this.state.faqsData == null ? (
          <Text>{JSON.stringify(this.state.faqsData)}</Text>
        ):

        this.state.faqsData.map((item, index) => {
          console.log("accc datae"+index);
          return (
        
            <Panel style={styles.heading4} title={this.state.currentLanguage=='en'?item.question:item.question_idn}>
            <Text style={styles.normalText}>{this.state.currentLanguage=='en'?item.answer:item.answer_idn}</Text>
          </Panel>
      
      
    
          )
      })
            }


        {


        }
</View>
        </ScrollView>
      </View> */}

</View>

</Content>
{/* <View  style={{justifyContent: "center",
    alignItems: "center",}}>
<TouchableOpacity
            style={styles.customBtnBGRAt}
            onPress={() => this.props.navigation.navigate("")}
          >
         
            <Text style={styles.customBtnText}>{t('faq:buttonname')}
          
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.customBtnBGRAt1}
            onPress={() => this.props.navigation.navigate("HomeScreen")}
          >
         
            <Text style={styles.customBtnText}>{t('faq:homebutton')}
           
            </Text>
          </TouchableOpacity>
          </View> */}
</Container>
    );
  }
}
export default withNamespaces(['faq', 'common'], { wait: true })(FAQ);
const styles = StyleSheet.create({
  input_Instruction: {
    fontSize: 20,
    textAlign: "left",
    //color: '#FDFEFE',
    // fontWeight: "bold",
    fontFamily: "Apple SD Gothic Neo",
    marginBottom: 4
  },

  input_Instruction2: {
    fontSize: 24,
    textAlign: "left",
    color: "#990000",
    fontWeight: "bold",
    fontFamily: "Apple SD Gothic Neo",
    marginBottom: 4
  },

  input_Instruction3: {
    fontSize: 24,
    textAlign: "left",
    fontWeight: "bold",
    fontFamily: "Apple SD Gothic Neo",
    marginBottom: 4
  },

  contactView: {
    marginTop: 10,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 5,
    justifyContent: "center"
  },

  map: {
    flex: 1
  },
  pageContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },

  contentContainer: {
    flex: 11
    /*       borderWidth: 1,
           borderColor: 'rgba(213,0,0,1)',*/
  },

  form_Container: {
    justifyContent: "center",
    //marginTop: 0,
    padding: 20
    //backgroundColor: '#ffffff',
  },

  form_Container2: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center"
  },
customBtnBGRAt: {
    backgroundColor: "#6383a8",
    // borderWidth:2,
    // color:'#000',
    //  position:'absolute',
    // bottom:85,
    // paddingHorizontal: 30,
    // paddingVertical: 5,
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
   
    height:45,
    // marginLeft:16,
    
    width: "90%"
  },
  customBtnBGRAt1: {
    backgroundColor: "#6383a8",
    // borderWidth:2,
    // color:'#000',
    //  position:'absolute',
    // bottom:20,
    // paddingHorizontal: 30,
    // paddingVertical: 5,
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    height:45,
    // marginLeft:16,
    
    width: "90%"
  },
  customBtnText: {
    fontSize: 20,
    color:'#fff',
    fontWeight: "300",
    alignItems: "center",
    justifyContent: "center",

    
  },
  heading1: {
    margin: 10,
    marginTop: 10,
    fontSize: 20,
    textAlign: "left",
    //color: '#FDFEFE',
    fontWeight: "bold",
    fontFamily: "Apple SD Gothic Neo",
    marginBottom: 4
  },

  heading2: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 10,
    textAlign: "left",
    //color: '#FDFEFE',
    fontWeight: "bold",
    fontFamily: "Apple SD Gothic Neo"
  },

  heading3: {
    fontSize: 20,
    textAlign: "left",
    color: "red",
    fontWeight: "bold",
    fontFamily: "Apple SD Gothic Neo"
  },

  heading4: {
    fontSize: 16,
    textAlign: "justify",
    color: 'green',
    fontWeight: "bold",
    fontFamily: "Apple SD Gothic Neo"
  },

  normalText: {
    fontSize: 15,
    textAlign: "justify",
    //color: '#FDFEFE',
    // fontWeight: "bold",
    fontFamily: "Apple SD Gothic Neo"
  },

  li: {
    flex: 1,
    justifyContent: "flex-start"
  },

  liNumber: {
    fontSize: 16
  },

  liIcon: {
    width: 80,
    height: 110
  },

  liIcon2: {
    marginTop: 12,
    width: 150,
    height: 180
  },

  liItemBody: {
    marginLeft: 10,
    width: 260
  },

  liTextHeading: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16
  },

  liText: {
    color: "#333",
    fontSize: 16
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },

  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },

  itemView: {
    justifyContent: "center",
    alignItems: "center"
  },

  table_Container: {
    marginLeft: 10,
    marginTop: 5
  },

  table_Head: {
    height: 25,
    backgroundColor: "#f1f8ff"
  },

  table_Row: {},

  table_Text: {
    fontSize: 16,
    //marginLeft: 5,
    textAlign: "left"
  }
});
