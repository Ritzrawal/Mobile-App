import React, { Component } from 'react';
import { Image,TouchableOpacity,StyleSheet,Text, AsyncStorage,ScrollView,ActivityIndicator } from 'react-native';
import {NavigationActions} from "react-navigation";
import { storage } from "../../App";
import { withNamespaces } from "react-i18next";
import { Container, Header, Content, Card, CardItem, Title, Right, Button, Icon, Left, Body, View} from 'native-base';
export  class MaterialFirst extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
      });
      constructor(props) {
        super(props);
    
        this.state = {
          safetyData:null,
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
            key: "materialfirst",
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
    
          async materialfirst(params) {
            return (
              fetch("http://phlapp.drcmp.org/api/getmaterialshousecategory", {
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
                        key: "materialfirst",
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
                 <Icon style={{color:'#fff'}}size={15} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{t('material_quality:back')}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View>
          <Card style={styles.cardvew1}>
          <ScrollView >
          
          {this.state.safetyData.map((item, key)=>{
              return (
                <View>
                  <CardItem key={key}>
                      <Body>
    <TouchableOpacity
  
  onPress={() => this.props.navigation.navigate("MaterialLastScreen",{id:item.id})}
>
      <Image source={{uri:`http://phlapp.drcmp.org/uploads/house_category_image/${item.image}`}}
       style={{height: 210, width:320}}/>
       </TouchableOpacity>
    </Body>
  </CardItem>
  
  <CardItem footer bordered style={{justifyContent:'center',alignItems:'center'}}>
    <Text style={{color:'#000000'}}>
    {this.state.currentLanguage == "en"
                          ? item.title
                          : item.title_phi} 
    </Text>
  </CardItem> 
  </View>
  
                  
              )
          })
      }
  </ScrollView>
           
          </Card>
         </View>
         {/* <View>
          <Card style={styles.cardvew}>
         
          <ScrollView  horizontal={true}>
                    {this.state.safetyData.map((item, key)=>{
                        return (
                          <View>
                            
                            <CardItem key={key}>
                                <Body>
              <TouchableOpacity
            
            onPress={() => this.props.navigation.navigate("MaterlialLast")}
          >
                <Image source={{uri:`http://phlapp.drcmp.org/uploads/galleries_images/${item.image}`}}
                 style={{height: 210, width:320}}/>
                 </TouchableOpacity>
              </Body>
            </CardItem>
          
            
            <CardItem footer bordered style={{justifyContent:'center',alignItems:'center'}}>
              <Text style={{color:'#000000'}}>Material Storage</Text>
            </CardItem> 
            </View>
            
                            
                        )
                    })
                }
                  </ScrollView>
           
          
          </Card>
        
          </View> */}
        </Content>
        
      </Container>
    );
  }
}
export default withNamespaces(["material_quality", "common"], { wait: true })(
  MaterialFirst
);
const styles=StyleSheet.create({
    cardvew:{
        width:"100%",
        // height:270,
        // marginLeft:20,
        marginTop:5,
        
        // justifyContent:'center',
        // alignItems:'center',

    },
    indicator: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 80
    },
    cardvew1:{
        width:"100%",
        // height:270,
        // marginLeft:20,
        marginTop:5,

    }

})