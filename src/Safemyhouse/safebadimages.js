import React, { Component } from "react";
import { StyleSheet, View, Text,TouchableOpacity,AsyncStorage,Image } from 'react-native';
import {
  Container,
  Header,
  Button,
  //  Icon,
  Left,
  Body,
  Title,
  Right
} from "native-base";
import { storage } from "../../App";
import { SuperGridSectionList } from "react-native-super-grid";
import { NavigationActions } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';
import Item from "../theme/components/Item";
export default class SafeHouseBadImages extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  constructor (props) {
    super(props)
    this.state = {
      items: [],
      dataSource:[],
      safetyData: [],
      isReady: true,
      currentLanguage: "",
      cards: []
      
    }
  }
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
    // const { t, i18n, navigation } = this.props;
    // const { navigate } = navigation;
    // const items = [{ id: 1, name: "IMAGES", code: "#ffe4c4" }];
    return (
      <Container>
        {/* <Header>
          <Left>
            <Button
              transparent
              onPress={() => navigation.dispatch(NavigationActions.back())}
            >
                 <Icon style={{color:'#fff'}}size={15} name="arrow-left" />
            </Button>
          </Left>
          <Body>
            <Title>BACK</Title>
          </Body>
          <Right />
        </Header> */}
        {this.state.safetyData==!null?(<Text>Hello</Text>):(
         

      <View style={styles.mainContainer}>
      {/* <View style={{alignItems:'center'}}>
       <Text style={{fontSize:25,color:'#000000'}}> PARTS OF HOUSE</Text>
       </View> */}
      {this.state.safetyData.map((item,index)=>{
        return(
          
          <View>
           
      {/* <View style={styles.heading}>
          <Text style={{fontSize:25,color:'#000'}}>PARTS OF HOUSE</Text>
        </View> */}
         
    
                      <Image style={{width:'100%',height:220,marginTop:10}} source={{uri:`http://phlapp.drcmp.org/uploads/house_images/${item.image}`}}/>
                      
                      
                      
        </View>
        )
      }
        )}
      </View>
        )}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  lowerontainer: {
    // marginTop: 40,
    marginBottom: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    // position:"absolute"
  },
  heading:{
    fontSize: 25,
    marginTop:20,
 justifyContent:'center',
 alignItems:"center",
//  color: "#fff",
 fontWeight: "600"
  },
  gridView: {
    flex: 1,
    // marginTop: 20,
    width: "100%",
    height: "100%"
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch"
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 5,
     height:300,
    width: 320
  },
  itemName: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "600"
  },
  upperContainer: {
    width: "100%",
     height: "35%",
     marginTop:10,
    // paddingBottom: 100,
    alignItems: "center",
    justifyContent: "center",
    // position:"absolute"
  },
  customBtnText: {
    fontSize: 25,
    fontWeight: "300",
    alignItems: "center",
    justifyContent: "center",

    color: "#fff"
  },
  customBtnText1: {
    fontSize: 25,
    fontWeight: "300",
    alignItems: "center",
    justifyContent: "center",

    color: "#000"
  },
  
  customBtnDNG: {
    backgroundColor: "#4682b4",
    paddingHorizontal: 30,
    paddingVertical: 5,
    flexDirection: "row",
     justifyContent: "center",
     alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
    width: "90%"
  },
  customBtnBG: {
    backgroundColor: "#000080",
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 5,
    flexDirection: "row",
     justifyContent: "center",
     alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
    width: "90%"
  },
  customBtnBGRAt: {
    backgroundColor: "#fff",
    borderWidth:2,
    color:'#000',
    paddingHorizontal: 30,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 5,
    width: "90%"
  },
  customBtnBGRAtC: {
    backgroundColor: "#000999",
    paddingHorizontal: 30,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 5,
    width: "90%"
  },
  mainContainer: {
    width: "100%",
    height: "100%",
    // position:"relative",
    // flexDirection: "column",
  },
  iconName:{
    justifyContent:"flex-start",
  },
});
