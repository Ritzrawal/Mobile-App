import React from "react";
import {
  AppRegistry,
  Alert,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  AsyncStorage,
  Linking,
  PermissionsAndroid,Dimensions
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
import RNFetchBlob from "rn-fetch-blob";
import RNFS from "react-native-fs";
import Pdf from "react-native-pdf";


import Icons from "react-native-vector-icons/FontAwesome";
import { storage } from "../../App";
// import Placeholder from "rn-placeholder";
import { NavigationActions } from "react-navigation";
import { withNamespaces } from "react-i18next";
export class FinancialRecordOffline extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      documentData: [],
      documentData2: [],

      acc: [],
      isReady: true,
      currentLanguage:'',
    };

  }
  static navigationOptions = ({ navigation }) => ({
    header: null

  });

async deleteFile(name){
  const { config, fs } = RNFetchBlob;
const downloads = fs.dirs.DownloadDir;


var path =fs.dirs.DownloadDir +'/'+ downloads + '/' +name;
console.log("Delete path="+path);
return RNFS.unlink(path)
  .then(() => {
    console.log('FILE DELETED');
 this.readFiles();
  })
  // `unlink` will throw an error, if the item to unlink does not exist
  .catch((err) => {
    console.log(err.message);
  });
} 

async openpdf(name){


 
    const { config, fs } = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir;
    console.log("Download path"+downloads);
    try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Permission granted");


   

         
          var path =  fs.dirs.DownloadDir +'/'+ downloads + '/' +name;
  



       //   var path = 'file://' + fs.dirs.DownloadDir +'/'+ downloads + '/' +name;
       

         console.log('open Path='+path);
      
      /*  this.props.navigation.navigate('download',{
          fullpath:this.path
        })*/
        this.props.navigation.navigate('download', {

          fullpath:path,
          SystemCode: 123

      });
      } else {
          console.log('Permission denied');
      }
      } catch (err) {
          console.warn(err);
      }







  }
  async readFiles() {

    const { config, fs } = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir;
    console.log("Download path"+downloads);
    try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Permission granted");



     


        
          
          let files2 = await RNFS.readDir(  fs.dirs.DownloadDir +'/'+ downloads + '/');

    
          console.log("found2:\t" + JSON.stringify(files2));

this.setState({
  documentData2:files2
});

  
        

      } else {
          console.log('Permission denied');
      }
      } catch (err) {
          console.warn(err);
      }







  }
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
              if (responseData) {
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
        this.readFiles();
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
    this.props.navigation.navigate("download");
  
  }
  render() {
    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;

    const { config, fs } = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir;
    const path=fs.dirs.DownloadDir +'/'+ downloads + '/' +'dadsads.pdf';

    return (
      <Container>
              <Header  style={{backgroundColor:'#9ec54d'}}> 
      <Left>
      <Button transparent onPress={() => navigation.dispatch(NavigationActions.back())}>
          <Icon name="close" />
        </Button>
      </Left>
      <Body>
        <Title>{t("documents:reference")}</Title>
      </Body>
      <Right />
    </Header>
    


    {this.state.documentData2 == null ? (
          <Text></Text>
        ):

(
  <View >


  <List style={{marginLeft:5,marginRight:5}}
                dataArray={this.state.documentData2}
                renderRow={item => (
                  <ListItem
                  thumbnail
                  onPress={() => {
                  
                this.openpdf(item.name)
             
                  }}
                >
                  <Thumbnail
                    source={require("../../assets/icons/document.png")}
                  />
  
                  <Body>
             
             
                    <Text note numberOfLines={3}>
                   {
item.name

                   } 
                 
                    </Text>
                  </Body>
                  <Button
                    danger
                    small
           
                    onPress={() => {
                      Alert.alert(
                        'Alert Title',
                        'My Alert Msg',
                        [
                          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {text: 'OK', onPress: () =>this.deleteFile(item.name)},
                        ],
                        {cancelable: false},
                      );






                      
                    }}
                  >
                  <Icons name="trash" size={25} style={{ color: "#FFF" }} />
                  <Text>Delete</Text>
                  </Button>
                </ListItem>

              
                  
                )}

                
              />
      
    
          
            </View>

)
    }        
     
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 25,
  },
  pdf: {
      flex:1,
      width:Dimensions.get('window').width,
  }
});
export default withNamespaces(['documents', 'common'], { wait: true })(FinancialRecordOffline);