import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage
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
// import SafeHouseBadImages from './safebadimages'
import { NavigationActions } from "react-navigation";
import { withNamespaces } from "react-i18next";
import { storage } from "../../App";


export  default class BadImages extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      safetyData: [],
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
            console.log("not found");
            alert("没有找到token");
            break;
          case "ExpiredError":
            alert("token失效");
            break;
        }
      });

    storage.sync = {
      // The name of the sync method must be the same as the data's key name
      // And the passed params will be an all-in-one object.
      // You can return a value or a promise here

      async safety(params) {
        return (
          fetch("http://phlapp.drcmp.org/api/getsafehousebadimages", {
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
   

    return (
      <Container>
        {/* <Header>
          <Left>
            <Button
              transparent
              onPress={() => navigation.dispatch(NavigationActions.back())}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>BACK</Title>
          </Body>
          <Right />
        </Header> */}

        {this.state.safetyData == null ? (
          <Text>{JSON.stringify(this.state.safetyData)}</Text>
        ) : (
          <View style={{ flex: 1 }}>
            <CardStack
              style={styles.content}
        //       renderNoMoreCards={() => (
        //         <View style={{alignItems:'center',justifyContent:'center'}}>
        //         <Text
        //           style={{ fontWeight: "700", fontSize: 18, color: "gray" }}
        //         >
        //           No more cards :(
        //         </Text>
        //         <Button
        //     style={styles.customBtnBG}
        //     onPress={() => this.props.navigation.navigate('SafeHouseFirst')}
        //   >
        //     <Text style={styles.customBtnText}>Back to parts of house </Text>
        //   </Button>
        //   <Button
        //     style={styles.customBtnBG}
        //     onPress={() => this.props.navigation.navigate('HomeScreen')}
        //   >
        //     <Text style={styles.customBtnText}>Back to HOME </Text>
        //   </Button>
        //         </View>
        //       )}
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
                    <View >
                      {/* <View style={{backgroundColor:'#8b0000'}}>
                      <Text style={styles.label}>
                      {this.state.currentLanguage == "en"
                          ? item.description
                          : item.description} 
                      </Text>
                      </View> */}
                      {/* <View style={{borderBottomWidth:2,height:260}}>
                      <Image style={{width:'100%',height:220,marginTop:10}} source={{uri:`http://phlapp.drcmp.org/uploads/house_images/${item.image}`}}/>
                      <View style={{alignItems:'center',color:'#fff'}}>
                      <Text style={{color:'#fff',backgroundColor:'#8b0000',fontSize:20}}>Good photos</Text>
                      </View>
                      </View> */}
                      
                      <View style={{height:250}}>
                 
                      <Image style={{width:'100%',height:220,marginTop:10}} source={{uri:`http://phlapp.drcmp.org/uploads/house_images/${item.image}`}}/>
                      
                      <View style={{alignItems:'center'}}>
                      <Text style={{color:'#fff',backgroundColor:'#8b0000',fontSize:20}}>Bad photos</Text>
                      </View>
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
            {/* <View style={{alignItems:'center'}}>
                      <Text style={{marginBottom:10,marginLeft:20}}>Swipe for the next slide</Text>
                  </View> */}
           
          </View>
        )}
      </Container>
    );

  }
}
// export default withNamespaces(["site_safety", "common"], { wait: true })(
//   SafetyList
// );
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
  customBtnBG: {
    backgroundColor: "#27ae60",
    paddingHorizontal: 30,
    paddingVertical: 5,
    marginTop:20,
    marginLeft:20,
    borderRadius: 10,
    width:300,
    },
  card: {
    width: 320,
    height: 250,
      backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5
  },
  card1: {
     backgroundColor: "#fff"
  },
  card2: {
    backgroundColor: "#FEB12C"
  },
  label: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 15,
    color:"#fff",
    backgroundColor:'#8b0000',
    fontFamily: "System",
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
  }
});
