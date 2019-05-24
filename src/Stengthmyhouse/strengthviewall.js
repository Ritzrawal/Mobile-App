import React, { Component } from 'react';
import { Image,TouchableOpacity,StyleSheet,Text, AsyncStorage,ScrollView } from 'react-native';
 import {NavigationActions} from "react-navigation";
import { createStackNavigator } from 'react-navigation';
import { storage } from "../../App";
import { withNamespaces } from "react-i18next";
import { Container, Header, Content, Card, CardItem, Title, Right, Button, Icon, Left, Body, View} from 'native-base';
export class StrengthViewAll extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
      });
      constructor(props) {
        super(props);
        this.newScore=0;
        // const { navigation } = this.props;
        // const { navigate } = this.props.navigation;
        // const {params} = this.props.navigation.state
        // const id = navigation.getParam('id');
        this.state = {
          safetyData: [],
          acc: [],
          isReady: true,
          currentLanguage: "",
          cards: [],
        
        };
    
        // this.getData2();
      }
      getData() {
        var _this = this;
    
        storage
          .load({
            key: "yesimages",
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
              
                break;
              case "ExpiredError":
              
                break;
            }
          });
    
        storage.sync = {
          // The name of the sync method must be the same as the data's key name
          // And the passed params will be an all-in-one object.
          // You can return a value or a promise here
    
          async yesimages(params) {
            return (
              fetch("http://phlapp.drcmp.org/api/getyesnoimages/",{
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
                        key: "yesimages",
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
//       renderItem =()=>{
//         return(
//         <View>
//  <Card style={styles.cardvew1}>
//             <CardItem >
//               <Body>
//               <TouchableOpacity
            
//             onPress={() => this.props.navigation.navigate("MaterlialLast")}
//           >
//                 <Image source={{uri:`http://phlapp.drcmp.org/uploads/galleries_images/${item.image}`}}
//                  style={{height: 210, width:320}}/>
//                  </TouchableOpacity>
//               </Body>
              
//             </CardItem>
//             <CardItem footer bordered style={{justifyContent:'center',alignItems:'center'}}>
//               <Text style={{color:'#000000'}}>Material Quality</Text>
//             </CardItem>
           
//           </Card>
          
//         </View>
//         )
//       }
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
    const {t, navigation } = this.props;
     const { navigate } = navigation;
    const item=this.state.safetyData;
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
            <Title>{t('viewall:title')}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View>
            {/* <Text>{this.props.navigation.state.params.NameOBJ}</Text>
            <Text>{this.props.navigation.state.params.NumberOBJ}</Text> */}
          {this.state.safetyData == null ? (
          <Text>{JSON.stringify(this.state.safetyData)}</Text>
        ):(
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize:30,color:'#000',marginTop:50}}>Score</Text>
            {/* <Text>{JSON.stringify(item.total_images)}</Text> */}
            <Text>hello{this.newScore}</Text>
            <Text style={{color:'#000000',fontSize: 60,marginTop:50}}>
                    {this.state.currentLanguage == "en"
                          ?((item.total_yes_image/item.total_images)*100).toFixed(2)
                          : ((item.total_yes_image/item.total_images)*100).toFixed(2)} 

                    </Text>

      <View>
      <TouchableOpacity
            style={styles.customBtnLower}
             onPress={(id ) => this.props.navigation.navigate("StrengthTechnique")}
          >
         
            <Text style={styles.customBtnText}>Go to Strengthning Technique
         
            </Text>
          </TouchableOpacity>
      </View>

           
  </View>
        )
    }
         </View>
         <View>
         
        
          </View>
        </Content>
        
      </Container>
    );
  }
}
export default withNamespaces(["viewall", "common"], { wait: true })(
  StrengthViewAll
);
const styles=StyleSheet.create({
    cardvew:{
        width:"100%",
         height:"100%",
        // marginLeft:20,
        marginTop:300,
        
        justifyContent:'center',
        alignItems:'center',

    },
    cardvew1:{
        width:"100%", 
        height:"100%",
        // marginLeft:20,
        marginTop:5,

    },
    customBtnLower: {
      backgroundColor: "#9ec54d",
      paddingHorizontal: 30,
      // position:'absolute',
      // bottom:30,
      paddingVertical: 5,
      flexDirection: "row",
       justifyContent: "center",
       alignItems: "center",
      borderRadius: 5,
      marginTop: 250,
      width: "90%"
    },
    customBtnText: {
      fontSize: 20,
      fontWeight: "300",
      alignItems: "center",
      justifyContent: "center",
  
      color: "#fff"
    },

})