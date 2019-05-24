import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,AsyncStorage,Linking,Dimensions
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body,Title,Right } from 'native-base';
import { NavigationActions } from "react-navigation";
import { withNamespaces,translate } from "react-i18next";
import { storage } from "../../App";
import HTML from 'react-native-render-html';

export class AboutUs extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      aboutUsData: [],
      acc: [],
      isReady: false,
      aboutData:[],
      title:'',
      title_idn:'',
      description:'',
      description_idn:'',
      currentLanguage:'',
      savedData:false
    };

    
  }
    static navigationOptions = ({ navigation }) => ({
        header: null
      });


      getData3=()=>{
        var _this=this;

        storage.sync = {
        
    
          async aboutUs(params) {
            return (
              fetch("http://phlapp.drcmp.org/api/aboutuses/", {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                }
              })
              .then((response) => response.json())
                .then(responseData => {
                   console.log("RESPONSE DATA" + JSON.stringify(responseData));
                  //    return responseData;
                  if (responseData) {
                    storage.save({
                      key: "aboutUs",
                      //id,
                      data: responseData
    
    
                  /*    data: {
                        from: 'some other site',
                        userid: 'some userid',
                        token: 'some token'
                      },  */                
                    },
                  
                     
                      )
                  .then(ret => {
console.log("thheb");
return _this.getData();
                     // successCallback(ret);
                    // _this.getData();
                  }).catch(err => {
                    console.log("catch");
                      //failCallBack(err.message);
                  })
                     
                  }
                })
               .then(data =>{
               // getData();
                // console.log("data"+data.documentId),
                //  data.forEach(data2 => {
                //  console.log(data2.title);
                })
            
    
                .catch(err => {
                  console.log("fetch error" + err);
                })
            );
          }
        };





       
      
      }

      getData=()=>{
        try{

       return storage
          .load({
            key: "aboutUs",
            autoSync: true,
            syncInBackground: true,
        
            // you can pass extra params to the sync method
            // see sync example below
            syncParams: {
              extraFetchOptions: {
                // blahblah
              },
              someFlag: true
            }
          })
          .then(res => {
            // found data go to then()
      
            this.setState(
              {
                aboutUsData: res.about_uses,
                title:res.about_uses[0].title,
                title_idn:res.about_uses[0].title_idn,
                description:res.about_uses[0].description,
                description_idn:res.about_uses[0].description_idn,
                //  acc: this.state.acc.concat( { title:  res[1].title, content: res[1].body})
    
                isReady: true
              }
              
              );
          })
          .catch(err => {
            // any exception including data not found
            // goes to catch()
            console.warn(err.message);
            switch (err.name) {
              case 'NotFoundError':
                // TODO;
                break;
              case 'ExpiredError':
                // TODO
                break;
            }
          });
        }catch{

        }
    
      
      };




















        

      componentWillMount(){
     
        //this.getData();
        AsyncStorage.getItem("language").then((value) => {
          console.log("Value"+value);
          this.setState({currentLanguage: value});
      })
      .then(res => {
          //do something else
      });
      }
      componentDidMount() {
        this._isMounted = true;
        if (this._isMounted == true) {
          this.getData3();
          this.getData();
        }
      }
    
      componentWillUnmount() {
        this._isMounted = false;
      }


      handlePress(url) {
       console.log('Trying to access url')
       // console.tron.log(url)
      /*  Linking.canOpenURL(url).then(supported => {
          if (!supported) {
           // console.tron.log('Can\'t handle url: ' + url)
          } else {
            return Linking.openURL(`tel:${url}`)
    
          }
        }).catch(err => console.error('An error occurred', err))*/
      }



  render() {
    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;
 
    if(this.state.savedData==true){
this.getData();
    }
     
      
     
    return (
      <Container>
                  <Header>
            <Left>
            <Button transparent onPress={() => navigation.dispatch(NavigationActions.back())}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>{t('about_us:title')}</Title>
            </Body>
            <Right />
          </Header>
          <View>

      <View style={styles.header}></View>
      <Image style={styles.avatar} source={require('../../assets/icons/org/buildchange.png')}/>



  </View>
  <Content padder style={{marginTop:30,flex:1}}>
  <Card style={{justifyContent:'center',alignItems:'center'}}>
            <CardItem header bordered>
            <Text style={styles.name}>{this.state.currentLanguage=='en'?this.state.title:this.state.title_idn}</Text>

            </CardItem>
            <CardItem bordered>
              <Body>
              <HTML html={this.state.currentLanguage=='en'?this.state.description:this.state.description} imagesMaxWidth={Dimensions.get('window').width} />   

              </Body>
            </CardItem>
            <CardItem footer bordered>

            <View style={{flexDirection:'column'}}>
            <TouchableOpacity style={styles.buttonContainer}>
            <Text style={{color:'#fff'}}>{t('about_us:mail_us')}</Text> 
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonContainer}
          
          onPress={this.handlePress('061245124')}
          
          >
            <Text style={{color:'#fff'}}>{t('about_us:mail_us')}</Text> 
          </TouchableOpacity>
            </View>

            </CardItem>
          </Card>
  </Content>

      </Container>
      
    );
  }
}
export default withNamespaces(['about_us', 'common'], { wait: true })(AboutUs);

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:150,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:70
  },
  name:{
    fontSize:15,
    color:"#FFFFFF",
    fontWeight:'500',
    justifyContent:'center'
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "orange",
    color:"white",
    position:"relative"
  },
});