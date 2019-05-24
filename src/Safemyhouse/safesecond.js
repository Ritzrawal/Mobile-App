import React, { Component } from 'react';
import { Image,TouchableOpacity,StyleSheet,AsyncStorage } from 'react-native';
import {NavigationActions} from "react-navigation";
import { storage } from "../../App";
import { Container, Header,Button, View,Right,Title, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
import { translate } from 'react-i18next';
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
export default class SafeHouseSecond extends Component {
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
    return (
      <Container >
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
        <View >
         {/* <Text style={{marginLeft:130}}>Swap left-Right</Text> */}
        <View >
          <DeckSwiper
             looping={false}
             dataSource={this.state.safetyData}
            renderEmpty={()=><Text style={{marginLeft:120}}>No More cards</Text> }
            
            renderItem={item =>
              <Card style={styles.cardviews}>
                {/* <CardItem>
                  <Left>
                    <Thumbnail source={item.image} />
                    <Body>
                      <Text>{item.text}</Text>
                     
                    </Body>
                  </Left>
                </CardItem> */}
                <CardItem cardBody>
                {/* <TouchableOpacity
            
            onPress={() => this.props.navigation.navigate("Materialsecond")}
          > */}
                  <Image style={{ height: 230, flex: 1 }} source={{uri:`http://phlapp.drcmp.org/uploads/galleries_images/${item.image}`}}/>
                  {/* </TouchableOpacity> */}
                </CardItem>
                <Text style={{marginLeft:120}}>Good Phots</Text> 
                {/* <CardItem>
                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
                  <Text>{item.name}</Text>
                </CardItem> */}
              </Card>
              
            }
          />
         
        </View>
        <View style={{marginTop:280,justifyContent:'center',flex:1}}>
        <DeckSwiper
           looping={false}
            dataSource={cards}
            renderEmpty={ ()=>
            <View>
            <Text style={{marginLeft:120}}>No More cards</Text> 
            
            <Button
          style={styles.customBtnBG}
          onPress={() => this.props.navigation.navigate('SafeHouseFirst')}
        >
          <Text style={styles.customBtnText}>Back to Parts of House </Text>
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
              <Card style={styles.cardviews}>
               <CardItem cardBody>
                  <Image style={{ height: 230, flex: 1 }} source={{uri:`http://phlapp.drcmp.org/uploads/galleries_images/${item.image}`}}/>
                </CardItem>
                 <Text style={{marginLeft:120}}>Bad Phots</Text> 
           
              </Card>
            }
            />
           

            
        </View>
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
  customBtnText: {
    fontSize: 15,
    fontWeight: '300',
    alignItems: "center",
  

    color: "#fff",
},
  footer:{
    flex: 2,
    marginTop:300,
    justifyContent: "center",
    alignItems: "center"

  },
  customBtnBG: {
    backgroundColor: "#27ae60",
    paddingHorizontal: 30,
    paddingVertical: 5,
    marginTop:20,
    marginLeft:20,
    borderRadius: 10,
    width:'90%',
    },
  buttonContainer: {
    width: 220,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardviews:{
    width:"90%",
    height:250,
    marginLeft:20,
    marginTop:10,
  }
})