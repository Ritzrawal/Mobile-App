import React, { Component } from 'react';
import { Image,TouchableOpacity,StyleSheet,AsyncStorage } from 'react-native';
import {NavigationActions} from "react-navigation";
import { storage } from "../../App";
import { Container, Header,Button, View,Right,Title, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
import Item from '../theme/components/Item';
const cards = [
  {
    text: 'Card One',
    name: 'One',
    image:'`http://phlapp.drcmp.org/uploads/galleries_images/${item.image}`',
  },
  {
    text: 'Card two',
    name: 'two',
    image:'`http://phlapp.drcmp.org/uploads/galleries_images/`',
  },
  
];
export default class Materialsecond extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  constructor(props) {
    super(props);

    this.state = {
      safetyData: [],
      acc: [],
      isReady: true,
      currentLanguage: "",
      cards: [

      ]
    };
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
          fetch("http://phlapp.drcmp.org/api/getmaterialshousegoodimages", {
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
    return (
      <Container>
         <Header>
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
        <View>
          <DeckSwiper
             looping={false}
            dataSource={cards}
            renderEmpty=   { ()=>
              <View style={{marginTop:200}}>
              <Text style={{marginLeft:120}}>No More cards</Text> 
              
              <Button
            style={styles.customBtnBG}
            onPress={() => this.props.navigation.navigate('MaterialFirst')}
          >
            <Text style={styles.customBtnText}>Back to Materials Quality & Storages </Text>
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
              <Text>{Item.title}</Text>
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
                  <Image style={{ height: 200, flex: 1 }} source={{uri:`http://phlapp.drcmp.org/uploads/house_images/${item.image}`}} />
                </CardItem>
                <CardItem footer bordered style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#000000'}}>Good Photos</Text>
            </CardItem>
                {/* <CardItem header bordered>
              <Text>NativeBase</Text>
            </CardItem> */}
                <CardItem cardBody style={{marginTop:10}}> 
                  <Image style={{ height: 200, flex: 1 }} source={{uri:`http://phlapp.drcmp.org/uploads/house_images/${item.image}`}}
                  
                  />
                 
                </CardItem >
                <CardItem style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#000000'}}>Bad Photos</Text>
            </CardItem>
                {/* <CardItem>
                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
                  <Text>{item.name}</Text>
                </CardItem> */}
              </Card>
              
            }
          />
         
        </View>
        {/* <View style={styles.footer}>
        <Text>Swipe for the next side</Text>
          <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={styles.customBtnDNG}
            onPress={() => this.props.navigation.navigate("LastSlide")}
          >
         
            <Text style={styles.customBtnText}>
               VIEW ALL
            </Text>
          </TouchableOpacity>
        </View>
        </View> */}
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