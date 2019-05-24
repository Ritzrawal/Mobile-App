import React from "react";
import {
  AppRegistry,
  Alert,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  AsyncStorage,
  Linking,
  ActivityIndicator
  
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

import { NavigationActions } from "react-navigation";
import { withNamespaces } from "react-i18next";
const header=[{
  headertitle:'8 Build Back Safer Messages'
}]

export class NewsList extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      documentData: null,
      acc: [],
      isReady: true,
      currentLanguage:'',
      headertitle:'',
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
           
            break;
          case "ExpiredError":
            
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
  componentWillMount(){
    AsyncStorage.getItem("language").then((value) => {
      console.log("Value"+value);
      this.setState({currentLanguage: value});
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
    if(!this.state.documentData){
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
      <Button transparent onPress={() => navigation.dispatch(NavigationActions.back())}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>{t('documents:reference')}</Title>
      </Body>
      <Right />
    </Header>
    {this.state.documentData == null ? (
          <Text>{JSON.stringify(this.state.documentData)}</Text>
        ):

(
  <Content>
  {/* <View >
          <List style={{marginLeft:5,marginRight:5}}
                dataArray={this.state.documentData}
                renderRow={item => (
                  <ListItem
                  thumbnail
                  onPress={() => {
                    Linking.openURL(
                      "http://gahp.net/wp-content/uploads/2017/09/sample.pdf"
                    );
                  }}
                >
                  <Thumbnail
                    source={require("../../assets/icons/iconfirst.png")}
                  />
  
                  <Body>
             
            
                    <Text note numberOfLines={3}>
                   {
        this.state.currentLanguage=='en'?item.title:item.title_idn      

                   } 
                 
                    </Text>
                  </Body>
                  <Button
                    transparent
                    onPress={() => {
                      this.makeDowload();
                    }}
                  >
                    <Text>{t("documents:download")}</Text>
                  </Button>
                </ListItem>

              
                  
                )}
              />


          

          
            </View> */}
            <View>
          <List style={{marginLeft:0,marginRight:5}}
                dataArray={this.state.documentData}
                renderRow={item => (
                  <ListItem style={{marginTop:20,borderWidth:2}}
                  thumbnail
                  onPress={() => {
                    Linking.openURL(
                      "http://gahp.net/wp-content/uploads/2017/09/sample.pdf"
                    );
                  }}
                >
                  <Thumbnail
                    source={require("../../assets/icons/document.png")}
                  />
  
                  <Body>
             
             
                    <Text note numberOfLines={3}>
                   {
this.state.currentLanguage=='en'?item.title:item.title_idn

                   } 
                 
                    </Text>
                  </Body>
                  <Button
                    transparent
                    onPress={() => {
                      this.makeDowload();
                    }}
                  >
                    <Text >{t("documents:download")}</Text>
                  </Button>
                </ListItem>

              
                  
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
export default withNamespaces(['documents', 'common'], { wait: true })(NewsList);
const styles = StyleSheet.create({
  input_Instruction: {
    fontSize: 20,
    textAlign: "left",
    //color: '#FDFEFE',
    // fontWeight: "bold",
    fontFamily: "Apple SD Gothic Neo",
    marginBottom: 4
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
})
