import React, { Component } from 'react';
import { Image,TouchableOpacity,StyleSheet,AsyncStorage,View,Text,ScrollView} from 'react-native';
import { storage } from "../../App";
import {NavigationActions} from "react-navigation";
const cards=[{
  id:'1',name:'Hello',
  image:{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpSavzV7Aa26DCmrLkv_YgmAalSELYpFwQf18Bdby-UboAy3WF'},
}]
import { Container, Header, Content, Card, CardItem, Title, Right, Button, Icon, Left, Body, Item} from 'native-base';
export default class StrengthFirst extends Component {
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
          fetch("http://phlapp.drcmp.org/api/gallery", {
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
  // componentDidMount(){
  //   this.setState({
  //     items:[
  //       {id:'1',name:'card one ',
  //       image:{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpSavzV7Aa26DCmrLkv_YgmAalSELYpFwQf18Bdby-UboAy3WF'},

  //       }
  //     ]
  //   })
  // }
   
    static navigationOptions = ({ navigation }) => ({
        header: null
      });


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
        <Content>
          <Card style={styles.cardvew1}>
          <ScrollView  horizontal={true}>
          {this.state.safetyData.map((item, key)=>{
              return (
                <View>
                  <CardItem key={key}>
                      <Body>
    <TouchableOpacity
  
  onPress={() => this.props.navigation.navigate("StrengthSecond")}
>
      <Image source={{uri:`http://phlapp.drcmp.org/uploads/galleries_images/${item.image}`}}
      style={{height: 200, width: 320,flex:1}}/>
       </TouchableOpacity>
    </Body>
  </CardItem>
  
  <CardItem footer bordered style={{justifyContent:'center',alignItems:'center'}}>
    <Text style={{color:'#000000'}}>Material Quality</Text>
  </CardItem> 
  </View>
  
                  
              )
          })
      }
      </ScrollView>
            </Card>
            <Card style={styles.cardvew}>
            <ScrollView horizontal={true}>
          {this.state.safetyData.map((item, key)=>{
              return (
                <View>
                  <CardItem key={key}>
                      <Body>
    <TouchableOpacity
  
  onPress={() => this.props.navigation.navigate("StrengthSecond")}
>
      <Image source={{uri:`http://phlapp.drcmp.org/uploads/galleries_images/${item.image}`}}
      style={{height: 200, width: 320,flex:1}}/>
       </TouchableOpacity>
    </Body>
  </CardItem>
  
  <CardItem footer bordered style={{justifyContent:'center',alignItems:'center'}}>
    <Text style={{color:'#000000'}}>Material Quality</Text>
  </CardItem> 
  </View>
  
                  
              )
          })
      }
      </ScrollView>
            </Card>
            <Card style={styles.cardvew}>
            <ScrollView horizontal={true}>
          {this.state.safetyData.map((item, key)=>{
              return (
                <View>
                  <CardItem key={key}>
                      <Body>
    <TouchableOpacity
  
  onPress={() => this.props.navigation.navigate("StrengthContainer")}
>
      <Image source={{uri:`http://phlapp.drcmp.org/uploads/galleries_images/${item.image}`}}
      style={{height: 200, width: 320,flex:1}}/>
       </TouchableOpacity>
    </Body>
  </CardItem>
  
  <CardItem footer bordered style={{justifyContent:'center',alignItems:'center'}}>
    <Text style={{color:'#000000'}}>Material Quality</Text>
  </CardItem> 
  </View>
  
                  
              )
          })
      }
      </ScrollView>
            </Card>
            
            
          {/* <Card style={styles.cardvew}>
            <CardItem>
              <Body>
              <TouchableOpacity
            
            onPress={() => this.props.navigation.navigate("StrengthSecond")}
          >
                <Image source={{uri:`http://phlapp.drcmp.org/uploads/galleries_images/${item.image}`}}
                 style={{height: 200, width: 320,flex:1}}/>
                 </TouchableOpacity>
              </Body>
            </CardItem>
           
          </Card>
          <Card  style={styles.cardvew}>
            <CardItem>
              <Body>
              <TouchableOpacity
            
            onPress={() => this.props.navigation.navigate("StrengthSecond")}
          >
                <Image source={{uri:`http://phlapp.drcmp.org/uploads/galleries_images/${item.image}`}}
                style={{height:200, width:320,flex:1}}/>
                  </TouchableOpacity>
              </Body>
            </CardItem>
           
          </Card> */}
        </Content>
      </Container>
    );
  }
}
const styles=StyleSheet.create({
    cardvew:{
        // width:"90%",
        height:170,
        // marginLeft:20,
        marginTop:5,
        
        // justifyContent:'center',
        // alignItems:'center',

    },
    cardvew1:{
        // width:"90%",
        height:170,
        // marginLeft:20,
        marginTop:20,

    }

})