import React, { Component } from "react";
import { StyleSheet, View, Text,TouchableOpacity,AsyncStorage ,ActivityIndicator,Alert} from 'react-native';
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
import { withNamespaces } from "react-i18next";
export  class StrengthSecond extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  constructor (props) {
    super(props)
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    const {params} = this.props.navigation.state
    const id = navigation.getParam('id');
    this.state = {
      items: [],
      dataSource:[],
      safetyData: null,
      isReady: true,
      currentLanguage: "",
      cards: [],
      curId:id
      
    }
  }

SampleFunction(StringHolder){
 
    // Alert.alert(StringHolder,'working on it');
 
  }
  getData() {
    var _this = this;

    storage
      .load({
        key: "satrengthsecond",
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

      async satrengthsecond(params) {
        return (
          fetch("http://phlapp.drcmp.org/api/getstrengthenhouseparts/"+_this.state.curId, {
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
                    key: "satrengthsecond",
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
    const id= navigation.getParam('id', id); 
    // const items = [{ id: 1, name: "IMAGES", code: "#ffe4c4" }];
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
                 <Icon style={{color:'#fff'}}size={15} name="arrow-left" />
            </Button>
          </Left>
          <Body>
            <Title>{t('parts_of_house:back')}</Title>
          </Body>
          <Right />
        </Header>
        {this.state.safetyData==!null?(<Text>Hello</Text>):(
         

      <View style={styles.mainContainer}>
      <View style={{alignItems:'center',marginBottom:20}}>
         <Text style={{fontSize:25,color:'#000000'}}>{t('parts_of_house:headersim')}</Text>
       </View>
     {this.state.safetyData.map((item,index)=>{
        return(
          
          <View>
           
      {/* <View style={styles.heading}>
          <Text style={{fontSize:25,color:'#000'}}>PARTS OF HOUSE</Text>
        </View> */}
        <View style={styles.lowerontainer}>
       
       {index%2==0?(
         
          <TouchableOpacity
            style={styles.customBtnBGRAtC}
             onPress={() => this.props.navigation.navigate("StartStrengthLast",{id:item.id})}
             
          >
          {/* <Icon style={{justifyContent:"flex-start",color:'#fff',paddingRight:20}}size={30}name='object-group' /> */}
            <Text style={styles.customBtnText}>
            {this.state.currentLanguage == "en"
                          ? item.title
                          : item.title_phi} 
            </Text>
          </TouchableOpacity>
       )
       :(
          <TouchableOpacity
            style={styles.customBtnBGRAt}
             onPress={() => this.props.navigation.navigate("StartStrengthLast",{id:item.id})}
          >
            <Text style={styles.customBtnText1}>
            {this.state.currentLanguage == "en"
                          ? item.title
                          : item.title_phi} 
            </Text>
          </TouchableOpacity>
       )
       }
         
      
        </View>
        </View>
        )
      }
        )}
{/* <View style={{alignItems:'center'}}>
<TouchableOpacity
            style={styles.customBtnBGRAt2}
             onPress={(id ) => this.props.navigation.navigate("StartStrengthLast")}
            // onPress={()=>this.SampleFunction()}
          >
         
            <Text style={styles.customBtnText}>{t('parts_of_house:startstrength')}
           
            </Text>
          </TouchableOpacity>
          </View> */}

      </View>
        )}
      </Container>
    );
  }
}
export default withNamespaces(["parts_of_house","common"], { wait: true })(
  StrengthSecond
);
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
  // mainContainer:{
  //   backgroundColor: "#4682b4",
  //   width:'90%',
  //   borderWidth:2,
    

  // },
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
    marginTop: 50,
    width: "90%"
  },
  customBtnBG: {
    backgroundColor: "#6383a8",
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 5,
    flexDirection: "row",
     justifyContent: "center",
     alignItems: "center",
    borderRadius: 5,
    marginTop: 60,
    width: "90%"
  },
  customBtnBGRAt: {
    // backgroundColor: "#fff",
    // borderWidth:2,
    // color:'#fff',
    paddingHorizontal: 30,
    borderWidth:2,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 5,
     width: "90%"
  },
  customBtnBGRAt2: {
    backgroundColor: "#9ec54d",
    // borderWidth:2,
    // color:'#000',
     position:'absolute',
    //  top:70,
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
  customBtnBGRAtC: {
    backgroundColor: "#6383a8",
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
    // justifyContent:'center',
    // position:"relative",
    // flexDirection: "column",
  },
  iconName:{
    justifyContent:"flex-start",
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
});
