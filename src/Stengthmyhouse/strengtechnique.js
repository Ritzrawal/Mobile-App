import React, { Component } from 'react';
import { Image,TouchableOpacity,StyleSheet,Text, AsyncStorage,ScrollView } from 'react-native';
import {NavigationActions} from "react-navigation";
import { storage } from "../../App";
import { withNamespaces } from "react-i18next";
import { Container, Header, Content, Card, CardItem, Title, Right, Button, Icon, Left, Body, View} from 'native-base';
export class StrengthTechnique extends Component {
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
          cards: []
        };
    
        // this.getData2();
      }
      getData() {
        var _this = this;
    
        storage
          .load({
            key: "viewall",
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
    
          async viewall(params) {
            return (
              fetch("http://phlapp.drcmp.org/api/getyesnoimages", {
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
                        key: "viewall",
                        //id,
                        data: responseData.images
    
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
                            safetyData: responseData.images
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
    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;
    const id= navigation.getParam('Noid', id); 
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
          {this.state.safetyData == null ? (
          <Text>{JSON.stringify(this.state.safetyData)}</Text>
        ):
        (
          <Card style={styles.cardvew1}>
          <ScrollView >
          
          {this.state.safetyData.map((item, key)=>{
              return (
                <View>
                  
                  <CardItem key={key}>
                  <View style={styles.label}>
                    <Text style={{color:'#fff'}}>{item.description}</Text>
                    </View>
                    </CardItem>
                    <CardItem>
                      <Body>
                        
    <TouchableOpacity
  
 // onPress={() => this.props.navigation.navigate("")}
>
      <Image source={{uri:`http://phlapp.drcmp.org/uploads/house_images/${item.image}`}}
       style={{height: 210, width:320}}/>
       </TouchableOpacity>
    </Body>
  </CardItem>
  <CardItem>
  <View style={{marginTop:20,flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#eeeeee'}}>
  
  {item.image_type==1?(
                    <TouchableOpacity
            style={styles.customBtnDNG}
            // onSwipedLeft={()=>that.swiper.showfunctin()}
            //  onPress={ () => { this.swiper.swipeLeft() }}
          >
            <Text style={styles.customBtnText}>

            {this.state.currentLanguage == "en"
                          ? (
                            item.image_type==1?
                            <Text>YES</Text>
                              :<Text>No</Text>
                              )                      
                        
                          : (
                            item.image_type==1?<Text>YES</Text>
                           
                              :<Text>No</Text>
                              )
                          
 
                          } 
         
            </Text>
          </TouchableOpacity> 
  ):(

          <TouchableOpacity
            style={styles.customBtnDNG1}
            onPress={ () => { that.swiper.swipeRight(),
            console.log('hhhhthat')
            }}
    
            
          >
       
            <Text style={styles.customBtnText}>
            {this.state.currentLanguage == "en"
                          ? (
                            item.image_type==0?
                            <Text>YES</Text>
                              :<Text>No</Text>
                              )                      
                        
                          : (
                            item.image_type==1?<Text>YES</Text>
                           
                              :<Text>No</Text>
                              )
                          
 
                          } 
           
            </Text>
          </TouchableOpacity> 
  )
                        }
  
                    </View> 
  </CardItem>
  
  {/* <CardItem footer bordered style={{justifyContent:'center',alignItems:'center'}}>
    <Text style={{color:'#000000'}}>Material Quality</Text>
  </CardItem>  */}
  </View>
  
                  
              )
          })
      }
  </ScrollView>
           
          </Card>
        )
    }
         </View>
         <View>
         
        
          </View>
        </Content>
        {/* <View  style={{justifyContent: "center",
    alignItems: "center",}}>
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
export default withNamespaces(["viewall", "common"], { wait: true })(
  StrengthTechnique
);
const styles=StyleSheet.create({
    cardvew:{
        width:"100%",
         height:"100%",
        // marginLeft:20,
        marginTop:5,
        
        // justifyContent:'center',
        // alignItems:'center',

    },
    cardvew1:{
        width:"100%",
        height:"100%",
        backgroundColor:'#eeeeee',
        // marginLeft:20,
        marginTop:5,

    },
    label: {
        marginTop: 5,
        textAlign: "center",
        fontSize: 30,
        fontFamily: "System",
        color: "#ffffff",
        // justifyContent:'center',
        alignItems: "center",
        backgroundColor:'#6383a8',
        width:320,
      },
      customBtnBGRAt: {
        backgroundColor: "#6383a8",
        // borderWidth:2,
        // color:'#000',
         position:'absolute',
        bottom:85,
        // paddingHorizontal: 30,
        // paddingVertical: 5,
        // flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
       
        height:45,
        // marginLeft:16,
        
        width: "90%"
      },
      customBtnDNG: {
        backgroundColor: "#9ec54d",
        // paddingHorizontal: 30,
        // paddingVertical: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        //  marginBottom:20,
        width: 150,
        // marginBottom:10,
      },
      customBtnDNG1: {
        backgroundColor: "#BDBDB0",
        // paddingHorizontal: 30,
        // paddingVertical: 5,
        // marginBottom:20,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 5,
        // marginLeft:20,
        width: 150,
        // marginBottom:10,
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

})