import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
  ActivityIndicator
} from "react-native";

import CardStack, { Card } from "react-native-card-stack-swiper";

import {
  Container,
  Header,
  Button,
  Icon,
  Left,
  Body,
  Title,
  Right
} from "native-base";
import { NavigationActions } from "react-navigation";
import { withNamespaces } from "react-i18next";
import { storage } from "../../App";


export class SafetyList extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      safetyData: null,
      acc: [],
      isReady: true,
      currentLanguage: "",
      cards: []
    };

    // this.getData2();
  }

  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  getData() {
    var _this = this;

    storage
      .load({
        key: "safety",
        autoSync: true,
        syncInBackground: true
      })
      .then(res => {
        console.log("res data");
        console.log("Resdata" + JSON.stringify(res));
        //    if (this._isMounted) {
        //   console.log("is mounted"+ this._isMounted);

        this.setState({
          safetyData: res,
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

      async safety(params) {
        return (
          fetch("http://phlapp.drcmp.org/api/sitesafetyimage", {
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
                    key: "safety",
                    //id,
                    data: responseData

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
                        safetyData: responseData
                      },
                      console.log(
                        "RESPONSE DATA FROM SYNC" +
                          JSON.stringify(_this.state.safetyData)
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
  componentWillMount() {
    AsyncStorage.getItem("language")
      .then(value => {
        console.log("Value" + value);
        this.setState({ currentLanguage: value });
      })
      .then(res => {
        //do something else
      });
  }
  render() {
    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;
    if(!this.state.safetyData){
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
            <Button
              transparent
              onPress={() => navigation.dispatch(NavigationActions.back())}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{t("site_safety:title")}</Title>
          </Body>
          <Right />
        </Header>

        {this.state.safetyData == null ? (
          <Text>{JSON.stringify(this.state.safetyData)}</Text>
        ) : (
          <View style={{ flex: 1,backgroundColor:'#eeeeee' }}>
            <CardStack
              style={styles.content}
              renderNoMoreCards={() => (
                <View style={{justifyContent: "center",
                alignItems: "center"}}>
                <Text
                  style={{ fontWeight: "700", fontSize: 18, color: "gray" }}
                >
                  {t('material_Photo:nomorecard')}
                </Text>
                <Button
            style={styles.customBtnBG}
            onPress={() => this.props.navigation.navigate('ViewAllcontents')}
          >
            <Text style={styles.customBtnText}>{t('swiping_last_slide:button')}</Text>
          </Button>
          <Button
            style={styles.customBtnBG}
            onPress={() => this.props.navigation.navigate('HomeScreen')}
          >
            <Text style={styles.customBtnText}>{t('material_Photo:homback')} </Text>
          </Button>
                </View>
              )}
              ref={swiper => {
                this.swiper = swiper;
              }}
              onSwiped={() => console.log("onSwiped")}
              onSwipedLeft={() => console.log("onSwipedLeft")}
            >
              {this.state.safetyData.map((item, index) => {
                console.log("accc datae" + item.id);
                return (
                  <Card style={[styles.card, styles.card1]}>
                    <View>
                      <Text style={styles.label}>
                         {this.state.currentLanguage == "en"
                          ? item.description
                          : item.description_phi} 
                      </Text>
                      <View>
                      <Image style={{width:'100%',height:320}} source={{uri:`http://phlapp.drcmp.org/uploads/galleries_images/${item.image}`}}/>
                      </View>
                      
                      
                     
                      {/* <Text style={styles.label2}>
                        {this.state.currentLanguage == "en"
                          ? item.image
                          : item.description_idn}
                      </Text> */}
                    </View>
                  </Card>
                );
              })}
            </CardStack>
            <View style={{alignItems:'center'}}>
                      <Text style={{marginBottom:10,marginLeft:20}}>{t('swiping_last_slide:swipingtext')}</Text>
                  </View>
           
          </View>
        )}
      </Container>
    );

  }
}
export default withNamespaces(["site_safety", "common"], { wait: true })(
  SafetyList
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f2f2f2"
  },
  content: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  customBtnBGRAt1: {
    backgroundColor: "#6383a8",
    // borderWidth:2,
    // color:'#000',
     position:'absolute',
    bottom:20,
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
  customBtnBG: {
    backgroundColor: "#6383a8",
    paddingHorizontal: 30,
    paddingVertical: 5,
    marginTop:20,
    marginLeft:20,
    borderRadius: 10,
    width:300,
    },
  card: {
    width: 320,
    height: 350,
     backgroundColor: "#6383a8",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5
  },
  card1: {
     backgroundColor: "#6383a8"
  },
  card2: {
    backgroundColor: "#FEB12C"
  },
  label: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 15,
    fontFamily: "System",
    color: "#ffffff",
    backgroundColor: "transparent"
  },
  label2: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 12,
    fontFamily: "System",
    color: "#ffffff",
    backgroundColor: "transparent"
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    width: 220,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0
  },
  orange: {
    width: 55,
    height: 55,
    borderWidth: 6,
    borderColor: "rgb(246,190,66)",
    borderWidth: 4,
    borderRadius: 55,
    marginTop: -15
  },
  green: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 75,
    borderWidth: 6,
    borderColor: "#01df8a"
  },
  red: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 75,
    borderWidth: 6,
    borderColor: "#fd267d"
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
});
