import React from "react";
import {
  AppRegistry,
  Alert,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  AsyncStorage,
  Linking,
  PermissionsAndroid
} from "react-native";

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Accordion,
  Icon,
  Title,
  Card,
  CardItem
} from "native-base";


import { storage } from "../../App";
// import Placeholder from "rn-placeholder";
import { NavigationActions } from "react-navigation";
import { withNamespaces } from "react-i18next";
import RNFetchBlob from "rn-fetch-blob";
// import RNFS from "react-native-fs";
 import NoData from "./nodata"
export class FinancialRecordList extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      documentData: [],
      acc: [],
      isReady: true,
      currentLanguage:'',
      cardInfoSwitch:0
    };

  }
  static navigationOptions = ({ navigation }) => ({
    header: null

  });
  getData() {
    var _this = this;

    storage
      .load({
        key: "document",
        autoSync: true,
        syncInBackground: true
      })
      .then(res => {
        console.log("res data");
        console.log("Resdata" + JSON.stringify(res));
        //    if (this._isMounted) {
        //   console.log("is mounted"+ this._isMounted);

        this.setState({
          documentData: res,
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

      async document(params) {
        return (
          fetch("http://phlapp.drcmp.org/api/documents", {
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
              if (responseData.length !=0) {
   

                storage
                  .save({
                    key: "document",
                    //id,
                    data: responseData.documents

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
                        documentData: responseData.documents
                      },
                      console.log(
                        "RESPONSE DATA FROM SYNC" +
                          JSON.stringify(_this.state.documentData)
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
              else{
                _this.setState({
                  cardInfoSwitch:1
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


  permission = async (title,url) => {
    const fileurl=`http://phlapp.drcmp.org/uploads/doc/${url}`;

    const filename=title;

    const { config, fs } = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir;

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Permission granted");



           
      

            RNFetchBlob
            .config({
              // add this option that makes response data to be stored as a file,
              // this is much more performant.
              fileCache : true,
              addAndroidDownloads : {
                useDownloadManager : true,
                notification : true,
                path: fs.dirs.DownloadDir +'/'+ downloads + '/' + filename + '.pdf',
              }
            })
            .fetch('GET', fileurl, {
              //some headers ..
            })
            .then((res) => {
              // the temp file path
              console.log('The file saved to ', res.path())
            })


        } else {
            console.log('Permission denied');
        }
        } catch (err) {
            console.warn(err);
        }

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

  componentWillMount(){
    AsyncStorage.getItem("language").then((value) => {
      if(value==null){
        console.log("Value"+value);
        this.setState({currentLanguage: 'en'});
      }
      else{
        this.setState({currentLanguage: value});
      }
  
  })
  .then(res => {
      //do something else
  });
  }
  makeDowload(){
    this.props.navigation.navigate("Download");
  
  }
  render() {
    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;
    return (
      <Container>
              <Header style={{backgroundColor:'#9ec54d'}}> 
      <Left>
      <Button transparent onPress={() => navigation.dispatch(NavigationActions.back())}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>{t('documents:reference')}</Title>
      </Body>
      <Right />
    </Header>








{
  this.state.cardInfoSwitch==1?
  
  <NoData navigation={navigation}/>
  :
  this.state.documentData == null ? (
    <Text>{JSON.stringify(this.state.documentData)}</Text>
  ):

 (
  <Content>

<TouchableOpacity
   onPress={() => {
     this.props.navigation.navigate("FinancialRecordOffline");
  }}


>
<Content padder>
<CardItem padder bordered>
              <Icon active name="logo-googleplus" />
              <Text>{t("documents:download")}</Text>
              {/* <Right>
                <Icon name="arrow-forward" />
              </Right> */}
             </CardItem>
</Content>



</TouchableOpacity>






  <View >
  
      <List style={{marginLeft:5,marginRight:5}}
            dataArray={this.state.documentData}
            renderRow={item => (
              <View>
                 {item.id%2==0?(
              <ListItem style={{marginTop:20,borderWidth:2,backgroundColor:'#4682b4'}}
              thumbnail
              onPress={() => {
  
                Linking.openURL(
                  `http://phlapp.drcmp.org/uploads/doc/${
                    item.url
                  }`
                )
  
  
  
               
              }}
            >
              {/* <Thumbnail
                source={require("../../assets/icons/document.png")}
              />
   */}
              <Body>
         
         
                <Text note numberOfLines={3} style={styles.titletext}>
               {
  this.state.currentLanguage=='en'?item.title:item.title_idn
  
               } 
             
                </Text>
              </Body>
              <Button
                transparent
                onPress={() => {
                //  this.makeDowload();
                   this.permission(item.title,item.url);
                }}
              >
                <Text style={{color:'#fff'}}>{t("documents:download")}</Text>
              </Button>
            </ListItem>
                 ):(
                  <ListItem style={{marginTop:20,borderWidth:2,backgroundColor:'#fff'}}
                  thumbnail
                  onPress={() => {
      
                    Linking.openURL(
                      `http://phlapp.drcmp.org/uploads/doc/${
                        item.url
                      }`
                    )
      
      
      
                   
                  }}
                >
                  {/* <Thumbnail
                    source={require("../../assets/icons/document.png")}
                  />
       */}
                  <Body>
             
             
                    <Text note numberOfLines={2} style={styles.titletext2}>
                   {
      this.state.currentLanguage=='en'?item.title:item.title_idn
      
                   } 
                 
                    </Text>
                  </Body>
                  <Button
                    transparent
                    onPress={() => {
                    //  this.makeDowload();
                       this.permission(item.title,item.url);
                    }}
                  >
                    <Text style={{color:'#000'}}>{t("documents:download")}</Text>
                  </Button>
                </ListItem>
                 )}
  
            </View>
              
            )}
          />
  
  
      
  
      
        </View>
  
  </Content>
 )
       

}



 
     
      </Container>
    );
  }
}
export default withNamespaces(['documents', 'common'], { wait: true })(FinancialRecordList);
const styles=StyleSheet.create({
  titletext:{
    fontSize:15,
    color:'#ffffff'
  },
  titletext2:{
    fontSize:15,
    color:'#000000',
  }
})