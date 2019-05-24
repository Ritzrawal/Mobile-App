import React, { Component } from 'react';
import { Image,TouchableOpacity,StyleSheet,Text, AsyncStorage,ScrollView } from 'react-native';
import {NavigationActions} from "react-navigation";
import { storage } from "../../App";
import { withNamespaces } from "react-i18next";
import { Container, Header, Content, Card, CardItem, Title, Right, Button, Icon, Left, Body, View} from 'native-base';
import Item from '../theme/components/Item';
export  class StrengthViewAllgetNo extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
      });
      constructor(props) {
        super(props);
        const { navigation } = this.props;
        const { navigate } = this.props.navigation;
        const {params} = this.props.navigation.state
        const id = navigation.getParam('id');
        this.state = {
          safetyData: [],
          acc: [],
          isReady: true,
          currentLanguage: "",
          cards: [],
          curId:id,
        };
    
        // this.getData2();
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
              fetch("http://phlapp.drcmp.org/api/title", {
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
                        data: responseData.titles
    
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
                            faqsData: responseData.titles
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
            <Title>{t('strengthfirst:back')}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View>
        {this.state.faqsData == null ? (
          <Text>{JSON.stringify(this.state.faqsData)}</Text>
        ):
          this.state.faqsData.map((item, index) => {
            return(
          <View style={{alignItems: "center",height:'100%'}}>
          <View style={{backgroundColor:"#6383a8",height:420,marginTop:25,width:'90%', alignItems: "center",justifyContent:'center',}}>
            <Text style={{fontSize:35,color:'#fff'}}>
            {item.title}
            </Text>
     
      
         </View>
         <View>
         <Button
            style={styles.customBtn}
            onPress={() => this.props.navigation.navigate('StrngthFirstSlide')}
          >
            <Text style={styles.textitems}>{t('strengthfirst:title')}</Text>
          </Button>
         </View>
         </View>
            )
          })
           
        
        }
        </View>
        </Content>
        
      </Container>
    );
  }
}
 export default withNamespaces(["strengthfirst", "common"], { wait: true })(
     StrengthViewAllgetNo
 );
const styles=StyleSheet.create({
    cardvew:{
        width:"100%",
         height:"100%",
        // marginLeft:20,
        marginTop:5,
        
        justifyContent:'center',
        alignItems:'center',

    },
    customBtn: {
      backgroundColor: "#9ec54d",
      // paddingHorizontal: 30,
      marginTop:20,
      // position:'absolute',
      // bottom:30,
      // paddingVertical: 5,
      // flexDirection: "row",
       justifyContent: "center",
       alignItems: "center",
      borderRadius: 5,
      // marginTop: 250,
      width:320
    },

    textitems:{
    fontSize:25,
    color:'#fff',
        // marginLeft:20,
        // marginBottom:10,
    justifyContent: "center",
    alignItems: "center"
    
      },
    cardvew1:{
        width:"100%",
        height:"100%",
        // marginLeft:20,
        marginTop:5,

    }

})